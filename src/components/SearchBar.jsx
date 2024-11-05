import SearchBarCss from "../styles/SearchBar.module.css";

const SearchBar = ({prompt, handleSendPrompt, handleSetPrompt }) => {
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSendPrompt();
        }
    }

  return (
    <div className={SearchBarCss.container}>
      <input className={SearchBarCss.input} onKeyDown={handleKeyDown} value={prompt} type="text" onChange={(e) => handleSetPrompt(e.target.value)}></input>
      <img src="/send.svg" alt="send" onClick={() => handleSendPrompt()}/>
    </div>
  );
};

export default SearchBar;
