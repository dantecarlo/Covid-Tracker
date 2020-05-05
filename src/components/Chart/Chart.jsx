import React, { useEffect, useState } from 'react'
import { Line, Bar } from 'react-chartjs-2'
import _ from 'lodash'

import { fetchDailyData } from '../../api'

import styles from './Chart.module.css'

const Chart = ({ covidData, country }) => {
  const { confirmed, recovered, deaths } = covidData
  const [dailyCovidData, setDailyCovidData] = useState({})

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyCovidData(await fetchDailyData())
    }

    fetchAPI()
  }, [])

  const lineChart = !_.isEmpty(dailyCovidData) ? (
    <Line
      data={{
        labels: dailyCovidData.map(({ date }) => date),
        datasets: [
          {
            data: dailyCovidData.map(data => data.confirmed),
            label: 'Infected',
            borderColor: '#3333ff',
            fill: true
          },
          {
            data: dailyCovidData.map(data => data.deaths),
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            fill: true
          }
        ]
      }}
    />
  ) : null

  const barChart = !_.isEmpty(covidData) ? (
    <Bar
      data={{
        labels: ['Infected', 'Recovered', 'Deaths'],
        datasets: [
          {
            label: 'People',
            backgroundColor: [
              'rgba(0, 0, 255, 0.5)',
              'rgba(0, 255, 0, 0.5)',
              'rgba(255, 0, 0, 0.5)'
            ],
            data: [confirmed.value, recovered.value, deaths.value]
          }
        ]
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}` }
      }}
    />
  ) : null

  return <div className={styles.container}>{country ? barChart : lineChart}</div>
}

export default Chart
