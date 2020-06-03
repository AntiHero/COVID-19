import axios from 'axios';

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
  let changeableUrl = url;

  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }

  try{
    const { data: { confirmed, recovered, deaths, lastUpdate} } = await axios.get(changeableUrl);

    const modifiedData = {
      confirmed,
      recovered,
      deaths,
      lastUpdate
    }
    return modifiedData;
  } catch (e) {
    throw new Error(e.message);
  }
}

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
}

export const fetchCountries = async () => {
  try {
    const { data } = await axios.get(`${url}/countries`);
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
}