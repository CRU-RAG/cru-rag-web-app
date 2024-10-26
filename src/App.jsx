import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import Prompt from "./components/Prompt";
import Response from "./components/Response";
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [prompt, setPrompt] = useState("");
  const [status, setStatus] = useState("Disconnected");
  const [responses, setResponse] = useState([]);
  const [socket, setSocket] = useState(null);
  const [thread, setThread] = useState([
    {
      response: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro nam tempore, ad quas ipsum laudantium cupiditate qui suscipit nobis delectus.12",
      prompt: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro nam tempore, ad quas ipsum laudantium cupiditate qui suscipit nobis delectus.",
    },
  ]);

  const addPrompt = (newPrompt) => {
    // create a thread and add the key prompt with the value of the prompt and add the response with an empty string
    setThread((prevThread) => [
      ...prevThread, 
      { prompt: newPrompt, response: '' }
    ]) 
  }

  const addResponse = (newResponse) => {
    // when the response is recieved, it updates the response empty response key that prompt has
    setThread((prevThread) => prevThread.map((item, index) => index == prevThread.length - 1 ? {...item, response: newResponse} : item))
  }

  useEffect(() => {
    
    const ws = new WebSocket(`ws://10.150.48.136:8765?id=${uuidv4()}`);

    setSocket(ws);

    ws.onopen = () => {
      // checks if the socket is connected
      setStatus("Connected");
      console.log("Connection esatblished");
    };

    ws.onmessage = (event) => {
      // when the message is recieved, it adds the response to the thread and sets input to blank
      const message = event.data;
      setResponse((prevMessage) => [...prevMessage, message]);
      if (message) {
        addResponse(message);
        setPrompt("");
      }
    };

    ws.onclose = () => {
      // checks if the socket is closed
      setStatus("Disconnected");
      console.log("websocket closed");
    };

    ws.onerror = (error) => {
      // checks if there is an error on the socket
      console.error("Websocket error:", error);
    };

    return () => {
      ws.close();
    };
  }, []);

  const sendPrompt = () => {
    // sends to the socket only when the socket is ready

    if (socket && socket.readyState === WebSocket.OPEN) {
      addPrompt(prompt)
      socket.send(prompt);
    } else {
      console.error("Websocket is not open");
    }
  };

  return (
    <>
      <div>Websocket socket status; {status}</div>
      {thread.map((item) => (
        <>
          <Prompt text={item.prompt} />
          <Response text={item.response} />
        </>
      ))}
      <SearchBar
        prompt={prompt}
        handleSetPrompt={(newPrompt) => setPrompt(newPrompt)}
        handleSendPrompt={() => {
          sendPrompt();
        }}
      />
    </>
  );
}

export default App;
