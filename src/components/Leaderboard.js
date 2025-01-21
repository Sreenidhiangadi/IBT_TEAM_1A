import React, { useState, useEffect } from "react";

const Leaderboard = ({ scores }) => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [sortMode, setSortMode] = useState("score"); // "score" or "alphabet"

  useEffect(() => {
    // Debug: Log received scores
    console.log("Scores received:", scores);

    // Sort data based on the selected mode
    const sortedData = [...scores].sort((a, b) => {
      if (sortMode === "score") {
        return b.score - a.score; // Sort by score (descending)
      } else if (sortMode === "alphabet") {
        return a.user.localeCompare(b.user); // Sort alphabetically
      }
      return 0;
    });

    // Debug: Log sorted data
    console.log("Sorted data:", sortedData);

    // Take top 10 members
    setLeaderboardData(sortedData.slice(0, 10));
  }, [scores, sortMode]);

  return (
    <div>
      <h1>Leaderboard</h1>

      {/* Sorting Controls */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setSortMode("score")}
          style={{
            marginRight: "10px",
            padding: "10px",
            border: "none",
            backgroundColor: "#007bff",
            color: "white",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Sort by Score
        </button>
        <button
          onClick={() => setSortMode("alphabet")}
          style={{
            padding: "10px",
            border: "none",
            backgroundColor: "#007bff",
            color: "white",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Sort Alphabetically
        </button>
      </div>

      {/* Leaderboard Table */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Rank</th>
            <th style={tableHeaderStyle}>Name</th>
            <th style={tableHeaderStyle}>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((member, index) => (
            <tr key={member.id}>
              <td style={tableCellStyle}>{index + 1}</td>
              <td style={tableCellStyle}>{member.user}</td>
              <td style={tableCellStyle}>{member.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Styling for table headers and cells
const tableHeaderStyle = {
  backgroundColor: "#f4f4f4",
  padding: "10px",
  border: "1px solid #ddd",
  textAlign: "center",
};

const tableCellStyle = {
  padding: "10px",
  border: "1px solid #ddd",
  textAlign: "center",
};

export default Leaderboard;
