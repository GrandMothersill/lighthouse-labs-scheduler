import React, { useState, useEffect } from "react";

import "components/Application.scss";

import { getAppointmentsForDay, getInterview } from "helpers/selectors"
import DayList from "components/DayList";
import Appointment from "components/Appointment";
const axios = require('axios').default;

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));


  useEffect(() => {
    function getDays() {
      return axios.get(`http://localhost:8001/api/days`);
    }

    function getAppointmentData() {
      return axios.get('http://localhost:8001/api/appointments');
    }

    function getInterviewersData() {
      return axios.get('http://localhost:8001/api/interviewers');
    }

    Promise.all([getDays(), getAppointmentData(), getInterviewersData()])
      .then(function (results) {
        setState(prev => ({ ...prev, days: results[0].data, appointments: results[1].data, interviewers: results[2].data }));
      });

  }, []);

  const appointments = getAppointmentsForDay(state, state.day)

  const schedule = appointments.map(appointment => {
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">


        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        {schedule}
        <Appointment key="last" time="5pm" />


      </section>
    </main>
  );
}
