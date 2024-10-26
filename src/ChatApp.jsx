import { useState, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, User } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import ChatAppCss from "./ChatApp.module.css";
import "./index.css";

export default function ChatbotUI() {
  const [prompt, setPrompt] = useState("");
  const [status, setStatus] = useState("Disconnected");
  const [socket, setSocket] = useState(null);
  const [thread, setThread] = useState([
    {
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      isUser: false,
    },
    {
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      isUser: true,
    },
  ]);

  const addPrompt = (newPrompt) => {
    setThread((prevThread) => [
      ...prevThread,
      { text: newPrompt, isUser: true },
    ]);
  };

  const addResponse = (newResponse) => {
    setThread((prevThread) => [
      ...prevThread,
      { text: newResponse, isUser: false },
    ]);
  };

  useEffect(() => {
    const ws = new WebSocket(`ws://10.150.48.34:8765?id=${uuidv4()}`);

    setSocket(ws);

    ws.onopen = () => {
      setStatus("Connected");
      console.log("Connection established");
    };

    ws.onmessage = (event) => {
      const message = event.data;
      if (message) {
        addResponse(message);
        setPrompt("");
      }
    };

    ws.onclose = () => {
      setStatus("Disconnected");
      console.log("WebSocket closed");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      ws.close();
    };
  }, []);

  const sendPrompt = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      addPrompt(prompt);
      socket.send(prompt);
    } else {
      console.error("WebSocket is not open");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[url('src/assets/images/Pattern.jpg')] bg-cover bg-center text-white">
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-orange-500">VERSEwise</h1>
        <Button variant="ghost" size="icon">
          <User className="h-6 w-6 text-orange-500" />
          <span className="sr-only">User settings</span>
        </Button>
      </header>
      <ScrollArea className={`flex-grow p-4 ${ChatAppCss.scrollArea}`}>
        {thread.map((message, index) => (
          <div
            key={index}
            className={`flex items-end mb-4 justify-center`} // Centering messages
          >
            {!message.isUser && (
              <Avatar className="w-8 h-8 mr-2 mb-1">
                <AvatarFallback className="bg-orange-500 text-white">B</AvatarFallback>
              </Avatar>
            )}
            <div
              className={`inline-block p-3 rounded-lg ${
                message.isUser ? "bg-gray-700" : "bg-gray-800"
              } max-w-[70%] mx-2`}
            >
              {message.text}
            </div>
            {message.isUser && (
              <Avatar className="w-8 h-8 ml-2 mb-1">
                <AvatarFallback className="bg-orange-500 text-white">U</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
      </ScrollArea>
      <div className="p-4 border-t border-gray-800 flex items-center">
        <Avatar className="w-8 h-8 mr-2 bg-[#FF5733]">
          <AvatarFallback>V</AvatarFallback>
        </Avatar>
        <Input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow mr-2 bg-gray-800 border-gray-700 text-white"
        />
        <Button
          onClick={() => sendPrompt()}
          size="icon"
          className="bg-transparent hover:bg-gray-800"
        >
          <Send className="h-4 w-4 text-[#FF5733]" />
        </Button>
      </div>
    </div>
  );
}
