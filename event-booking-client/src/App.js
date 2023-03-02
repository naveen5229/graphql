import './App.css';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';

import AuthPage from './pages/auth/auth';
import EventPage from './pages/event/events';
import BookingPage from './pages/booking/bookings';
import MainNavigation from './components/navigation/navigation';
import React, { Component } from 'react';
import authContext from './context/auth.context';

class App extends Component {
  state = {
    token: null,
    userId: null
  }

  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  }

  logout = () => {
    this.setState({token:null, userId:null});
  }

  render() {
    return <BrowserRouter>
      <React.Fragment>
        <authContext.Provider value={{ token: this.state.token, userId: this.state.userId, login: this.login, logout: this.logout }}>
          <MainNavigation />
          <main className="main_body">
            <Routes>
              {!this.state.token && <Route path="/" element={<Navigate replace to="/auth" />} />}
              {!this.state.token && <Route path="/booking" element={<Navigate replace to="/auth" />} />}
              {this.state.token && <Route path="/" element={<Navigate replace to="/event" />} />}
              {this.state.token && <Route path="/auth" element={<Navigate replace to="/event" />} />}
              {!this.state.token && <Route path="/auth" element={<AuthPage />} />}
              <Route path="/event" element={<EventPage />} />
              {this.state.token && <Route path="/booking" element={<BookingPage />} />}
            </Routes>
          </main>
        </authContext.Provider>
      </React.Fragment>
    </BrowserRouter>
  }
}

export default App;
