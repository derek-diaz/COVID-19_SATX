import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
    Circle,
    CircleMarker,
    Map,
    Polygon,
    Polyline,
    Popup,
    Rectangle,
    TileLayer,
    Tooltip
} from 'react-leaflet'

import data from './satx-covid-19';

const center = [29.419414, -98.495404]

const polyline = [
    [51.505, -0.09],
    [51.51, -0.1],
    [51.51, -0.12],
]

const multiPolyline = [
    [
        [51.5, -0.1],
        [51.5, -0.12],
        [51.52, -0.12],
    ],
    [
        [51.5, -0.05],
        [51.5, -0.06],
        [51.52, -0.06],
    ],
]

const polygon = [
    [51.515, -0.09],
    [51.52, -0.1],
    [51.52, -0.12],
]

const multiPolygon = [
    [
        [51.51, -0.12],
        [51.51, -0.13],
        [51.53, -0.13],
    ],
    [
        [51.51, -0.05],
        [51.51, -0.07],
        [51.53, -0.07],
    ],
]

const rectangle = [
    [51.49, -0.08],
    [51.5, -0.06],
]

function generateCircles(dataSet, color, text) {
    let subData = dataSet;
    return subData.map(val => (
        <CircleMarker center={[parseFloat(val.geo[0]), parseFloat(val.geo[1])]} fillColor={color} color={color} radius={10}>
            <Tooltip direction="right" offset={[-8, -2]} opacity={1}>
                <span>{val.zipcode + ": " + text}</span>
            </Tooltip>
        </CircleMarker>)
    );
}


function App() {


    return (
        <div className="App">
            <Map center={center} zoom={10}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Circle center={center} fillColor="blue" radius={200}/>
                <CircleMarker center={[51.51, -0.12]} color="red" radius={20}>
                    <Popup>Popup in CircleMarker</Popup>
                </CircleMarker>
                {generateCircles(data.zipCodeCases.cases_one_to_four, "blue", "1 to 4 Cases")}
                {generateCircles(data.zipCodeCases.cases_five_to_eight, "orange", "5 to 8 Cases")}
                {generateCircles(data.zipCodeCases.cases_nine_to_twelve, "red", "9 to 12 Cases")}
                <Polyline color="lime" positions={polyline}/>
                <Polyline color="lime" positions={multiPolyline}/>
                <Polygon color="purple" positions={polygon}/>
                <Polygon color="purple" positions={multiPolygon}/>
                <Rectangle bounds={rectangle} color="black"/>
            </Map>
        </div>
    );
}

export default App;
