import React from "react";
import { Table, Button } from 'react-bootstrap';


const TableComponent = (props) => {
    return <Table>
        <thead>
            <tr>
                <th align="start">Event</th>
                <th align="start">Description </th>
                <th align="start">Date</th>
                <th align="start">Price</th>
                <th align="start">Created By</th>
                {props.haveActions && <th align="start">Action</th>}
            </tr>
        </thead>
        {props.tableData && props.tableData.map((event, index) => {
            return <tbody key={index}>
            <tr>
                <td>
                    {event.title}
                </td>
                <td>
                    {event.description}
                </td>
                <td>
                    {new Date(event.date).toLocaleDateString()}
                </td>
                <td>
                    {event.price}
                </td>
                <td>
                    {props.userId === event.createdBy._id ? <label>You</label> : <label>{event.createdBy.email.split('@')[0]}</label>}
                </td>
                <td>
                {props.userId === event.createdBy._id ? <Button variant="danger" onClick={props.cancelEvent.bind(this, event._id)}>Cancel</Button> : <Button variant="primary" onClick={props.bookEvent.bind(this, event._id)}>Book</Button>}
                    
                </td>
            </tr>
        </tbody>
        })}
    </Table>
}

export default TableComponent;