import React from "react";
import { NavLink } from 'react-router-dom';
import './navigation.css';

import authContext from "../../context/auth.context";

const MainNavigation = (props) => {
    return <authContext.Consumer>
        {(context) => {
            return <header className="main-navigation">
            <div className="header_icon">
                <h2>GraphQL</h2>
            </div>
            <nav className="nav-controls">
                <ul>
                    {!context.token && <li><NavLink to="/auth">Auth</NavLink></li>}
                    <li><NavLink to="/event">Event</NavLink></li>
                    {context.token && <li><NavLink to="/booking">Booking</NavLink></li>}
                    {context.token && <li><button onClick={context.logout}>Logout</button></li>}
                </ul>
            </nav>
        </header>
        }}
    </authContext.Consumer>
}

export default MainNavigation;