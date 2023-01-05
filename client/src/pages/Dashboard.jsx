import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import Header from '../components/Header'
import PlaceToVisit from '../components/PlaceToVisit'
import axios from 'axios'
import { useState, useEffect } from 'react'
// import PlaceToVisit from './PlaceToVisit'
const useStyles = makeStyles((theme) => ({
  root: {
    height: '80vh',
    backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/leaved.jpeg'})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPositio:'center',
  },
  title: {
    color: '#fff',
    fontSize: '4.5rem',
  },
  link: {
    color: '#fff',
    fontSize: '2.5rem',
    fontFamily: 'Nunito',
    marginLeft: '20%',
    textDecoration: 'none',
  },
}))
const Dashboard = () => {
  const [three, setThree] = useState([])
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    axios.get('http://localhost:8000/api/post/three').then((res) => {
      setThree(res.data)
      setLoaded(true)
    })
  }, [])
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      <div>
        <h2 className={classes.link}>
          Dive into our community ! thats why weMet!
        </h2>
      </div>
      {loaded && <PlaceToVisit three={three} />}
    </div>
  )
}

export default Dashboard
