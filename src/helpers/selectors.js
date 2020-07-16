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
};

export function getInterviewersForDay(state, day) {
    const interviewersForDay = [];
    const requestedDay = state.days.filter(date => date.name === day)[0]

    if (requestedDay && requestedDay.interviewers) {
        for (const id of requestedDay.interviewers) {
            interviewersForDay.push(state.interviewers[id]);
        }
    }
    return interviewersForDay
};

export default { getAppointmentsForDay, getInterview, getInterviewersForDay };