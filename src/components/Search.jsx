import React, { Component, useState } from 'react';
import axios from 'axios';

const SERVER_URL = 'http://localhost:3000/'; // Later: change this heroku or wherever you host your server

class Search extends Component {
    constructor() {
        super();
        this.state = {
            flights: [],
            airplanes: []
        };
        // this.saveFlight = this.saveFlight.bind(this);
        // this.saveAirplane = this.saveAirplane.bind(this);
    }
    // React life cycle method:
    componentDidMount() {
        const fetchFlights = () => {
            axios(SERVER_URL + 'flights.json').then((response) => {
                this.setState({flights: response.data}); // set the data from the API as our state
                // console.log(response) // tells us where to retrieve data
                setTimeout(fetchFlights, 5000); // recursion for polling. Setting timer to call itself again in 7 seconds
                // console.log(fetchFlights)
            });
        };
        const fetchAirplanes = () => {
            axios(SERVER_URL + 'airplanes.json').then((response) => {
                this.setState({airplanes: response.data}); // set the data from the API as our state
                console.log(response) // tells us where to retrieve data
                setTimeout(fetchAirplanes, 5000); // recursion for polling. Setting timer to call itself again in 7 seconds
            });
        }
        fetchFlights();
        fetchAirplanes();
    }

    // saveFlight(flightInfo) {
    //     axios.post(SERVER_URL, { flightInfo: flightInfo }).then((response) => {
    //         this.setState({flights: [response.data, ...this.state.flights]});
    //     });
    // }

    // saveAirplane(airplaneInfo) {
    //     axios.post(SERVER_URL, { airplaneInfo: airplaneInfo }).then((response) => {
    //         this.setState({airplanes: [response.data, ...this.state.flights]});
    //     });
    // }

    render() {
        return (
            <div>
                <FlightForm flights={ this.state.flights }/>
                <AirplaneForm airplanes={ this.state.airplanes }/>
            </div>
        );
    }
}

const FlightForm = (props) => {
    return (
        <div id="flightTable">
            <h2>{ props.flights.length } Flights Available</h2>
            <table style={{width: "100%"}}>
                <thead>
                    <tr>
                        <th>Flight No.</th>
                        <th>Origin</th>
                        <th>Destination</th>
                        <th>Date</th>
                        {/* <th>Airplane</th> */}
                        {/* <th>Available Seats</th> */}
                        <th colSpan="6"></th>
                    </tr>
                </thead>
                <tbody>
                    { props.flights.map((f) => {
                        return (
                            <tr key={ f.id }>
                                <td>{ f.flight_number }</td>
                                <td>{ f.origin }</td>
                                <td>{ f.destination }</td>
                                <td>{ f.date }</td>
                                {/* <td>{ f.airplane_id.plane_name }</td> */}
                            </tr>
                        );
                    })};
                </tbody>
            </table>
        </div>
    )
}
const AirplaneForm = (props) => {
    return (
        <div>
            {/* <h2>{ props.airplanes.length } Airplanes</h2> */}
        </div>
    )
}

export default Search;