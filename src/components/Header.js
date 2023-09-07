import React, { useState, useEffect } from "react";
import { fetchVideos } from "../api/Api"; 

function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    try {
      setLoading(true); 
      const response = await fetchVideos(query, 10); 
      const data = await response.json();
      setSearchResults(data.results);
      setLoading(false); 
    } catch (error) {
      console.error("Error fetching videos:", error);
      setLoading(false); 
    }
  };

  useEffect(() => {
    
    if (searchQuery === "") {
      setSearchResults([]);
    }
  }, [searchQuery]);

  return (
    <header>
      <div className="logo">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/000/595/983/small/04012019-25.jpg"
          alt="Logo"
          style={{ width: "100px", height: "100px" }}
        />
      </div>
      <div className="profile-image">
        <img
          src="https://media.licdn.com/dms/image/D4D03AQFUcjhxazw-QA/profile-displayphoto-shrink_800_800/0/1686357376609?e=2147483647&v=beta&t=3a7lzWpIvKdeiF9zZCn8MPCwrIEuw0k8QvQfNM2zyAc"
          alt="Profile"
          style={{ width: "80px", height: "80px" }}
        />
      </div>

  
      {loading && <div>Loading...</div>}
      <div className="search-results">
        {searchResults && searchResults.length > 0
          ? searchResults.map((result) => (
              <div key={result.heading} className="search-result">
                <h3>{result.heading}</h3>
                <p>{result.text}</p>
                <video width="320" height="240" controls>
                  <source src={result.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div>Tags: {result.tags.join(", ")}</div>
              </div>
            ))
          : null}{" "}
        
      </div>
    </header>
  );
}

export default Header;
