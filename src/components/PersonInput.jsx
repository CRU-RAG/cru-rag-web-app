import PersonInputCss from "../styles/PersonInput.module.css";

const PersonInput = ({ text }) => {
    return (
        <div className={PersonInputCss.container}>
            <div>Person Input</div>
            <div className={PersonInputCss.text}>{ text }</div>
        </div>
    )
}

export default PersonInput