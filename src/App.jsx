import { useState } from "react";
import SearchBar from "./components/SearchBar";
import PersonInput from "./components/PersonInput";
import Response from "./components/Response";

function App() {
  const [thread, setThread] = useState([
    {
      response: "loremaasdfffffffffffffffffffffffffffffffffffffffffffffffffff",
      personInput:
        "loremaasdfffffffffffffffffffffffffffffffffffffffffffffffffff",
    },
  ]);

  const addThread = ( personInput, response ) => {
    setThread((prevThread) => [...prevThread, {personInput, response}])
  }

  return (
    <>
      {thread.map((item) => (
        <>
          <PersonInput text={item.personInput} />
          <Response text={item.response} />
        </>
      ))}
      <SearchBar />
    </>
  );
}

export default App;
