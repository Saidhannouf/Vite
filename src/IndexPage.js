  // IndexPage.js
  import React from 'react';
  import useSWR from 'swr';
  import axios from 'axios';

  // const fetcher = (...args) => fetch(...args).then(res => res.json());
  export const fetcher = (url: string) => axios.get(url, {
    headers: {
      'X-RapidAPI-Key': 'b77cc0403dmshd56eb519180ee3ep135e81jsnd98ccf1c86dc',
      'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
    }
  }).then(res => res.data);
  
  function IndexPage() {
    const { data, error } = useSWR(
      'https://google-translate1.p.rapidapi.com/language/translate/v2/languages',
      fetcher
    );

    if (error) return <div>Error fetching languages!</div>;
    if (!data) return <div>Loading...</div>;
    if (!data.data || !data.data.languages) return <div>No languages available.</div>;

    return (
      <div>
          <select>
            {data.data.languages.map((language, index) => (
                <option key={index}>{language.language}</option>
              ))} 

            </select>
         
        <h1>List of Languages</h1>
        <ul>
          {data.data.languages.map((language, index) => (
            <li key={index}>{language.language}</li>
          ))}
        </ul>
          
      </div>
    );
  }

  export default IndexPage;
  
