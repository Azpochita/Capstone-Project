import React, { useReducer } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './Header';
import Booking from './Booking';
import ConfirmedBooking from './ConfirmedBooking';

const Main = () => {

  // Function to generate pseudo-random numbers
  const seedRandom = function (seed) {
    var m = 2 ** 35 - 31;
    var a = 185852;
    var s = seed % m;
    return function () {
      return (s = (s * a) % m) / m;
    };
  };

  // Fetch available times based on the selected date
  const fetchAPI = function (date) {
    let result = [];
    let random = seedRandom(new Date(date).getDate());
    for (let i = 17; i <= 23; i++) {
      if (random() < 0.5) {
        result.push(i + ':00');
      }
      if (random() < 0.5) {
        result.push(i + ':30');
      }
    }
    return result;
  };

  const submitAPI = function (formData) {
    return true;
  };

  // Reducer function to update available times when the date changes
  function updateTimes(state, date) {
    return { availableTimes: fetchAPI(new Date()) };
  }

  // Initial state with current date's available times
  const initialState = { availableTimes: fetchAPI(new Date()) };
  const [state, dispatch] = useReducer(updateTimes, initialState);

  const navigate = useNavigate();

  function submitForm(formData) {
    if (submitAPI(formData)) {
      navigate("/confirmed");
    }
  }

  return (
    <main className='main'>
      <Routes>
        <Route path='/' element={<Header />} />
        <Route
          path='/booking'
          element={<Booking availableTimes={state} dispatch={dispatch} submitForm={submitForm} />}
        />
        <Route path='/confirmed' element={<ConfirmedBooking />} />
      </Routes>
    </main>
  );
};

export default Main;
