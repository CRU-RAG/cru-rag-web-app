import React from "react";

const FormattedText = ({ text }) => {
  function formatTextToHtml(text) {
    const sections = text.split(/(?<=\d\.)/); // Split by numbered sections (1., 2., 3., etc.)
    const formattedSections = sections.map((section) => {
      const matches = section.match(
        /(\d+)\.\s\*\*(.*?)\*\*:(.*?)(?=\d+\.\s|\n?$)/s
      );
      if (matches) {
        return `
              <div class="section">
                <h3>${matches[2]}</h3>
                <p>${matches[3].trim()}</p>
              </div>
            `;
      }
      return `<p>${section.trim()}</p>`;
    });

    return `<div>${formattedSections.join("")}</div>`;
  }

  const createMarkup = () => {
    return { __html: formatTextToHtml(text) };
  };

  return <div dangerouslySetInnerHTML={createMarkup()} />;
};

// Usage
export default FormattedText
