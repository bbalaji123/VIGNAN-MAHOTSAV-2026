import { useEffect, useState } from "react";
import "./ComingSoon.css";

const eventDate = new Date("Feb 5, 2026 00:00:00").getTime();

function getTimeLeft() {
  const now = Date.now();
  const diff = eventDate - now;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function ComingSoon() {
  // ⬅️ INITIALIZED WITH REAL VALUES
  const [time, setTime] = useState(getTimeLeft);

  const [animate, setAnimate] = useState({
    days: false,
    hours: false,
    minutes: false,
    seconds: false,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = getTimeLeft();

      setTime(prev => {
        setAnimate({
          days: prev.days !== newTime.days,
          hours: prev.hours !== newTime.hours,
          minutes: prev.minutes !== newTime.minutes,
          seconds: prev.seconds !== newTime.seconds,
        });

        setTimeout(() => {
          setAnimate({
            days: false,
            hours: false,
            minutes: false,
            seconds: false,
          });
        }, 400);

        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="main-container">
      <div className="background" />
      <div className="gold" />
      <div className="flower" />
      <div className="vignan-logo" />

      <div className="timer">
        {["days", "hours", "minutes", "seconds"].map(unit => (
          <div className="time-unit" key={unit}>
            <div className={`digit ${animate[unit as keyof typeof animate] ? "change" : ""}`}>
              {time[unit as keyof typeof time]}
            </div>
            <div className="label">
              {unit.charAt(0).toUpperCase() + unit.slice(1)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
