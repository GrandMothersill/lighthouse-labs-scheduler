import React from "react";

import "components/Application.scss";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors"
import useApplicationData from "hooks/useApplicationData"
import DayList from "components/DayList";
import Appointment from "components/Appointment";

export default function Application(props) {
  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: {},
  //   interviewers: {}
  // });

  // const setDay = day => setState({ ...state, day });

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();


  const interviewers = getInterviewersForDay(state, state.day)

  const appointments = getAppointmentsForDay(state, state.day)

  // useEffect(() => {
  //   function getDays() {
  //     return axios.get(`http://localhost:8001/api/days`);
  //   }

  //   function getAppointmentData() {
  //     return axios.get('http://localhost:8001/api/appointments');
  //   }

  //   function getInterviewersData() {
  //     return axios.get('http://localhost:8001/api/interviewers');
  //   }

  //   Promise.all([getDays(), getAppointmentData(), getInterviewersData()])
  //     .then(function (results) {
  //       setState(prev => ({ ...prev, days: results[0].data, appointments: results[1].data, interviewers: results[2].data }));
  //     });

  // }, []);




  // function bookInterview(id, interview) {
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: { ...interview }
  //   };
  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   };
  //   setState({
  //     ...state,
  //     appointments
  //   });

  //   console.log(id, interview);

  //   return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
  //     .then(() => setState({ ...state, appointments }))

  // }

  // function cancelInterview(id) {
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: null
  //   };
  //   console.log("APPT", appointment)
  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   };
  //   setState({
  //     ...state,
  //     appointments
  //   });

  //   return axios.delete(`/api/appointments/${id}`)
  //     .then(() => setState({ ...state, appointments }))
  // }

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
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

        {schedule}
        <Appointment key="last" time="5pm" />

      </section>
    </main>
  );
}
