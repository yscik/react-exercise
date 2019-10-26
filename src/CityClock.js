import React, {useEffect, useState} from "react";

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
  const date = getDateForTimezone(timezoneOffset);

  return formatTime(date);
}

function getDateForTimezone(timezoneOffset) {
  const date = new Date();
  date.setUTCHours(date.getUTCHours() + timezoneOffset || 0);
  return date;
}

function formatTime(date) {
  const [hour, min, sec] = [date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()]
      .map(s => ("" + s).padStart(2, '0'));
  return `${hour}\n${min}\n${sec}`;
}
