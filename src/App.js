import React, { useEffect, useState } from "react";
import { Pictorial, Chart, CountryPicker, InfoModal } from "./components";
import styles from "./App.module.scss";
import { fetchData } from "./api";
import CovidContext from "./context";
import "./styles/global.scss";
import FavoriteIcon from '@material-ui/icons/Favorite';

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    async function getData() {
      const response = await fetchData();
      setData(response);
    }

    getData();
  }, []);

  const handleCountryChange = async (country) => {
    const response = await fetchData(country);
    setData(response);
  };

  return (
    <CovidContext.Provider value={data}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>covid-19</h1>
        </header>
        <div className={styles.infoWrapper}>
          <q className={styles.info}>
            Coronavirus disease 2019 (COVID-19) is an infectious disease caused
            by severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2).
          </q>
        </div>
        <CountryPicker handleCountryChange={handleCountryChange} />
        <Pictorial />
        <Chart />
        <InfoModal />
        <footer className={styles.footer}>© ZEROHELP STUDIO 2020. DESIGNED WITH <FavoriteIcon style={{color: '#f23224'}}/> BY A.SCHEMELEV</footer>
      </div>
    </CovidContext.Provider>
  );
}

export default App;
