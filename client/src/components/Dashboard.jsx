import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, IconButton } from '@material-ui/core';
import Header from './Header';
import PlaceToVisit from './PlaceToVisit';


const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '80vh',
        backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/leaved.jpeg'})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
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

}));
const Dashboard = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CssBaseline />
            <Header />
            <div >
                <h2 className={classes.link}>Dive into our community ! thats why weMet!</h2>
            </div>
            <PlaceToVisit />

        </div>
    )
}

export default Dashboard