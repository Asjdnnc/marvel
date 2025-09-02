import { useState } from "react";

export default function SearchBar() {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", search);
  };

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for a movie"
        style={{ padding: "10px", width: "300px", borderRadius: "4px" }}
      />
      <button onClick={handleSearch} style={{ marginLeft: "10px", padding: "10px" }}>
        Search
      </button>
    </div>
  );
}