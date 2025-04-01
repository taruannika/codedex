import { CONFIG } from "./config.js";

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": CONFIG.RAPIDAPI_KEY,
    "x-rapidapi-host": CONFIG.RAPIDAPI_HOST,
  },
};

const fetchData = async (sign) => {
  try {
    const response = await fetch(
      `https://horoscope19.p.rapidapi.com/get-horoscope/monthly?sign=${sign}`,
      options
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data; // Return the resolved data
  } catch (error) {
    console.error("Error fetching data:", error);
    return null; // Return null in case of an error
  }
};

export default fetchData;
