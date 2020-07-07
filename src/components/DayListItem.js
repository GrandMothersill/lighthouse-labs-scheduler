import React from "react";
import "components/DayListItem.scss";
var classNames = require('classnames');

export default function DayListItem(props) {
  const dayListItemClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  const formatSpots = function() {
    if (props.spots === 0) {
      return `no spots remaining`
    } else if (props.spots !== 1) {
      return `${props.spots} spots remaining`
    } else {
      return `${props.spots} spot remaining`
    }
  }

  return (
    <li key={props.id} onClick={() => props.setDay(props.name)} className={dayListItemClass}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}