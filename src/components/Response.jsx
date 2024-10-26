import ResponseCss from "../styles/Response.module.css";

const Response = ({ text }) => {
  return (
    <div className={ResponseCss.container}>
      <div>Response</div>
      <div className={ResponseCss.text}>{text}</div>
    </div>
  );
};

export default Response;
