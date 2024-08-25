import React, { useState } from 'react';
import JsonInputForm from './JsonInputForm';

const App = () => {
  const [response, setResponse] = useState(null);
  const [filter, setFilter] = useState([]);

  const handleSubmit = async (jsonData) => {
    try {
      const res = await fetch('http://your-backend-api-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleFilterChange = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFilter(value);
  };

  const getFilteredResponse = () => {
    if (!response) return null;
    const { Alphabets, Numbers, HighestLowercase } = response;

    let filteredResponse = '';
    if (filter.includes('Alphabets')) filteredResponse += Alphabets + ' ';
    if (filter.includes('Numbers')) filteredResponse += Numbers + ' ';
    if (filter.includes('HighestLowercase')) filteredResponse += HighestLowercase + ' ';

    return filteredResponse.trim();
  };

  return (
    <div>
      <JsonInputForm onSubmit={handleSubmit} />
      {response && (
        <>
          <select multiple onChange={handleFilterChange}>
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="HighestLowercase">Highest Lowercase Alphabet</option>
          </select>
          <div>
            <h3>Filtered Response:</h3>
            <p>{getFilteredResponse()}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
