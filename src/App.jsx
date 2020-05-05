import React, { useState, useEffect } from 'react'

import { Cards, Chart, CountryPicker } from './components'
import styles from './App.module.css'
import { fetchData } from './api'

import coronaImage from './images/image.png'

const App = () => {
  const [covidData, setCovidData] = useState({})
  const [country, setCountry] = useState('')

  useEffect(() => {
    const fetchAPI = async () => {
      setCovidData(await fetchData())
    }

    fetchAPI()
  }, [])

  const handleCountryChange = async country => {
    const countryData = await fetchData(country)
    setCovidData(countryData)
    setCountry(country)
  }

  return (
    <div className={styles.container}>
      <img src={coronaImage} className={styles.image} alt="COVID-19" />
      <Cards covidData={covidData} />
      <CountryPicker handleCountryChange={handleCountryChange} />
      <Chart covidData={covidData} country={country} />
    </div>
  )
}

export default App
