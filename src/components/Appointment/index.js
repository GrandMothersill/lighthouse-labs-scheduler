import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form"
import Status from "components/Appointment/Status"
import Confirm from "components/Appointment/Confirm"
import Error from "components/Appointment/Error"

import useVisualMode from "hooks/useVisualMode"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
    const { mode, transition, back } = useVisualMode(
        props.interview ? SHOW : EMPTY
    );

    function save(name, interviewer) {
        const interview = {
            student: name,
            interviewer
        };
        transition(SAVING);
        props.bookInterview(props.id, interview)
            .then(() => transition(SHOW))
            .catch(error => transition(ERROR_SAVE, true));
    }

    function deleteInterview(event) {
        transition(DELETING, true);
        props.cancelInterview(props.id)
            .then(() => transition(EMPTY))
            .catch(error => transition(ERROR_DELETE, true));
    }

    return (
        <article data-testid="appointment" className="appointment">
            <Header time={props.time} />
            {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
            {mode === SHOW && (
                <Show
                    student={props.interview.student}
                    interviewer={props.interview.interviewer}
                    onDelete={() => transition(CONFIRM)}
                    onEdit={() => transition(EDIT)}
                />
            )}
            {mode === CREATE && <Form onSave={save} onCancel={() => back(EMPTY)} interviewers={props.interviewers} />}
            {mode === SAVING && <Status message="Saving" />}
            {mode === DELETING && <Status message="Deleting" />}
            {mode === CONFIRM && <Confirm message="Are you sure you would like to delete?" onConfirm={deleteInterview} onCancel={() => transition(SHOW)} />}
            {mode === EDIT && <Form name={props.interview.student} interviewer={props.interview.interviewer.id} onSave={save} onCancel={() => back(EMPTY)} interviewers={props.interviewers} />}
            {mode === ERROR_SAVE && <Error onClose={() => back()} message="Save Error" />}
            {mode === ERROR_DELETE && <Error onClose={() => back()} message="Delete Error" />}
        </article>
    )
}