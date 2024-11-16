import React from "react";

const FormattedText = ({ text }:{
    text: string, // The text to be formatted
  
}) => {
    // Function to format the text
    const formatText = (text:string) => {
      // Replace markdown-like syntax with HTML tags
      return text
        .replace(/(\*\*)(.*?)\1/g, '<strong>$2</strong>') // Bold text
        .replace(/\n/g, '<br />'); // Line breaks for new lines
    };
  
    return (
      <div
        className="formatted-text"
        dangerouslySetInnerHTML={{ __html: formatText(text) }}
      />
    );
  };

  export default FormattedText