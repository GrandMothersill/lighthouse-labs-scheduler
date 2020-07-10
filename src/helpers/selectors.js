import InterviewerList from "components/InterviewerList";
import { useCallback } from "react";

export function getAppointmentsForDay(state, day) {
    const appointmentsForDay = [];
    const requestedDay = state.days.filter(date => date.name === day)[0]

    if (requestedDay && requestedDay.appointments) {
        for (const id of requestedDay.appointments) {
            appointmentsForDay.push(state.appointments[id]);
        }
    }
    return appointmentsForDay
};

export function getInterview(state, interview) {
    if (!interview) {
        return null;
    }
    return (
        {
            "student": interview.student,
            "interviewer": {
                "id": interview.interviewer,
                "name": state.interviewers[interview.interviewer].name,
                "avatar": state.interviewers[interview.interviewer].avatar
            }
        }
    )
}



export default { getAppointmentsForDay, getInterview };