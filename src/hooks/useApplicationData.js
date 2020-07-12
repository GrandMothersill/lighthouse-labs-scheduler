import { useState, useEffect } from "react";

import "components/Application.scss";

const axios = require('axios').default;

export default function useApplicationData() {
    const [state, setState] = useState({
        day: "Monday",
        days: [],
        appointments: {},
        interviewers: {}
    });

    const setDay = day => setState({ ...state, day });

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

    function bookInterview(id, interview) {
        const appointment = {
            ...state.appointments[id],
            interview: { ...interview }
        };
        const appointments = {
            ...state.appointments,
            [id]: appointment
        };
        setState({
            ...state,
            appointments
        });

        console.log(id, interview);

        return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
            .then(() => setState({ ...state, appointments }))

    }

    function cancelInterview(id) {
        const appointment = {
            ...state.appointments[id],
            interview: null
        };
        console.log("APPT", appointment)
        const appointments = {
            ...state.appointments,
            [id]: appointment
        };
        setState({
            ...state,
            appointments
        });

        return axios.delete(`/api/appointments/${id}`)
            .then(() => setState({ ...state, appointments }))
    }


    return (
        {
            state,
            setDay,
            bookInterview,
            cancelInterview
        }
    )

}



