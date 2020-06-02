import React, { useEffect, useState} from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar, Polar } from 'react-chartjs-2';
import { Backdrop, CircularProgress } from "@material-ui/core";

import styles from './Chart.module.scss';

const Chart = () => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    async function getDailyData() {
      const response = await fetchDailyData();
      setDailyData(response);
    }

    getDailyData();
  }, []);

  if (dailyData.length === 0) {
    return (
    <Backdrop open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
    )
  }

  const lineChart = (
    <Line
      data={{
        labels: dailyData.map(({ reportDate }) => reportDate), 
        datasets: [
        {
          data: dailyData.map(({deaths}) => deaths.total),
          label: 'Deaths',
          borderColor: '#ff5050',
          backgroundColor: 'rgba(255, 0, 0, .2)',
          fill: true
        },
        {
          data: dailyData.map(({confirmed}) => confirmed.total),
          label: 'Infected',
          borderColor: '#57c1ff',
          backgroundColor: 'rgba(87, 193, 255, .2)',
          fill: true
        }
      ]}}
      options={{
        chartArea: {
          backgroundColor: 'rgba(87, 193, 255, .2)',
        }
      }}
    />
  )

  return (
    <div className={styles.container}>
      {
        //lineChart
      }
    </div>
  )
}

export default Chart;