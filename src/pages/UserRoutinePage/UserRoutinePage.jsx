import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CreateMeal from "../../components/CreateMeal/CreateMeal";
import mealService from "../../services/meal.service";
import { AuthContext } from "../../context/auth.context";
import routineService from "../../services/routine.service";
import CreateRoutine from "../../components/CreateRoutine/CreateRoutine";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const UserRoutinePage = () => {
  const { currentUser, isLoading } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCreateMeal, setShowCreateMeal] = useState(false);
  const [showCreateRoutine, setShowCreateRoutine] = useState(false);
  const [meals, setMeals] = useState([]);
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    const getCurrUser = async() => {
      try { 
        const { data } = await axios.get(`${API_URL}/auth/profile`,{ headers: {authorization:`Bearer ${token}`  }})
        console.log(data);
        setRoutines(data.currentRoutine)

      } 
      catch (error) {

      }
    }
    if (!isLoading && currentUser) {
      const fetchMeals = async () => {
        try {
          const mealsResponse = await mealService.fetchUserMeals(currentUser._id);
          setMeals(mealsResponse.data || []);
        } catch (error) {
          console.error("Error fetching meals:", error);
        }
      };

      const fetchRoutines = async () => {
        try {
          const routinesResponse = await routineService.fetchUserRoutines(currentUser._id);
          setRoutines(routinesResponse.data || []);
        } catch (error) {
          console.error("Error fetching routines:", error);
        }
      };

      getCurrUser();

      //fetchMeals();
      //fetchRoutines();
    }
  }, [isLoading, currentUser]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleMealCreated = (newMeal) => {
    setMeals((prevMeals) => [...prevMeals, newMeal]);
  };

  const handleRoutineCreated = (newRoutine) => {
    setRoutines((prevRoutines) => [...prevRoutines, newRoutine]);
  };

  const filterEntriesByDate = (entries) => {
    return entries.filter(entry => {
      const entryDate = new Date(entry.date).toDateString();
      const selectedDateString = selectedDate.toDateString();
      return entryDate === selectedDateString;
    });
  };

  const filteredMeals = filterEntriesByDate(meals);
  const filteredRoutines = filterEntriesByDate(routines);

  if (isLoading) return <div>Loading...</div>;
  if (!currentUser) return <div>Please log in to view your routines.</div>;

  return (
    <div className="user-routine-page">
      <h1>Your Routine</h1>
      <div className="calendar-container">
        <Calendar onChange={handleDateChange} value={selectedDate} />
      </div>

      <div className="routine-links">
        <button onClick={() => setShowCreateMeal(true)}>Add Meal</button>
        <button onClick={() => setShowCreateRoutine(true)}>Add Routine</button>
        <Link to="/meals">Manage Meals</Link>
        <Link to="/routines">Manage Routines</Link>
      </div>

      {showCreateMeal && (
        <CreateMeal setOpen={setShowCreateMeal} onMealCreated={handleMealCreated} selectedDate={selectedDate} />
      )}
      {showCreateRoutine && (
       <CreateRoutine setOpen={setShowCreateRoutine} onRoutineCreated={handleRoutineCreated} selectedDate={selectedDate} />
      )}

      <div className="user-entries">
        <h2>Meals and Routines for {selectedDate.toDateString()}</h2>
        <div className="entries">
          <h3>Meals</h3>
          <ul>
            {filteredMeals.length > 0 ? (
              filteredMeals.map((meal) => <li key={meal._id}>{meal.name}</li>)
            ) : (
              <p>No meals available</p>
            )}
          </ul>
          <h3>Routines</h3>
          <ul>
            {filteredRoutines.length > 0 ? (
              filteredRoutines.map((routine) => <li key={routine._id}>{routine.name}</li>)
            ) : (
              <p>No routines available</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserRoutinePage;