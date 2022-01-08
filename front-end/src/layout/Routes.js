import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import NewReservations from "../reservations/newReservations";
import useQuery from "../utils/useQuery";
import NewTable from "../tables/newTable";
import { listReservations } from "../utils/api";
import SeatReservation from "../reservations/seatReservations";
import Search from "../search/search";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const query = useQuery();
  const date = query.get("date") ? query.get("date") : today();
	const [reservations, setReservations] = useState([]);
	const [reservationsError, setReservationsError] = useState(null);

	const [tables, setTables] = useState([]);
	const [tablesError, setTablesError] = useState(null);

	useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();

    setReservationsError(null);
    setTablesError(null);
    listReservations({ date: date }, abortController.signal)
        .then(setReservations)
        .catch(setReservationsError);

    // listTables(abortController.signal)
    //   .then((tables) => tables.sort((tableA, tableB) => tableA.table_id - tableB.table_id))
    //   .then(setTables)
    //   .catch(setTablesError);
  
      return () => abortController.abort();
  }
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path ="/reservations/new">
        <NewReservations />
      </Route>
      <Route path ="/reservations/:reservation_id/seat" >
        <SeatReservation />
      </Route>
      <Route path ="/tables/new">
        <NewTable />
      </Route>
      <Route path ="/search">
        <Search />
      </Route>
      <Route path="/dashboard">
        <Dashboard 
            date={date}
            reservations={reservations}
            reservationsError={reservationsError}
            tables={tables}
            tablesError={tablesError}
            setTables = {setTables}
            loadDashboard={loadDashboard}
          />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
