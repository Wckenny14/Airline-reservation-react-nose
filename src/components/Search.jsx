import React, { Component, useState } from 'react';
import axios from 'axios';

const SERVER_URL = 'http://localhost:3000/'; // Later: change this heroku or wherever you host your server

class Search extends Component {
    constructor() {
        super();
        this.state = {
            flights: [],
        };
    }
    // React life cycle method:
    componentDidMount() {
        const fetchFlights = () => {
            axios(SERVER_URL + 'flights.json').then((response) => {
                this.setState({flights: response.data}); // set the data from the API as our state
                setTimeout(fetchFlights, 5000); // recursion for polling. Setting timer to call itself again in 7 seconds
            });
        };
        fetchFlights();
    }

    render() {
        return (
            <div>
                <FlightForm flights={ this.state.flights }/>
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
                        <th>Origin</th>
                        <th>Destination</th>
                        <th>Date</th>
                        <th>Flight No.</th>
                        <th colSpan="6"></th>
                    </tr>
                </thead>
                <tbody>
                    { props.flights.map((f) => {
                        return (
                            <tr key={ f.id }>
                                <td>{ f.origin }</td>
                                <td>{ f.destination }</td>
                                <td>{ f.date }</td>
                                <button>{f.flight_number}</button>
                            </tr>
                        );
                    })};
                </tbody>
            </table>
        </div>
    )
}

export default Search;