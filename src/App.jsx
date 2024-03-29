import React, { useState, useEffect } from 'react'
import ReactGA from 'react-ga'
import { createBrowserHistory } from 'history'
import { Router } from 'react-router-dom'

import { Typography } from '@material-ui/core'
import { Cards, Chart, CountryPicker } from './components'
import styles from './App.module.css'
import { fetchData } from './api'

import coronaImage from './images/image.png'

const App = () => {
  const [covidData, setCovidData] = useState({})
  const [country, setCountry] = useState('')

  useEffect(() => {
    ReactGA.initialize(process.env.REACT_APP_GAID)

    ReactGA.set({ page: window.location.pathname + window.location.search })
    ReactGA.pageview(window.location.pathname + window.location.search)
  }, [])

  useEffect(() => {
    const fetchAPI = async () => {
      setCovidData(await fetchData())
    }

    fetchAPI()
  }, [])

  const handleCountryChange = async newCountry => {
    const countryData = await fetchData(newCountry)
    setCovidData(countryData)
    setCountry(newCountry)
  }

  return (
    <div className={styles.container}>
      <img src={coronaImage} className={styles.image} alt="COVID-19" />
      <Typography variant="h6" component="h6">
        Made by{' '}
        <a href="https://www.linkedin.com/in/dantecnp/" target="_blank" rel="noopener noreferrer">
          Dante Nuñez
        </a>
      </Typography>
      <Cards covidData={covidData} />
      <CountryPicker handleCountryChange={handleCountryChange} />
      <Chart covidData={covidData} country={country} />
    </div>
  )
}

export default App
