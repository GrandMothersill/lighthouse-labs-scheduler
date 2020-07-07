
import React from "react";
import "components/InterviewerListItem.scss";
var classNames = require('classnames');



export default function InterviewerListItem(props) {
  const interviewerListItemClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });

  return (
    <li key={props.id} onClick={() => props.setInterviewer(props.name)} className={interviewerListItemClass}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  )
}