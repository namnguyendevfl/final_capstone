import React from "react";
import { useHistory } from "react-router-dom";
import { previous, today, next } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationRow from "./reservationRow";
import TableRow from "./tableRow";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date, reservations, reservationsError, tables, tablesError, loadDashboard }) {
  const history = useHistory()

  const renderedReservations = () => {
    return reservations.map(reservation => 
      <ReservationRow key={reservation.reservation_id} reservation={reservation} />)
  }

  const renderedTables = () => {
    return tables.map((table) => 
		<TableRow key={table.table_id} table={table} />);
  }
  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Mobile Number</th>
            <th scope="col">Data</th>
            <th scope="col">Time</th>
            <th scope="col">People</th>
            <th scope="col">Status</th>
            <th scope="col">Edit</th>
            <th scope="col">Cancel</th>
            <th scope="col">Seat</th>
          </tr>
        </thead>
        <tbody>{renderedReservations()}</tbody>
      </table>
      <ErrorAlert error = {tablesError} />
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">Table ID</th>
            <th scope="col">Table Name</th>
            <th scope="col">Capacity</th>
            <th scope="col">Status</th>
            <th scope="col">Reservation ID</th>
            <th scope="col">Finish</th>
          </tr>
        </thead>
        <tbody>{renderedTables()}</tbody>
      </table>
      <div>
        <button onClick={() => history.push(`/dashboard?date=${previous(date)}`)}>Previous</button>
        <button onClick={() => history.push(`/dashboard?date=${today()}`)}>Today</button>
        <button onClick={() => history.push(`/dashboard?date=${next(date)}`)}>Next</button>
      </div>
      {/* {JSON.stringify(reservations)} */}
    </main>
  );
}

export default Dashboard;
