// DataSender.js
const DataSender = async (prompt) => {
  try {
    const response = await fetch('http://localhost:8000/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch response from FastAPI backend');
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error(error);
    return "Error: " + error.message;
  }
};

export default DataSender;
