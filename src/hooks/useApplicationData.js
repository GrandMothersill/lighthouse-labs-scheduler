import { useState, useEffect } from "react";

import "components/Application.scss";

const axios = require('axios').default;

// used to set state, make api calls, book, and cancel interviews. Called in Application.js
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
            return axios.get(`/api/days`);
        };
        function getAppointmentData() {
            return axios.get('/api/appointments');
        };
        function getInterviewersData() {
            return axios.get('/api/interviewers');
        };

        Promise.all([getDays(), getAppointmentData(), getInterviewersData()])
            .then(function (results) {
                setState(prev => ({ ...prev, days: results[0].data, appointments: results[1].data, interviewers: results[2].data }));
            });

    }, []);


    function getDayIndex() {
        let index = 0
        for (const day of state.days) {
            if (day.name === state.day) {
                return index
            } else {
                index++
            }
        }
    };

    function bookInterview(id, interview) {
        const selectedDay = getDayIndex();
        const newSpotCount = (state.days[selectedDay].spots - 1)

        const day = {
            ...state.days[selectedDay],
            spots: state.appointments[id].interview ? state.days[selectedDay].spots : newSpotCount
        }
        const days = [
            ...state.days,
        ]
        days[selectedDay] = day

        const appointment = {
            ...state.appointments[id],
            interview: { ...interview }
        };
        const appointments = {
            ...state.appointments,
            [id]: appointment
        };

        return axios.put(`/api/appointments/${id}`, { interview })
            .then(() => setState(prev => ({ ...prev, days, appointments })))

    };

    function cancelInterview(id) {

        const appointment = {
            ...state.appointments[id],
            interview: null
        };

        const appointments = {
            ...state.appointments,
            [id]: appointment
        };

        const selectedDay = getDayIndex();
        const newSpotCount = (state.days[selectedDay].spots + 1)

        const day = {
            ...state.days[selectedDay],
            spots: newSpotCount
        }
        const days = [
            ...state.days,
        ]
        days[selectedDay] = day

        return axios.delete(`/api/appointments/${id}`)
            .then(() => setState(prev => ({ ...prev, days, appointments })))
    };

    return (
        {
            state,
            setDay,
            bookInterview,
            cancelInterview
        }
    )

};



