import React, { Component } from "react";
import apiService from "../../service/apiService";
import BookingTable from "../../shared-components/table/bookingTable";

class BookingPage extends Component {

    state = {
        bookings: []
    }

    loadBookings = () => {
        const query = {
            query: `
        query{
            bookings {
                user{
                    _id
                    email
                }
                event{
                    _id
                    title
                }
                createdAt
                updatedAt
              }
        }
        `};

        apiService({ query: query }).then(res => {
            const bookingsRes = res.data.bookings;
            this.setState({ bookings: bookingsRes })
        });

    }

    componentDidMount() {
        this.loadBookings();
    }

    render() {
        return <React.Fragment>
            <BookingTable tableData={this.state.bookings}></BookingTable>
        </React.Fragment>
    }
}

export default BookingPage;