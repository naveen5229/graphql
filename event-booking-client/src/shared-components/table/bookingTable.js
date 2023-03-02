import React from "react";
import { Table } from 'react-bootstrap';


const BookingTable = (props) => {
    return <Table>
        <thead>
            <tr>
                <th align="start">Event</th>
                <th align="start">Date Created</th>
                <th align="start">Booked by</th>
                {props.haveActions && <th align="start">Action</th>}
            </tr>
        </thead>
        {props.tableData && props.tableData.map((booking, index) => {
            return <tbody key={index}>
            <tr>
                <td>
                    {booking.event.title}
                </td>
                <td>
                    {booking.createdAt}
                </td>
                <td>
                    {booking.user.email.split('@')[0]}
                </td>
            </tr>
        </tbody>
        })}
    </Table>
}

export default BookingTable;