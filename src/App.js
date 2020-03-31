import React from 'react';
import './App.css';
import {
    CircleMarker,
    Map,
    TileLayer,
    Tooltip
} from 'react-leaflet'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import data from './satx-covid-19';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const center = [29.419414, -98.495404];

function generateCircles(dataSet, color, text, radius) {
    let subData = dataSet;
    return subData.map(val => (
        <CircleMarker center={[parseFloat(val.geo[0]), parseFloat(val.geo[1])]} fillColor={color} color={color} radius={radius}>
            <Tooltip direction="right" offset={[-8, -2]} opacity={1}>
                <span>{val.zipcode + ": " + text}</span>
            </Tooltip>
        </CircleMarker>)
    );
}

function App() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                       Coronavirus COVID-19 - San Antonio, TX
                    </Typography>
                    <Typography variant="caption">
                        Last Updated: 3/29/2020 7:00pm
                    </Typography>
                </Toolbar>
            </AppBar>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <h1>The City of San Antonio has an official dashboard. </h1>
                        <h1> <Link href="https://www.sanantonio.gov/covid19">
                            https://www.sanantonio.gov/covid19
                        </Link></h1>
                        <h1>Stay Safe!</h1>
                    </Paper>

                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Map center={center} zoom={10}>
                            <TileLayer
                                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {generateCircles(data.zipCodeCases.cases_one_to_four, "blue", "1 to 4 Cases", 10)}
                            {generateCircles(data.zipCodeCases.cases_five_to_eight, "orange", "5 to 8 Cases", 20)}
                            {generateCircles(data.zipCodeCases.cases_nine_to_twelve, "red", "9 to 12 Cases", 30)}
                        </Map>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                            Confirmed Cases
                        </Typography>
                        <Typography component="p" variant="h4">
                            157
                        </Typography>
                        <p>Male: 85</p>
                        <p>Female: 72</p>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                            Total Deaths
                        </Typography>
                        <Typography component="p" variant="h4">
                            5
                        </Typography>
                        <p>Male: 0</p>
                        <p>Female: 5</p>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <p>Last Updated: 3/29/2020 7:00pm</p>
                        <p>This website is not associated in any way to the City of San Antonio. The data used on this site comes from
                        <Link href="https://www.sanantonio.gov/health/news/alerts/coronavirus">
                            &nbsp;here.
                        </Link></p>
                        <p>Open-Source code located <Link href="https://github.com/derek-diaz/COVID-19_SATX">here.</Link></p>
                    </Paper>

                </Grid>
            </Grid>
        </div>
    );
}

export default App;
