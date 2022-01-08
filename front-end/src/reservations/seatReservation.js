import React, { useState } from "react";
import { useHistory, useParams } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";

export default function SeatReservation({reservations, tables}) {
    const history = useHistory();
	const [table_id, setTableId] = useState(0);
    const [errors, setErrors] = useState([]);
	const { reservation_id } = useParams();

    if (!tables || ! reservations) return null
    
    const handleChange = ({target: {value}}) => {
        setTableId(value)
    }

    const handleSubmit =  (e) => {
        e.prevemtDefault();
        if(validateSeat()) {
			history.push(`/dashboard`);
		}
    }

    const validateSeat = () => {
        const foundErrors = [];

		const foundTable = tables.find((table) => table.table_id === Number(table_id));
		const foundReservation = reservations.find((reservation) => reservation.reservation_id === Number(reservation_id));

		if(!foundTable) {
			foundErrors.push("The table you selected does not exist.");
		}
		else if(!foundReservation) {
			foundErrors.push("This reservation does not exist.")
		}
		else {
			if(foundTable.status === "occupied") {
				foundErrors.push("The table you selected is currently occupied.")
			}

			if(foundTable.capacity < foundReservation.people) {
				foundErrors.push(`The table you selected cannot seat ${foundReservation.people} people.`)
			}
		}

		setErrors(foundErrors);

		return foundErrors.length === 0;
	}
    
    const renderedTableOptions = () => {
        return tables.map(table => 
            <option key = {table.table_id} value = {table.table_id}>{table.table_name} - {table.capacity}</option>
            )
    }

    const renderedError = () => {
		return errors.map((error, idx) => <ErrorAlert key={idx} error={error} />);

    }
    return (
        <form onSubmit={handleSubmit}>
            {renderedError()}
            <label htmlFor="table_id">Choose table</label>
            <select 
                name = "table_id"
                id = "table_id"
                value = {table_id}
                onChange = {handleChange}
            > 
            {renderedTableOptions()}
            </select>
            <button type = "submit"> Submit</button>
            <button type = "button"> Cancel</button>
        </form>
    )
}