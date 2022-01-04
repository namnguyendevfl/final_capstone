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

    const validateDate = () => {
        const reserveDate = new Date(formData.reservation_date)
        const todaysDate = new Date();
        const foundErrors = []
        if (reserveDate.getDay() === 1){ /// Tuesday equals to 1
            foundErrors.push({
                message: "Reservations cannot be made on a Tuesday (Restaurant is closed)."
            })
        }
        if (reserveDate<todaysDate){
            foundErrors.push({ message: "Reservations cannot be made in the past." });
        }
        setErrors(foundErrors)
        if(foundErrors.length > 0) {
            return false;
        } else return true
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateDate()) {
            history.push(`/dashboard?date=${formData.reservation_date}`);
        }
        // const errorsList = []
        // for (let [key,value] of Object.entries(formData)) {
        //     if (value === ""){
        //         errorsList.push({ message : `${key.split("_").join(" ")} cant be blank` })
        //     }
        // }
        // setErrors(() => errorsList)
        //Right now, we can get the final data when hitting submit button
        //We're gonna make API calls later on
        //We're also able to get Errors when the form fields are blank
        // console.log(formData)
        // console.log(errors)
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