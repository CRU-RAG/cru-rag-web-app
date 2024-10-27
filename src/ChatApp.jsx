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
  const [thread, setThread] = useState([
    {
      isUser: true,
      text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure debitis ea numquam asperiores, minus iusto voluptatibus? Nemo corporis eum temporibus odio distinctio a consequatur in beatae delectus ad cumque, saepe, ullam quibusdam explicabo provident dignissimos. Libero voluptate explicabo unde delectus, nemo eligendi assumenda repudiandae officia blanditiis molestiae, corporis porro ducimus alias culpa tenetur ratione molestias mollitia qui ipsam quaerat hic. Quod ab fuga amet aspernatur consequuntur necessitatibus dicta ea ullam sapiente labore explicabo est ipsa omnis commodi obcaecati eaque repudiandae, nesciunt consectetur reprehenderit veniam nemo, id eveniet distinctio? Beatae repellat hic quia repellendus nostrum quaerat quam consequuntur id! Quasi asperiores ut quidem distinctio, vitae eveniet vel facilis voluptatem dignissimos, voluptatum nulla sit praesentium quam debitis totam maiores rerum repudiandae quas accusantium? Aliquam, est quos iste deleniti possimus ratione quod aperiam porro sit eius omnis veritatis quam inventore non explicabo! Qui vel voluptate, tempore consequatur vero amet fugit quasi non officia, eius cum quibusdam eaque tempora itaque repudiandae voluptas nesciunt accusantium nemo quis nulla deleniti officiis enim mollitia aliquam. Possimus adipisci eligendi, minima, aut cumque praesentium a accusantium iusto quidem provident facere nemo. Laudantium mollitia cum, quisquam sapiente non pariatur eos ducimus ipsam culpa, reprehenderit dolores aliquam ipsum, at aperiam sunt? Expedita maxime dolor distinctio quod, libero esse suscipit ipsum, sit neque provident veniam ipsam molestiae cupiditate saepe fuga. Sed eius accusantium voluptatum aliquid itaque illo obcaecati beatae temporibus voluptatem est eaque necessitatibus ullam excepturi optio in eligendi error exercitationem at, delectus numquam! Deleniti maxime sunt id at reiciendis labore ab, quasi iste dolor reprehenderit? Iste quam qui doloremque corporis ex ipsa est, suscipit, voluptatem odit tempora blanditiis dolorem earum. Cum vel sapiente assumenda porro ratione, inventore provident rem, numquam deleniti officiis doloribus. Iste ipsa reprehenderit nemo praesentium expedita magnam officiis, quis alias. In ad iusto eum pariatur, consequatur impedit exercitationem quas odio aut sapiente totam quod sint nesciunt provident recusandae incidunt, vero veritatis dolores. Harum minus recusandae ratione ullam necessitatibus vel ab distinctio dolore similique, eos repellendus hic illum ex, quasi voluptate delectus minima, adipisci consequatur reprehenderit officia consectetur accusantium? Voluptatibus error alias nemo sit iste ex perferendis quisquam assumenda ratione sequi tenetur pariatur, voluptas nulla aspernatur eligendi nesciunt, obcaecati iusto vel accusantium, doloremque temporibus esse tempora labore. Vel veniam, rem enim reiciendis a recusandae delectus consectetur iusto at tempore cum repudiandae fugiat quasi culpa, placeat aperiam voluptates, nulla iure alias id suscipit porro? Atque soluta nihil magni nostrum non odit velit, explicabo adipisci! Id provident debitis sit saepe velit sapiente sequi commodi sed distinctio animi dignissimos, harum laboriosam tenetur expedita labore nobis blanditiis nemo voluptas laborum, magnam tempora! At laudantium iure non debitis quae ut, harum quod eum enim vero vel ab libero error eos deserunt accusantium magni quam facere aut omnis minima. Necessitatibus dolore temporibus facilis maiores incidunt ratione magni cum vel at tempora placeat, nam mollitia quo illo ducimus molestiae libero repellat nostrum rerum amet repudiandae officiis doloribus quasi. Hic cupiditate itaque iste. Expedita cum error aliquid ex magni dicta voluptatem quod necessitatibus iure. Facilis, maxime praesentium.",
    },
    {
      isUser: false,
      text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure debitis ea numquam asperiores, minus iusto voluptatibus? Nemo corporis eum temporibus odio distinctio a consequatur in beatae delectus ad cumque, saepe, ullam quibusdam explicabo provident dignissimos. Libero voluptate explicabo unde delectus, nemo eligendi assumenda repudiandae officia blanditiis molestiae, corporis porro ducimus alias culpa tenetur ratione molestias mollitia qui ipsam quaerat hic. Quod ab fuga amet aspernatur consequuntur necessitatibus dicta ea ullam sapiente labore explicabo est ipsa omnis commodi obcaecati eaque repudiandae, nesciunt consectetur reprehenderit veniam nemo, id eveniet distinctio? Beatae repellat hic quia repellendus nostrum quaerat quam consequuntur id! Quasi asperiores ut quidem distinctio, vitae eveniet vel facilis voluptatem dignissimos, voluptatum nulla sit praesentium quam debitis totam maiores rerum repudiandae quas accusantium? Aliquam, est quos iste deleniti possimus ratione quod aperiam porro sit eius omnis veritatis quam inventore non explicabo! Qui vel voluptate, tempore consequatur vero amet fugit quasi non officia, eius cum quibusdam eaque tempora itaque repudiandae voluptas nesciunt accusantium nemo quis nulla deleniti officiis enim mollitia aliquam. Possimus adipisci eligendi, minima, aut cumque praesentium a accusantium iusto quidem provident facere nemo. Laudantium mollitia cum, quisquam sapiente non pariatur eos ducimus ipsam culpa, reprehenderit dolores aliquam ipsum, at aperiam sunt? Expedita maxime dolor distinctio quod, libero esse suscipit ipsum, sit neque provident veniam ipsam molestiae cupiditate saepe fuga. Sed eius accusantium voluptatum aliquid itaque illo obcaecati beatae temporibus voluptatem est eaque necessitatibus ullam excepturi optio in eligendi error exercitationem at, delectus numquam! Deleniti maxime sunt id at reiciendis labore ab, quasi iste dolor reprehenderit? Iste quam qui doloremque corporis ex ipsa est, suscipit, voluptatem odit tempora blanditiis dolorem earum. Cum vel sapiente assumenda porro ratione, inventore provident rem, numquam deleniti officiis doloribus. Iste ipsa reprehenderit nemo praesentium expedita magnam officiis, quis alias. In ad iusto eum pariatur, consequatur impedit exercitationem quas odio aut sapiente totam quod sint nesciunt provident recusandae incidunt, vero veritatis dolores. Harum minus recusandae ratione ullam necessitatibus vel ab distinctio dolore similique, eos repellendus hic illum ex, quasi voluptate delectus minima, adipisci consequatur reprehenderit officia consectetur accusantium? Voluptatibus error alias nemo sit iste ex perferendis quisquam assumenda ratione sequi tenetur pariatur, voluptas nulla aspernatur eligendi nesciunt, obcaecati iusto vel accusantium, doloremque temporibus esse tempora labore. Vel veniam, rem enim reiciendis a recusandae delectus consectetur iusto at tempore cum repudiandae fugiat quasi culpa, placeat aperiam voluptates, nulla iure alias id suscipit porro? Atque soluta nihil magni nostrum non odit velit, explicabo adipisci! Id provident debitis sit saepe velit sapiente sequi commodi sed distinctio animi dignissimos, harum laboriosam tenetur expedita labore nobis blanditiis nemo voluptas laborum, magnam tempora! At laudantium iure non debitis quae ut, harum quod eum enim vero vel ab libero error eos deserunt accusantium magni quam facere aut omnis minima. Necessitatibus dolore temporibus facilis maiores incidunt ratione magni cum vel at tempora placeat, nam mollitia quo illo ducimus molestiae libero repellat nostrum rerum amet repudiandae officiis doloribus quasi. Hic cupiditate itaque iste. Expedita cum error aliquid ex magni dicta voluptatem quod necessitatibus iure. Facilis, maxime praesentium.",
    },
  ]);

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
    const ws = new WebSocket(`ws://10.150.48.136:8765?id=${uuidv4()}`);

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
                      <div className={ChatAppCss.userPrompt}>{message.text}</div>
                    ) : (
                      <TypingEffect text={message.text} />
                    )}
                    {/* <FormattedText text={message.text} /> */}
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
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type your message..."
              className={`${ChatAppCss.input}flex-grow  mr-2 h-[60px] rounded-[20px]  bg-gray-800  text-white`}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendPrompt(); // Call the send function on Enter key press
                }
              }}
            />
            <Button
              onClick={() => sendPrompt()}
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
