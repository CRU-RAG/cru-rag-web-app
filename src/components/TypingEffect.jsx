import { useState, useEffect } from "react";

export default function TypingEffect({ text }) {
  const [displayedText, setDisplayedText] = useState("");
  const typingSpeed = 20; // Adjust typing speed as needed

  useEffect(() => {
    let currentText = ""; // Use a local variable to build the displayed text

    async function typeText() {
      for (let i = 0; i < text.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, typingSpeed));
        currentText += text[i];
        setDisplayedText(currentText); // Update the state after adding each character
      }
    }

    setDisplayedText(""); // Reset the displayed text when text changes
    typeText(); // Start typing effect

  }, [text, typingSpeed]);

  return <div style={{ padding: 10 }}>{displayedText}</div>;
}
