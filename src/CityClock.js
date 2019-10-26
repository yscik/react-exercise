import React, {useEffect, useState} from "react";
import {adjustDateForTimezone, formatTime} from "./timeFormat.js";

export function CityClock({timezoneOffset = 0, city})
{
  const currentTime = () => getCurrentFormattedTimeForTimezone(timezoneOffset);

  const [time, setTime] = useState(currentTime());

  useEffect(() => {
    const timer = setInterval(() => setTime(currentTime()), 1000);
    return () => clearInterval(timer);
  });

  return (
      <div className="cityClock">
        <div className="cityClock__time">{time}</div>
        <div className="cityClock__city">{city}</div>
      </div>
  )
}

function getCurrentFormattedTimeForTimezone(timezoneOffset) {
  const date = new Date();
  adjustDateForTimezone(date, timezoneOffset);

  return formatTime(date, {separator: '\n'});
}

