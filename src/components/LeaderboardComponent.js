import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase"; // Ensure you have the correct path to your firebase.js
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ZAxis,
} from "recharts";
import CustomTooltip from "./CustomTooltip"; // Ensure the path is correct
import thresholds from "../data.json"; // Import your scoreThresholds from data.json

const LeaderboardComponent = ({ onGoBack }) => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const leaderboardCollection = await getDocs(
        collection(db, "leaderboard")
      );
      const leaderboardData = leaderboardCollection.docs.map((doc) =>
        doc.data()
      );
      setLeaderboard(leaderboardData.sort((a, b) => b.score - a.score));
    };

    fetchLeaderboard();
  }, []);

  // Prepare data for ScatterChart
  const greenData = [];
  const yellowData = [];
  const redData = [];

  leaderboard.forEach((entry, index) => {
    const point = {
      id: index + 1,
      username: entry.username, // Assuming username is the LinkedIn username
      score: entry.score,
      size: entry.score, // You can scale this based on your needs
      color: "#dc3545", // Default to red
    };

    if (entry.score >= thresholds.scoreThresholds.green) {
      point.color = "#28a745"; // Green
      greenData.push(point);
    } else if (entry.score >= thresholds.scoreThresholds.yellow) {
      point.color = "#ffc107"; // Yellow
      yellowData.push(point);
    } else {
      redData.push(point);
    }
  });

  return (
    <div className="container mt-4 text-center wrapper">
      <h1 style={{ color: "white" }}>Leaderboard</h1>
      <ResponsiveContainer width="100%" height={500}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid />
          <XAxis dataKey="username" name="Username" tick={false} />{" "}
          {/* Hide X-axis values */}
          <YAxis type="number" dataKey="score" name="Score" />
          <ZAxis type="number" dataKey="size" range={[60, 400]} name="Size" />
          <Tooltip content={<CustomTooltip />} /> {/* Use the custom tooltip */}
          <Legend />
          <Scatter name="Senior" data={greenData} fill="#28a745" />
          <Scatter name="Intermediate" data={yellowData} fill="#ffc107" />
          <Scatter name="Junior" data={redData} fill="#dc3545" />
        </ScatterChart>
      </ResponsiveContainer>
      <Button
        onClick={onGoBack}
        style={{
          backgroundColor: "#89045d",
          borderColor: "#89045d",
          marginTop: "20px",
        }}
      >
        Back to Quiz
      </Button>
    </div>
  );
};

export default LeaderboardComponent;
