export default function Home() {
    return <h1>Login page coming soon</h1>
}


// import React, { PureComponent as Component } from 'react';
// import axios from 'axios';
// import _ from 'lodash';
// // import _ from 'lodash';

// const SERVER_URL = 'http://localhost:3000/flights.json'; 


// class FlightDisplay extends Component {
//   constructor(props) {
//       super(props);
//       this.state = {
//           flights: [],
//           flight_id: ""
//       };
//       this._handleSeat = this._handleSeat.bind(this);
//   }

//   _handleSeat (e) {
//       e.preventDefault();
//       let flight_id = e.target.getAttribute("id");
//       console.log(flight_id);
//       this.setState({ flight_id });
//       this.props.passFlightId(flight_id);
//   } 

//   render() {
//     return (
//       <div>
//         <div className="FlightDisplay"><h2>Available Flights</h2>
//             <table style={{width: "100%"}}>
//                 <tbody>
//                   <tr>
//                     <td><h3 className="tableHeading">Origin</h3></td>
//                     <td><h3 className="tableHeading">Dest.</h3></td>
//                     <td><h3 className="tableHeading">Date</h3></td>
//                     <td><h3 className="tableHeading">Flight No.</h3></td>
//                   </tr>
//                   {this.props.flights.map((f) =>
//                     <tr>
//                       <td><p key={f.id}>{f.origin}</p></td>
//                       <td><p key={f.id}>{f.destination}</p></td>
//                       <td><p key={f.id}>{f.date}</p></td>
//                       <td><p key={f.id}>{f.flight_number}</p></td>
//                       <td>
//                         <form className="seatFetcher" id={f.id} onSubmit={ this._handleSeat }><input type="submit" value="View" /></form>
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//             </table>
//         </div>
//         {this.state.flight_id ? <SeatMap flight={this.props.flights[0]} /> : ""}
//       </div>
//     )
//   }
// }

// const SERVER_URL2 = 'http://localhost:3001/reservations.json'

// class SeatMap extends Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       seats: this.props.flight.seats,
//       selectedSeat: '', // "A1"
//       occupied: _.map(this.props.flight.reservations, 'seat_number'),
//       available: _.reject(this.props.flight.seats, (s) => _.map(this.props.flight.reservations, 'seat_number').includes(s.seat_number)),
//       success:'',
//       selected: false
//     }
//     this._handleChange = this._handleChange.bind(this);
//     this.saveSeat = this.saveSeat.bind(this);
//   }

//   _handleChange(e){
//     this.setState({ selectedSeat: e.currentTarget.id });
//     console.log( this.state.selectedSeat );
//     this.setState({ selected: !this.state.selected })
//   };

//   saveSeat(e){
//     e.preventDefault();
//     console.log('sending post');
//     this.setState({success: 'Your flight was successfully booked. Please check your email for confirmation.'});

//     axios.post(SERVER_URL2, {
//       seat_number: this.state.selectedSeat, // "A1"
//       user_id: 6,
//       flight_id: this.props.flight.id,
//     }).then(response => {
//       console.log(response)
//     })
//     .catch(error => {
//       console.log(error.response)
//     });
//   };

//     render() {
//       return(
//         <div>
//           <div>
//             <h2 className="bookingHeading">Booking Form</h2>
//             <form className="bookingForm" onSubmit={this.saveSeat}>
//               <label> Your email:
//                 <input type="email" required />
//               </label>
//               <label> Your money: $
//                 <input type="number" required />
//               </label>
//               <p><span>Selected Seat: {this.state.selectedSeat}</span></p>
//               <p className="successMsg">{this.state.success}</p>
//               <button>Book</button>
//             </form>

//           </div>

//           <div className="seatMap">

//             <div className="plane">
//               { this.state.seats.map((s) =>  {
//                 return (
//                   <div 
//                     onClick={ this.state.occupied.includes(s.seat_number) ? "" : this._handleChange } 
//                     id={ s.seat_number } 
//                     key={ s.id } 
//                     className={ this.state.occupied.includes(s.seat_number) || this.state.selectedSeat == s.seat_number || this.state.success ? "seat occupied" : "seat" }>
//                     <p>{ s.seat_number }</p>
//                   </div>
//                 )
//               })}
//             </div>
//           </div>
//         </div>
//       );
//     }

// }

// // 

// class FlightBooker extends Component {
//   constructor (props) {
//     super(props);
//     this.state = {
//       flights: [],
//       flight_id: '', 
//       origin: '',
//       destination: ''
//     };
//     this.fetchFlights = this.fetchFlights.bind(this);
//     this.passFlightId = this.passFlightId.bind(this);
//   }

//   fetchFlights (o,d) { 
//     console.log('preparing to fetch');

//     axios.get(SERVER_URL).then(function (results){
//       let flightsArr = [];
//       for (let i = 0; i<results.data.length;i++)
//         if (results.data[i].origin === o && results.data[i].destination === d)
//           flightsArr.push(results.data[i]);
//       this.setState({ flights:flightsArr });
//     }.bind(this));
//  }

//  passFlightId (flight_id) { 
//    this.setState ({ 
//      flight_id: flight_id
//    });
//  }

//   render() {
//     return (
//       <div>
//         <div className="search">
//           <FlightSearchForm onSubmit={this.fetchFlights}/>
//         </div>
//         <FlightDisplay flights={this.state.flights} passFlightId={this.passFlightId}/>
//       </div>
//     );

//   }
// }

// export default FlightBooker;