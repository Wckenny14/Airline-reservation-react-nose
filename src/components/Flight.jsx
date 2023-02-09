import React, { Component, useState } from 'react';
import axios from 'axios';

const FLIGHTS_URL = 'http://localhost:3000/flights.json'; // Later: change this heroku or wherever you host your server

class Flights extends Component {
    constructor() {
        super();
        this.state = {
            flights: []
        };
        this.saveFlight = this.saveFlight.bind(this);

        // get Flights via AJAX - you could get it here but not recommended
    }
    // React life cycle method:
    componentDidMount() {
        const fetchFlights = () => {
            axios.get(FLIGHTS_URL).then((response) => {
                this.setState({flights: response.data}); // set the data from the API as our state
                setTimeout(fetchFlights, 7000); // recursion for polling.
            });
        };
        fetchFlights(); 
    }

    saveFlight(origin, destination, date, flight_number) {
        axios.post(FLIGHTS_URL, { origin: origin, destination: destination, date: date, flight_number: flight_number }).then((response) => {
            console.log(response)
            this.setState({flights: [response.data, ...this.state.flights]});
        });
    }

    render() {
        return (
            <div>
                <h1>Add a new flight</h1>
                <FlightForm onSubmit={ this.saveFlight }/>
                <FlightList flights={ this.state.flights }/>
            </div>
        );
    }
}

const FlightList = (props) => {
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
                        {/* <th>Available Seats</th> */}
                        
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

const FlightForm = (props) => {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState('');
    const [flight_number, setFlight_Number] = useState('');
    
    const _handleSubmit = (e) => {
        e.preventDefault();
        props.onSubmit(origin, destination, date, flight_number);
        setOrigin('')
        setDestination('')
        setDate('')
        setFlight_Number('')
    }   
    
    return (
        <form onSubmit={ _handleSubmit }>
            <label>
                Origin:
                <input type="text" name="origin" onInput={ (e) => setOrigin(e.target.value) } required/>
            </label>
            <label>
                Destination:
                <input type="text" name="destination" onInput={ (e) => setDestination(e.target.value) } />
            </label>
            <label>
                Date:
                <input type="date" name="date" onInput={ (e) => setDate(e.target.value) } />
            </label>
            <label>
                Flight Number:
                <input type="text" name="flight number" onInput={ (e) => setFlight_Number(e.target.value) } />
            </label>
            <input type="submit" value="Add" />
        </form>
    );
};


export default Flights;