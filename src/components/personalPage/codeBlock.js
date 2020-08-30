import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function CodeBlock({ raw_url }) {
  const [code, setCode] = useState(null);
  useEffect(() => {
    // Fetching of raw text data for this gist
    fetch(raw_url)
      .then((response) => response.text())
      .then((data) => {
        setCode(data);
      })
      .catch((err) => console.log(err));
  });
  if (code) {
    return (
      <pre>
        <code>{code}</code>
      </pre>
    );
  } else return <div>Loading</div>;
}

CodeBlock.propTypes = {
  data: PropTypes.string,
};
