function timer(id, deadline) {
  // Timer

  function getTimeRemaining(endtime) {
    // преобразование полученной извне строки в числовое представление
    // получение разницы между заданной датой и текущей (можно просто new Date())
    const t = Date.parse(endtime) - Date.parse(new Date()),
      // 1000 милисекунд * 60 секунд * 60 минут * 24 часа
      days = Math.floor(t / 86400000),
      hours = Math.floor((t / 3600000) % 24),
      minutes = Math.floor((t / 60000) % 60),
      seconds = Math.floor((t / 1000) % 60);

    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const
      timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(updateClock, 1000);

    // для устранения задержки (мигания) между отображением даты из вёрстки 
    // и просчитанного функцией времени
    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(id, deadline);
}

export default timer;