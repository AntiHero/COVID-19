import React, { useEffect, useState } from 'react';
import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.scss';
import { fetchData } from './api';
import CovidContext from './context';

function App() {
  const [data, setData] = useState({})

  useEffect(() => {
    async function getData() {
      const response = await fetchData();
      setData(response);
    }

    getData();
  }, [])

  return (
    <CovidContext.Provider value={data}>
      <div className={styles.container}>
        <Cards />
        <CountryPicker />
        <Chart />
      </div>
    </CovidContext.Provider>
  );
}

export default App;
