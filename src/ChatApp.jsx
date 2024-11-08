import { useState, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, User } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import ChatAppCss from "./styles/ChatApp.module.css";
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

    // on mobile clicking somewhere on the screen hides the keyboard when sending
    const logo = document.getElementById("logo");
    logo.click();
  };

  const handleTextAreaResize = (isSend) => {
    const textarea = document.getElementById('textarea')
    const screenWidth = window.innerWidth;
    console.log(textarea)
    // textarea.style.height = 'auto';
    if (!isSend) {
      if (textarea.scrollHeight < 50) {
        textarea.style.height = screenWidth < 500 ? "60px" : "80px";
        textarea.classList.add("notScrollable");
      } else {
          textarea.style.height = `${Math.min(textarea.scrollHeight, (screenWidth < 500 ? 200 : 500))}px`;
        textarea.classList.remove("notSscrollable");
      }
    } else {
      textarea.style.height = screenWidth < 500 ? "60px" : "80px";
    }
    
  };

  const reset = () => {
    const textarea = document.getElementById('textarea')
    const screenWidth = window.innerWidth;
    textarea.style.height = screenWidth < 500 ? "60px" : "80px";
    textarea.value = "";
  };

  return (
    <>
      {landingPage && (
        <LandingPage turnLandingOff={() => setLandingPage(false)} />
      )}
      {!landingPage && (
        <div
          className={`relative font-sans flex flex-col h-screen bg-[url('/images/Pattern.jpg')] bg-cover bg-center text-white`}
        >
          {beforeStart && (
            <div
              className={`absolute top-0 w-screen h-screen flex justify-center items-center font-normal leading-[85px] text-[48px] s:text-[55px] m:text-[62px]`}
            >
              Let's Talk ...
            </div>
          )}
          <header
            id="logo"
            className={` p-6 pb-0 s:p-10 flex justify-between items-center`}
          >
            <img
              src="/images/VERSEWISE.svg"
              alt=""
              className="w-60 s:w-[288px]"
            />
          </header>
          <ScrollArea className={`flex-grow p-4`}>
            {thread.map((message, index) => (
              <div
                key={index}
                className={`flex items-end gap-[15px] mb-4 ${
                  !message.isUser
                    ? "justify-start flex-col"
                    : "justify-end flex-col-reverse"
                } mx-auto w-[95%] m:w-[90%] l:w-[80%] xl:w-[70%]  s:flex-row`} // Centering messages
              >
                {!message.isUser && message.text !== "" && (
                  <img
                    src="/images/bot.svg"
                    className={"mr-auto ml-[10px]  s:mr-0 s:ml-0 "}
                  />
                )}

                {message.text == "" && (
                  <div
                    className={`flex flex-col gap-[15px] items-end mr-auto s:flex-row`}
                  >
                    <img
                      src="/images/bot.svg"
                      className={"mr-auto ml-[10px] s:mr-0 s:ml-0 "}
                    />
                    <div
                      className={`inline-block p-3 rounded-lg ${
                        message.isUser ? "bg-gray-700" : "bg-gray-800"
                      } max-w-[80%] mx-2 flex items-center justify-around`}
                    >
                      <div
                        className={` flex gap-[30px] items-center mb-[-10px] h-[50px]`}
                      >
                        <div
                          className={`${ChatAppCss.dot} w-[8px] h-[8px] rounded-full bg-white opacity-0`}
                        ></div>
                        <div
                          className={`${ChatAppCss.dot} w-[8px] h-[8px] rounded-full bg-white opacity-0`}
                        ></div>
                        <div
                          className={`${ChatAppCss.dot} w-[8px] h-[8px] rounded-full bg-white opacity-0`}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                {message.text !== "" && (
                  <div
                    className={`inline-block p-3 rounded-lg ${
                      message.isUser
                        ? "bg-gray-700 s:ml-[78px] "
                        : "bg-gray-800 s:mr-[78px]"
                    }  mx-2 font-extralight text-[18px] leading-[24px]  s:max-w-fit m:w-[680px]`}
                  >
                    {message.isUser ? (
                      <div className="p-[10px]">{message.text}</div>
                    ) : (
                      // git <TypingEffect text={message.text} />

                      <FormattedText text={message.text} />
                    )}
                  </div>
                )}
                {message.isUser && (
                  <img
                    src="/images/user.svg"
                    className={"mr-[10px] s:mr-[0]"}
                  />
                )}
              </div>
            ))}
          </ScrollArea>
          <div
            className={`relative w-[90vw] s:w-[70vw] mx-auto py-4  border-gray-800 flex items-center`}
          >
            <textarea
              onChange={(e) => {
                setPrompt(e.target.value);
                handleTextAreaResize(false);
              }}
              id='textarea'
              placeholder="Type your message..."
              className={` break-words outline-none w-full border-2 border-[#ffe7e1] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] h-[60px] m:h-[80px] rounded-[10px] bg-gray-800 text-white pl-[20px] py-[16px] m:py-[20px] pr-[50px] m:pr-[80px] font-light text-xl m:text-2xl resize-none overflow-y-auto `}
              onInput={() => handleTextAreaResize(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // Prevents newline on enter in the textarea
                  sendPrompt();
                  reset();
                }
              }}
            />
            <Button
              onClick={() => {
                sendPrompt();
                reset();
                handleTextAreaResize(true)
              }}
              size="icon"
              className={` absolute w-[30px] right-[20px] m:right-[50px] bottom-[26px] m:bottom-[35px] bg-transparent cursor-pointer hover:bg-gray-800`}
            >
              <img src="/images/send.svg" alt="send" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
