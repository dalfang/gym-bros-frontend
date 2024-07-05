import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./WorkoutDetailsPage.css"
const API_URL = import.meta.env.VITE_API_URL;

const WorkoutDetailsPage = () => {
  const { id } = useParams();
  const [workout, setWorkout] = useState(null);

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/workouts/one-workout/${id}`
        );
        console.log("workout data:", data)
        setWorkout(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchWorkout();
  }, [id]);

  if (!workout) {
    return <div>Loading...</div>;
  }

  return (
    <div className="workout-details">
      <h2>{workout.name}</h2>
      <p><strong>Type:</strong> {workout.type}</p>
      <p><strong>Muscle:</strong> {workout.muscle}</p>
      <p><strong>Equipment:</strong> {workout.equipment}</p>
      <p><strong>Difficulty:</strong> {workout.difficulty}</p>
      <p><strong>Instructions:</strong><br/>{workout.instructions}</p>
      <br />
      {workout.image && <img src={workout.image} alt={workout.name} />}
    </div>
  );
};

export default WorkoutDetailsPage;
