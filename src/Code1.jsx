import { useState, useEffect } from "react";

const Code1 = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      setData(data);
      setFilteredData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filterData = () => {
    const results = data.filter((item) => {
      return (
        item.title.includes(searchTerm) &&
        (filterOption === "" || item.id === parseInt(filterOption))
      );
    });
    setFilteredData(results);
  };

  const displayResults = () => {
    if (filteredData.length === 0) {
      return <div>No results found.</div>;
    }

    return filteredData.map((result) => (
      <div key={result.id}>
        <h3>{result.title}</h3>
        <p>{result.body}</p>
      </div>
    ));
  };

  return (
    <div>
      <h1>API Data Search</h1>
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter search term..."
        />
        <select
          value={filterOption}
          onChange={(e) => setFilterOption(e.target.value)}
        >
          <option value="">All</option>
          {data.map((item) => (
            <option key={item.id} value={item.id}>
              ID {item.id}
            </option>
          ))}
        </select>
        <button onClick={filterData}>Search</button>
      </div>
      <div id="searchResults">{displayResults()}</div>
    </div>
  );
};

export default Code1;
