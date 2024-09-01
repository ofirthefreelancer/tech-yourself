import React from "react";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: data.color, // Set tooltip background color to bubble color
          padding: "10px",
          border: "1px solid #ccc",
          color: "#fff", // White text for contrast
        }}
      >
        <p>
          LinkedIn: {data.username} <br />
          Score: {data.score}
        </p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
