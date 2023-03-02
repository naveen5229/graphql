import React, { Component } from "react";
import './event.css';

import TableComponent from "../../shared-components/table/eventTable";
import AuthContext from "../../context/auth.context";
import ModalComponent from '../../models/add-event-form';
import apiService from "../../service/apiService";

import { Button } from 'react-bootstrap';
import authContext from "../../context/auth.context";

class EventPage extends Component {
    state = {
        events: [],
        modalState: false
    }

    static contextType = authContext;

    constructor(props) {
        super(props);
        this.titleElRef = React.createRef();
        this.priceElRef = React.createRef();
        this.dateElRef = React.createRef();
        this.descriptionElRef = React.createRef();
    }

    loadEvents = () => {
        const query = {
            query: `
        query{
            events {
                _id
                title
                description
                date
                price
                createdBy {
                    _id
                  email
                  eventList{
                    _id
                }
                }
              }
        }
        `};

        apiService({ query: query }).then(res => {
            const eventsRes = res.data.events;
            this.setState({ events: eventsRes })
        });
    };

    componentDidMount() {
        this.loadEvents();
    }

    createEvent = () => {
        const title = this.titleElRef.current.value;
        const price = +this.priceElRef.current.value;
        const date = this.dateElRef.current.value;
        const description = this.descriptionElRef.current.value;

        if (!title.trim() || !price || !date.trim() || !description.trim()) return;

        const query = {
            query: `
                    mutation{
                        createEvent(eventValues: {title:"${title}", description: "${description}", date:"${date}", price: ${price}})
                        {
                            _id
                            title
                            description
                            price
                            date
                            createdBy{
                                _id
                                email
                            }
                        }
                    }
            `
        }

        const token = this.context.token;

        apiService({ query: query, token: token }).then(res => {
            this.loadEvents();
            this.closeModal();
        })
    }

    cancelEvent = (id) => {
        const query = {
            query: `
                    mutation{
                        cancelEvent(eventId: "${id}")
                        {
                            _id
                            title
                            description
                            price
                            date
                        }
                    }
            `
        }

        const token = this.context.token;

        apiService({ query: query, token: token }).then(res => {
            this.loadEvents();
        })
    }

    bookEventHandler = (id) => {
        const query = {
            query: `
                    mutation{
                        bookEvent(eventId: "${id}")
                        {
                            _id
                            user{
                                email
                            }
                            createdAt
                        }
                    }
            `
        }

        const token = this.context.token;

        apiService({ query: query, token: token }).then(res => {
            this.loadEvents();
        })
    }

    openModal = (e) => {
        this.setState({
            ...this.state,
            modalState: true
        })
    }

    closeModal = (e) => {
        this.setState({
            ...this.state,
            modalState: false
        })
    }

    render() {
        return <AuthContext.Consumer>
            {(context) => {
                return <React.Fragment>
                    <ModalComponent modalTitle="Add Event" show={this.state.modalState} handleClose={this.closeModal} handleCreate={this.createEvent}>
                        <form>
                            <div>
                                <label htmlFor="title">Title</label>
                                <input className="form-control" type="text" id="title" ref={this.titleElRef}></input>
                            </div>
                            <div>
                                <label htmlFor="price">Price</label>
                                <input className="form-control" type="number" id="price" ref={this.priceElRef}></input>
                            </div>
                            <div>
                                <label htmlFor="date">Date</label>
                                <input className="form-control" type="date" id="date" ref={this.dateElRef}></input>
                            </div>
                            <div>
                                <label htmlFor="description">Description</label>
                                <textarea className="form-control" id="description" ref={this.descriptionElRef}></textarea>
                            </div>
                        </form>
                    </ModalComponent>

                    {context.userId && <div className="eventAddController">
                        <Button variant="primary" onClick={this.openModal}>Add Event</Button>
                    </div>}

                    <div className="table-header"><h3>ALL EVENTS</h3></div>
                    <div className="event-table">
                        <TableComponent tableData={this.state.events} userId={context.userId} cancelEvent={this.cancelEvent} bookEvent={this.bookEventHandler}></TableComponent>
                    </div>
                </React.Fragment>
            }}
        </AuthContext.Consumer>
    }
}

export default EventPage;