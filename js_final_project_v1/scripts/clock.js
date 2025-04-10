const hourHand = document.querySelector(".hour-hand");
const minuteHand = document.querySelector(".minute-hand");
const secondHand = document.querySelector(".second-hand");

const initClock = () => {
  const clock = document.querySelector(".clock");
  const centerX = 150;
  const centerY = 150;
  const radius = 120;

  for (let i = 1; i <= 12; i++) {
    const angle = (i * 30 - 90) * (Math.PI / 180);
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    // Create a number element
    const number = document.createElement("div");
    number.className = `hour hour-${i}`;
    number.textContent = i;
    number.style.position = "absolute";
    number.style.left = `${x}px`;
    number.style.top = `${y}px`;

    // Append the number to the clock
    clock.appendChild(number);
  }
};

const updateClock = () => {
  const now = new Date();
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const hDeg = (hour % 12) * 30 + minutes * 0.5;
  const mDeg = minutes * 6 + seconds * 0.1;
  const sDeg = seconds * 6;
  hourHand.style.transform = `rotate(${hDeg}deg)`;
  minuteHand.style.transform = `rotate(${mDeg}deg)`;
  secondHand.style.transform = `rotate(${sDeg}deg)`;
};

initClock();
updateClock();

setInterval(updateClock, 1000);
