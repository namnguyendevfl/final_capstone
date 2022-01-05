import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";

export function NewTable() {
    const history = useHistory();

    const initialTable = {
        table_name: "",
        capacity: ""
    }
    const [table, setTable] = useState(initialTable)
    const [error, setError] = useState(null)
    const handleChange = ({target:{value,name}}) => {
        setTable(prevTable => ({...prevTable, [name]: value}))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(validateFields()) {
			history.push(`/dashboard`);
		}
    }
    const validateFields = () => {
        let foundError = null;

		if(table.table_name === "" || table.capacity === "") {
			foundError = { message: "Please fill out all fields." };
		}
		else if(table.table_name.length < 2) {
			foundError = { message: "Table name must be at least 2 characters." };
		}

		setError(foundError);

		return foundError === null;
    }
    return (
        <>
        <form onSubmit={handleSubmit}>
            <ErrorAlert error = {error} />
            <div>
                <label htmlFor="table_name">Table Name</label>
                <input 
                    id = "table_name"
                    name = "table_name"
                    type = "text"
                    minLength="2"
                    value = {table.table_name}
                    onChange = {handleChange}
                    // required
                />
            </div>
            <div>
                <label htmlFor="capacity">Capacity</label>
                <input 
                    id = "capacity"
                    name = "capacity"
                    type = "number"
                    min = "1"
                    value = {table.capacity}
                    onChange = {handleChange}
                    // required
                />
            </div>
            <div>
                <button type ="submit">Submit</button>
                <button type ="button">Cancel</button>
            </div>
        </form>
        </>
    ) 
}