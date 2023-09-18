import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

// Component for displaying a single image item
function ImageItem({ item }) {
  return (
    <li key={item.id}>
      <img src={item.download_url} alt={`Image ${item.id}`} width="200" />
    </li>
  );
}

// Component for the image list
function ImageList({ data }) {
  return (
    <ul className="image-list">
      {data.map((item) => (
        <ImageItem key={item.id} item={item} />
      ))}
    </ul>
  );
}

// Main App component
function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://picsum.photos/v2/list?page=${page}&limit=10`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  return (
    <div className="App">
      <h1>aDMe Assignment</h1>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={page === 1}>
          Previous
        </button>
        <button onClick={handleNextPage}>Next</button>
      </div>
      <ImageList data={data} />
    </div>
  );
}

export default App;
