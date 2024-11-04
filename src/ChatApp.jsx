import { useState, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, User } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import ChatAppCss from "./ChatApp.module.css";
import LandingPage from "./components/LandingPage";
import TypingEffect from "./components/TypingEffect";
import FormattedText from "./components/FormattedText";
import "./index.css";

export default function ChatbotUI() {
  const [landingPage, setLandingPage] = useState(true);
  const [beforeStart, setBeforeStart] = useState(true);

  const [prompt, setPrompt] = useState("");
  const [status, setStatus] = useState("Disconnected");
  const [socket, setSocket] = useState(null);
  const [thread, setThread] = useState([]);

  const addPrompt = (newPrompt) => {
    setThread((prevThread) => [
      ...prevThread,
      { text: newPrompt, isUser: true },
      { text: "", isUser: false },
    ]);
  };

  const addResponse = (newResponse) => {
    setThread((prevThread) =>
      prevThread.map((item, index) =>
        index == prevThread.length - 1 ? { ...item, text: newResponse } : item
      )
    );
  };

  useEffect(() => {
    const ws = new WebSocket(`wss://ws.versewise.io?id=${uuidv4()}`);

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
    if (socket && socket.readyState === WebSocket.OPEN && prompt != "") {
      setBeforeStart(false);
      addPrompt(prompt);
      socket.send(prompt);
    } else {
      console.error("WebSocket is not open");
    }
  };

  const handleTextAreaResize = (event) => {
    const textarea = event.target;
    // textarea.style.height = 'auto';
    if (textarea.scrollHeight < 100) {
      textarea.style.height = "80px";
      textarea.classList.add("notScrollable");
    } else {
      textarea.style.height = `${Math.min(textarea.scrollHeight, 500)}px`;
      textarea.classList.remove("notSscrollable");
    }
  };

  const reset = (e) => {
    const textarea = e.target;
    textarea.style.height = "80px";
    textarea.value = "";
  };

  return (
    <>
      {landingPage && (
        <LandingPage turnLandingOff={() => setLandingPage(false)} />
      )}
      {!landingPage && (
        <div
          className={`${ChatAppCss.container} flex flex-col h-screen bg-[url('src/assets/images/Pattern.jpg')] bg-cover bg-center text-white`}
        >
          {beforeStart && <div className={ChatAppCss.talk}>Let's Talk ...</div>}
          <header className={` p-10 flex justify-between items-center`}>
            <img src="src/assets/images/VERSEWISE.svg" alt="" />
          </header>
          <ScrollArea className={`flex-grow p-4 ${ChatAppCss.scrollArea}`}>
            {thread.map((message, index) => (
              <div
                key={index}
                className={`flex items-end mb-4 ${
                  !message.isUser ? ChatAppCss.right : ChatAppCss.left
                } ${ChatAppCss.textArea}`} // Centering messages
              >
                {!message.isUser && message.text !== "" && (
                  <img
                    src="src/assets/images/bot.svg"
                    className={ChatAppCss.accountImg}
                  />
                )}

                {message.text == "" && (
                  <div className={ChatAppCss.loading}>
                    <img
                      src="src/assets/images/bot.svg"
                      className={ChatAppCss.accountImg}
                    />
                    <div
                      className={`inline-block p-3 rounded-lg ${
                        message.isUser ? "bg-gray-700" : "bg-gray-800"
                      } max-w-[80%] mx-2 ${ChatAppCss.textContainer}`}
                    >
                      <div className={ChatAppCss.dots}>
                        <div className={ChatAppCss.dot}></div>
                        <div className={ChatAppCss.dot}></div>
                        <div className={ChatAppCss.dot}></div>
                      </div>
                    </div>
                  </div>
                )}

                {message.text !== "" && (
                  <div
                    className={`inline-block p-3 rounded-lg ${
                      message.isUser ? "bg-gray-700" : "bg-gray-800"
                    } max-w-[80%] mx-2 ${ChatAppCss.text} ${
                      ChatAppCss.lessSize
                    }`}
                  >
                    {message.isUser ? (
                      <div className={ChatAppCss.userPrompt}>
                        {message.text}
                      </div>
                    ) : (
                      // git <TypingEffect text={message.text} />

                       <FormattedText text={message.text} />
                    )}
                    

                  </div>
                )}
                {message.isUser && (
                  <img
                    src="src/assets/images/user.svg"
                    className={ChatAppCss.accountImg}
                  />
                )}
              </div>
            ))}
          </ScrollArea>
          <div
            className={`${ChatAppCss.searchContainer} p-4  border-gray-800 flex items-center`}
          >
            <textarea
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
                handleTextAreaResize();
              }}
              placeholder="Type your message..."
              className={`${ChatAppCss.input} flex-grow mr-2 h-[80px] rounded-[10px] bg-gray-800 text-white pl-[20px] py-[20px] pr-[80px] font-light text-2xl resize-none overflow-y-auto`}
              onInput={handleTextAreaResize}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // Prevents newline on enter in the textarea
                  sendPrompt();
                  reset(e);
                }
              }}
            />
            <Button
              onClick={() => {
                sendPrompt();
                reset(e);
              }}
              size="icon"
              className={`${ChatAppCss.searchButton} bg-transparent hover:bg-gray-800`}
            >
              <img src="src/assets/images/send.svg" alt="send" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
