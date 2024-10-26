import PromptCss from "../styles/Prompt.module.css";

const Prompt = ({ text }) => {
    return (
        <div className={PromptCss.container}>
            <div>Prompt</div>
            <div className={PromptCss.text}>{ text }</div>
        </div>
    )
}

export default Prompt