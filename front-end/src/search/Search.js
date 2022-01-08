import React, { useState } from "react";
import ReservationRow from "../dashboard/ReservationRow";
import ErrorAlert from "../layout/ErrorAlert";
import { listReservations } from "../utils/api";

export default function Search() {
    const [mobileNumber, setMobileNumber] = useState("");
    const [reservations, setReservations] = useState([])
    const [error, setError] = useState(null);
    const handleChange = ({target}) => {
        setMobileNumber(target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const abortController = new AbortController();
    
        setError(null);
    
        // our search query is mobile_number (the name of the column in the reservations table)
        // the search value is our mobileNumber state
        listReservations({ mobile_number: mobileNumber }, abortController.signal)
            .then(setReservations)
            .catch(setError);
    
        return () => abortController.abort();
    }

    const renderedSearchResult = () => {
        return reservations.length > 0 ?
		// you will see that i used the same ReservationRow component that we used in the Dashboard. yay less work!
		reservations.map((reservation) => 
			<ReservationRow key={reservation.reservation_id} reservation={reservation} />) :
			<tr><td>No reservations found</td></tr>;
    }
    return (
		<div>
			<form>
				<ErrorAlert error={error} />

				<label htmlFor="mobile_number">Enter a customer's phone number:</label>
				<input 
					name="mobile_number"
					id="mobile_number"
					type="tel"
					onChange={handleChange}
					value={mobileNumber}
					required
				/>

				<button type="submit" onClick={handleSubmit}>Find</button>
			</form>
            <table className="table">
			<thead className="thead-light">
				<tr>
					<th scope="col">ID</th>
					<th scope="col">First Name</th>
					<th scope="col">Last Name</th>
					<th scope="col">Mobile Number</th>
					<th scope="col">Time</th>
					<th scope="col">People</th>
					<th scope="col">Status</th>
					<th scope="col">Seat</th>
				</tr>
			</thead>
				
			<tbody>
				{renderedSearchResult()}
			</tbody>
		</table>
		</div>
	);
}