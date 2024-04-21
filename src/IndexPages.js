// IndexPage.js
import React, { useState } from "react";
import useSWR from "swr";
import axios from "axios";

// const fetcher = (...args) => fetch(...args).then(res => res.json());
export const fetcher = (url) =>
  axios
    .get(url, {
      headers: {
        "X-RapidAPI-Key": "b77cc0403dmshd56eb519180ee3ep135e81jsnd98ccf1c86dc",
        "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
      },
    })
    .then((res) => res.data);

function IndexPages() {
  // const [value,setvalue]=useState('')
  const [selectedOption, setSelectedOption] = useState("");
  const { data, error } = useSWR(
    "https://google-translate1.p.rapidapi.com/language/translate/v2/languages",
    fetcher,
  );

  if (error) return <div>Error fetching languages!</div>;
  if (!data) return <div>Loading...</div>;
  if (!data.data || !data.data.languages)
    return <div>No languages available.</div>;

  // function f1(event){
  //   event.preventDefault();
  //   console.log(value);
  //   setvalue(event.target.value)
  // }
  // function MyComponent() {
  // State to hold the selected option

  // Function to handle option change
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Function to handle form submission with selected option
  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can use the selectedOption state value as needed
    console.log("Selected option:", selectedOption);
  };

  return (
    <div>
      {/* <select onChange={f1}> */}
      <form onSubmit={handleSubmit}>
        <select value={selectedOption} onChange={handleOptionChange}>
          {data.data.languages.map((language, index) => (
            <option key={index} value={language.language}>
              {language.language}
            </option>
          ))}
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default IndexPages;
