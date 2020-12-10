/* Function to GET Project Data */
const getProjectData = async () => {
  const response = await fetch("/all");
  try {
    return response.json();
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to GET Web API Data */
const getTemperature = async (baseURL, zipCode, apiKey) => {
  const response = await fetch(baseURL + zipCode + apiKey);
  try {
    const data = response.json();
    return data;
  } catch (error) {
    console.log("error: ", error.message);
  }
};

/* Function to POST data */
const addEntry = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    return response;
  } catch (error) {
    console.log("error", error);
  }
};

// Getting last data entry and udpate UI
const updateUI = async () => {
  const data = await getProjectData();
  try {
    let date, temp, userInput;

    for (const key in data) {
      date = data[key].date;
      temp = data[key].temperature;
      userInput = data[key].userResponse;
    }
    document.querySelector("#date").innerHTML = date;
    document.querySelector("#temp").innerHTML = temp;
    document.querySelector("#content").innerHTML = userInput;
  } catch (error) {
    console.log("error", error);
  }
};

const generateData = () => {
  const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
  const zipCode = document.querySelector("#zip").value;
  // Personal API Key for OpenWeatherMap API
  const WEATHER_API_KEY =
    "&appid=7a0d50ccb5d07e3e0970d2b6e1741285&units=imperial";
  getTemperature(baseURL, zipCode, WEATHER_API_KEY).then(function (data) {
    let date = new Date();

    let newDate =
      date.getMonth() + 1 + "." + date.getDate() + "." + date.getFullYear();

    const userResponse = document.querySelector("#feelings").value;

    addEntry("/add", {
      temperature: data.main.temp,
      date: newDate,
      userResponse,
    }).then(function (data) {
      updateUI();
    });
  });
};

document.querySelector("#generate").addEventListener("click", generateData);
