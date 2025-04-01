import fetchData from "./fetchData.js";

// elements
const mothSelect = document.getElementById("month");
const daySelect = document.getElementById("day");
const form = document.getElementById("birthday-form");
const resultSection = document.querySelector(".result");
const userInfo = document.querySelector(".user-info");
const errorEl = document.querySelector(".error");

// populate days to select based on month
const populateDays = () => {
  mothSelect.addEventListener("change", () => {
    const year = new Date().getFullYear();
    const selectedMoth = parseInt(mothSelect.value);
    const daysInMonth = new Date(year, selectedMoth, 0).getDate();

    daySelect.innerHTML = `
    <option>
      Select Day
    </option>
    `;

    for (let day = 1; day <= daysInMonth; day++) {
      const option = document.createElement("option");
      option.value = day;
      option.textContent = day;
      daySelect.appendChild(option);
    }
  });
};

// events
document.addEventListener("DOMContentLoaded", () => {
  console.log("loaded");
  populateDays();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  handleSubmit(mothSelect.value, daySelect.value);
});

// handle form submit
const handleSubmit = async (selectedMonth, selectedDay) => {
  // if month or day is not selected, dont fecth data
  if (!selectedMonth || !parseInt(selectedDay)) {
    console.log("not selected");
    errorEl.textContent = "Please select month and day!";
    errorEl.classList.add("show-error");
    return;
  }

  // clear error element
  errorEl.textContent = "";
  errorEl.classList.remove("show-error");

  // if month and day are selected, fetch data and render result
  if (selectedMonth && selectedDay) {
    userInfo.classList.remove("show-user-info");
    const month = parseInt(selectedMonth);
    const day = parseInt(selectedDay);
    const sign = getSign(month, day);

    const data = await fetchData(sign);

    if (data) {
      populateResultSection(data, sign);
    } else {
      console.log("Failed to get data");
    }
  }
};

// get sign based on date of birth
const getSign = (month, day) => {
  if ((month === 1 && day <= 19) || (month === 12 && day >= 22)) {
    return "capricorn";
  } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return "aquarius";
  } else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
    return "pisces";
  } else if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return "aries";
  } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return "taurus";
  } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    return "gemini";
  } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    return "cancer";
  } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return "leo";
  } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return "virgo";
  } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    return "libra";
  } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    return "scorpio";
  } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    return "sagittarius";
  }
};

// result section UI
const populateResultSection = (data, sign) => {
  resultSection.innerHTML = "";
  resultSection.classList.add("show-result");
  const horoscope = data.data.horoscope_data;
  const challengingDays = data.data.challenging_days;
  const standoutDays = data.data.standout_days;
  const sectionHTML = `
  <div class='result-container'>
    <h1>${sign}</h1>
    <ul>
      <li>
        <h3>Challenging Days: </h3>
        <p>${challengingDays}</p>
      </li>
      <li>
        <h3>Standout Days: </h3>
        <p>${standoutDays}</p>
      </li>
      <li>
        <h3>Horoscope: </h3>
        <p>${horoscope}</p>
      </li>
    </ul>
    </div
  
  `;

  resultSection.insertAdjacentHTML("beforeend", sectionHTML);
};
