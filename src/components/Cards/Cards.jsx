import React from 'react'
import _ from 'lodash'
import cx from 'classnames'

import { Card, CardContent, Typography, Grid } from '@material-ui/core'

import CountUp from 'react-countup'
import styles from './Cards.module.css'

const Cards = ({ covidData }) => {
  if (_.isEmpty(covidData)) {
    return 'Loading...'
  }

  const { lastUpdate } = covidData
  const displayData = ['confirmed', 'recovered', 'deaths']

  return (
    <div className={styles.container}>
      <Grid container spaciong={3} justify="center">
        {displayData.map(itemData => {
          return (
            <Grid
              item
              xs={12}
              md={3}
              component={Card}
              className={cx(styles.card, styles[itemData])}
              key={itemData}
            >
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {itemData[0].toUpperCase() + itemData.slice(1)}
                </Typography>
                <Typography variant="h5" component="h2">
                  <CountUp
                    start={0}
                    end={covidData[itemData].value}
                    duration={2.75}
                    separator=","
                  />
                </Typography>
                <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                <Typography variant="body2" component="p">
                  Number of {itemData} cases of COVID-19.
                </Typography>
              </CardContent>
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}

export default Cards
