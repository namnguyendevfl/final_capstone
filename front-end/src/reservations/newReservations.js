import React, {useState} from "react";
import { useHistory } from "react-router";
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

    const [formData, setFormData] = useState(initialData)
    const handleChange = ({target: {name, value}}) => {
        setFormData((prevForm) => ({
            ...prevForm,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //Right now, we can get the final data when hitting submit button
        //We're gonna handle this data later on
        console.log(formData)
    }
    return (
        <>
        <form onSubmit={handleSubmit}>
            <div>
                <label  htmlFor = "first_name">First Name</label>
                <input  name = "first_name" 
                        id = "first_name" 
                        type = "text"
                        value = {formData.first_name}
                        onChange = {handleChange}
                        required
                />
            </div>
            <div>
                <label  htmlFor="last_name">Last Name:</label>
                <input  name="last_name" 
                        id = "last_name" 
                        type = "text"
                        value = {formData.last_name}
                        onChange = {handleChange}
                        required 
                />
            </div>
            <div>
                <label  htmlFor="mobile_number">Mobile Number:</label>
                <input  name="mobile_number" 
                        id = "mobile_number" 
                        type = "tel"
                        value = {formData.mobile_number}
                        onChange = {handleChange}
                        required 
                />
            </div>
            <div>
                <label htmlFor="reservation_date">Reservation Date:</label>
                <input  name="reservation_date" 
                        id = "reservation_date" 
                        type = "date"
                        value = {formData.reservation_date}
                        onChange = {handleChange}
                        required 
                />
            </div>
            <div>
                <label  htmlFor="reservation_time">Reservation Time:</label>
                <input  name="reservation_time" 
                        id = "reservation_time" 
                        type = "time"
                        value = {formData.reservation_time}
                        onChange = {handleChange}
                        required 
                />
            </div>
            <div>
                <label  htmlFor="people">Party Size:</label>
                <input  name="people" 
                        id = "people" 
                        type = "tel"
                        value = {formData.people}
                        onChange = {handleChange}
                        required 
                />
            </div>
            <div>
                <button type ="submit" onClick={history.goBack}>Submit</button>
                <button type ="button" onClick={history.goBack}>Cancel</button>
            </div>
        </form>
        </>
    )
}