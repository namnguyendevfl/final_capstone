import React, {useState} from "react";
import { useHistory } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";

export default function NewReservations() {
    const history = useHistory()
    const initialData = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 0,
    }
    const [errors, setErrors] = useState([])
    const [formData, setFormData] = useState(initialData)
    const handleChange = ({target: {name, value}}) => {
        setFormData((prevForm) => ({
            ...prevForm,
            [name]: value
        }))
    }
    const validateDate = (foundErrors) => {
        const reserveDate = new Date(`${formData.reservation_date}T${formData.reservation_time}:00.000`);
        const todaysDate = new Date();
        if (reserveDate.getDay() === 2){
            foundErrors.push({
                message: "Reservations cannot be made on a Tuesday (Restaurant is closed)."
            })
        }
        if (reserveDate<todaysDate){
            foundErrors.push({ message: "Reservations cannot be made in the past." });
        }

        if(reserveDate.getHours() < 10 || (reserveDate.getHours() === 10 && reserveDate.getMinutes() < 30)) {
            foundErrors.push({ message: "Reservation cannot be made: Restaurant is not open until 10:30AM." });
        } else if(reserveDate.getHours() > 22 || (reserveDate.getHours() === 22 && reserveDate.getMinutes() >= 30)) {
            foundErrors.push({ message: "Reservation cannot be made: Restaurant is closed after 10:30PM." });
        } else if(reserveDate.getHours() > 21 || (reserveDate.getHours() === 21 && reserveDate.getMinutes() > 30)) {
            foundErrors.push({ message: "Reservation cannot be made: Reservation must be made at least an hour before closing (10:30PM)." })
        }
        
        return foundErrors.length === 0;
    }

    function validateFields(foundErrors) {
        for(const field in formData) {
            if(formData[field] === "") {
                foundErrors.push({ message: `${field.split("_").join(" ")} cannot be left blank.`})
            }
        }
    
        if(formData.people <= 0) {
            foundErrors.push({ message: "Party must be a size of at least 1." })
        }
        return foundErrors.length === 0;
    }
    const handleSubmit = (e) => {
        e.preventDefault();
		const foundErrors = [];
		if(validateFields(foundErrors) && validateDate(foundErrors)) {
            // history.push(`/dashboard?date=${formData.reservation_date}`);
        }
        setErrors(foundErrors)
    }
    const renderedErrors = () => {
        return errors.map((error, idx) => <ErrorAlert key={idx} error={error} />);
    }
    return (
        <>
        {renderedErrors()}
        <form onSubmit={handleSubmit}>
            <div>
                <label  htmlFor = "first_name">First Name</label>
                <input  name = "first_name" 
                        id = "first_name" 
                        type = "text"
                        value = {formData.first_name}
                        onChange = {handleChange}
                        // required
                />
            </div>
            <div>
                <label  htmlFor="last_name">Last Name:</label>
                <input  name="last_name" 
                        id = "last_name" 
                        type = "text"
                        value = {formData.last_name}
                        onChange = {handleChange}
                        // required 
                />
            </div>
            <div>
                <label  htmlFor="mobile_number">Mobile Number:</label>
                <input  name="mobile_number" 
                        id = "mobile_number" 
                        type = "tel"
                        value = {formData.mobile_number}
                        onChange = {handleChange}
                        // required 
                />
            </div>
            <div>
                <label htmlFor="reservation_date">Reservation Date:</label>
                <input  name="reservation_date" 
                        id = "reservation_date" 
                        type = "date"
                        value = {formData.reservation_date}
                        onChange = {handleChange}
                        // required 
                />
            </div>
            <div>
                <label  htmlFor="reservation_time">Reservation Time:</label>
                <input  name="reservation_time" 
                        id = "reservation_time" 
                        type = "time"
                        value = {formData.reservation_time}
                        onChange = {handleChange}
                        // required 
                />
            </div>
            <div>
                <label  htmlFor="people">Party Size:</label>
                <input  name="people" 
                        id = "people" 
                        type = "tel"
                        value = {formData.people}
                        onChange = {handleChange}
                        // required 
                />
            </div>
            <div>
                <button type ="submit" >Submit</button>
                <button type ="button" onClick={history.goBack}>Cancel</button>
            </div>
        </form>
        </>
    )
}