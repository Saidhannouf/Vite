// TranslatePage.js
import React, { useState } from "react";
import IndexPages, { fetcher } from "./IndexPages";

import axios from "axios";
import useSWR from "swr";

const url = "https://google-translate1.p.rapidapi.com/language/translate/v2";

const headers = {
  "X-RapidAPI-Key": "b77cc0403dmshd56eb519180ee3ep135e81jsnd98ccf1c86dc",
  "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
};

function TranslatePage() {
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState('')
  const [targetLang, setTargetLang] = useState('')
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { data, error: errorLanguages} = useSWR(
    "https://google-translate1.p.rapidapi.com/language/translate/v2/languages",
    fetcher,
  );

  const params = new URLSearchParams({
    q: text,
    source: sourceLang,
    target: targetLang,
  });

  const handleTranslate = async () => {
    if(!targetLang){
      setError('target lang not selected')
      return
    }
    try {
      setLoading(true);
      setTranslatedText(false);
      const response = await axios.post(url, params.toString(), { headers });
      setTranslatedText(response.data.data.translations[0].translatedText);
      setError("");
    } catch (error) {
      setError("Error translating text!");
    } finally {
      setLoading(false);
    }
  };
  if(errorLanguages) return <p>something went wrong!</p>

  return (
    <div>
      <h1>Translation</h1>
      <div>Select your language</div>
      <select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
      <option value={''}>Not selected</option>
        {data && data.data.languages.map((lang,index) => (
          <option key={index} value={lang.language}>{lang.language}</option>
        ))}
      </select>

      <div>write your text</div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div>Choose the language you want to translate</div>
      <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
      <option value={''}>Not selected</option>
        {data && data.data.languages.map((lang,index) => (
          <option key={index} value={lang.language}>{lang.language}</option>
        ))}
      </select>
      <button disabled={loading} onClick={handleTranslate}>
        Translate
      </button>
      {loading && <p>loading ...</p>}
      {translatedText && <div>Translated Text: {translatedText}</div>}
      {error && <div>{error}</div>}
    </div>
  );
}

export default TranslatePage;
// import React, { useState } from 'react';

// function MyComponent() {
//   // State to hold the selected option
//   const [selectedOption, setSelectedOption] = useState('');

//   // Function to handle option change
//   const handleOptionChange = (event) => {
//     setSelectedOption(event.target.value);
//   };

//   // Function to handle form submission with selected option
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Here you can use the selectedOption state value as needed
//     console.log('Selected option:', selectedOption);
//   };

//   return (
//     <div>
//       <h2>Select an option:</h2>
//       <form onSubmit={handleSubmit}>
//         <select value={selectedOption} onChange={handleOptionChange}>
//           <option value="">Select an option</option>
//           <option value="option1">Option 1</option>
//           <option value="option2">Option 2</option>
//           <option value="option3">Option 3</option>
//           {/* Add more options as needed */}
//         </select>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

// export default MyComponent;
