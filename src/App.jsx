import React, { useState, useEffect } from 'react'
import ReactGA from 'react-ga'
import { createBrowserHistory } from 'history'
import { Router } from 'react-router-dom'

import { Cards, Chart, CountryPicker } from './components'
import styles from './App.module.css'
import { fetchData } from './api'

import coronaImage from './images/image.png'

ReactGA.initialize(process.env.REACT_APP_GAID)

const history = createBrowserHistory()

history.listen(location => {
  ReactGA.set({ page: location.pathname })
  ReactGA.pageview(location.pathname)
})

const App = () => {
  const [covidData, setCovidData] = useState({})
  const [country, setCountry] = useState('')

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
    <Router history={history}>
      <div className={styles.container}>
        <img src={coronaImage} className={styles.image} alt="COVID-19" />
        <Cards covidData={covidData} />
        <CountryPicker handleCountryChange={handleCountryChange} />
        <Chart covidData={covidData} country={country} />
      </div>
    </Router>
  )
}

export default App
