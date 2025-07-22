import React, { useState } from 'react';
import axios from 'axios';

const DataSender = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  // Send POST request to FastAPI backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = {
      name: name,
      description: description,
    };

    try {
      const response = await axios.post('http://localhost:8000/process-data/', data);
      setResponseMessage(response.data.message);
    } catch (error) {
      console.error('Error during API request:', error);
    }
  };

  return (
    <div>
      <h2>Send Data to FastAPI</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </div>
        <div>
          <label>Description: </label>
          <input 
            type="text" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      {responseMessage && <div>{responseMessage}</div>}
    </div>
  );
};

export default DataSender;
