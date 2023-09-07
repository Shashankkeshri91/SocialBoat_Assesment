import React, { useState, useEffect } from "react";
import { fetchVideos } from "../api/Api"; 

function SearchResults() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      return; // Don't make empty queries
    }

    setLoading(true);

    try {
      const response = await fetchVideos(searchQuery, 10); 
      setSearchResults(response.results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching videos:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery]); 

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {loading && <div>Loading...</div>}
      <ul>
        {searchResults && searchResults.length > 0 ? (
          searchResults.map((result, index) => (
            <li key={index}>
              <h3>{result.heading}</h3>
              <p>{result.text}</p>
              <video width="320" height="240" controls>
                <source src={result.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div>Tags: {result.tags.join(", ")}</div>
            </li>
          ))
        ) : (
          <li>No results found.</li>
        )}
      </ul>
    </div>
  );
}

export default SearchResults;
