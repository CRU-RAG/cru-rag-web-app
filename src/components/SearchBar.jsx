import SearchBarCss from "../styles/SearchBar.module.css";

const SearchBar = () => {
  return (
    <div className={SearchBarCss.container}>
      <input className={SearchBarCss.input} type="text"></input>
      <img src="src/assets/send.svg" alt="send" />
    </div>
  );
};

export default SearchBar;
