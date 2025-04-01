const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": window.RAPIDAPI_KEY,
    "x-rapidapi-host": window.RAPIDAPI_HOST,
  },
};

const fetchData = async (sign) => {
  console.log("Fetching data for sign:", sign);
  console.log("Using API Key:", window.RAPIDAPI_KEY);
  console.log("Using API Host:", window.RAPIDAPI_HOST);
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
