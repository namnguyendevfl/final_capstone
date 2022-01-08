import React from "react"

export default function ReservationRow({reservation}) {
    if (!reservation || reservation.status === "finished") return null;
    return (
        <>
            <tr>
                <th scope="row">
                    <td>{reservation.first_name}</td>
                    <td>{reservation.last_name}</td>
                    <td>{reservation.mobile_number}</td>
                    <td>{reservation.reservation_time}</td>
                    <td>{reservation.people}</td>
                    <td>{reservation.status}</td>
                    {reservation.status === "booked" &&
                        <td>
                            <a href={`/reservations/${reservation.reservation_id}/seat`}>
                                <button type="button">Seat</button>
                            </a>
                        </td>
                    }
                </th>
            </tr>
        </>
    )
}