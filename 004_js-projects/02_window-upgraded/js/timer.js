const TIMER_INTERVAL = 1000;
const TIMER_DEADLINE = '2025/12/31';

const formatTime = (num) => String(num).padStart(2, '0');

const getRemainingTime = (targetTime) => {
  const time = Date.parse(targetTime) - Date.now();
  let days, hours, minutes, seconds;
  if (time <= 0) {
    days = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;
  } else {
    days = Math.floor(time / (1000 * 60 * 60 * 24));
    hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    minutes = Math.floor((time / (1000 * 60)) % 60);
    seconds = Math.floor((time / 1000) % 60);
  }
  return {
    total: time,
    days,
    hours,
    minutes,
    seconds,
  };
};

const setTimer = (selector, deadline) => {
  const timerNode = document.querySelector(selector);
  const daysNode = timerNode.querySelector('#days');
  const hoursNode = timerNode.querySelector('#hours');
  const minutesNode = timerNode.querySelector('#minutes');
  const secondsNode = timerNode.querySelector('#seconds');

  const timeInterval = setInterval(renderClock, TIMER_INTERVAL);

  function renderClock () {
    const remainingTime = getRemainingTime(deadline);

    daysNode.innerHTML = formatTime(remainingTime.days);
    hoursNode.innerHTML = formatTime(remainingTime.hours);
    minutesNode.innerHTML = formatTime(remainingTime.minutes);
    secondsNode.innerHTML = formatTime(remainingTime.seconds);

    if (remainingTime.total <= 0) {
      clearInterval(timeInterval);
    }
  }

  renderClock();
};

const initTimers = () => {
  setTimer('#timer', TIMER_DEADLINE);
};

export {initTimers};
