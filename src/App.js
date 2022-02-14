import React from "react"
import Signup from "./Patient_view/Signup";
import { Container } from 'react-bootstrap'
//import {BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./Patient_view/Login";
import Share from "./Patient_view/Share"
import AddPhysician from "./Patient_view/AddPhysician";
import DataVisualization from "./Physician_view/DataVisualization";
import KeyLogin from "./Physician_view/KeyLogin";
import Logs from "./Patient_view/Logs";
import MyAccount from "./Patient_view/MyAccount";
import { AuthProvider } from "./Patient_view/AuthContext";
import AddTracker from "./Patient_view/AddTracker";
import InvalidTokenError from './InvalidTokenError';
import MismatchError from './MismatchError'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import store from "./store"
// import configureStore from "./configureStore";
// import ErrorPage from "./Pages/ErrorPage";

// Provider: makes Redux store avaliable to any nested components
const App = () => {
  return (
  

     
      <AuthProvider>
        <Container className="d-flex algin-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <Router>
              <Routes>

                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<Login />} />
                <Route path="/dataVisualization" element={<DataVisualization />} />
                <Route path="/share" element={<Share />} />
                <Route path="/share/add-physician" element={<AddPhysician />} />
                <Route path="/keyLogin" element={<KeyLogin />} />
                <Route path="/logs" element={<Logs />} />
                <Route path="/account" element={<MyAccount />} />
                <Route path="/addtracker" element={<AddTracker />} />
                <Route path="/mismatcherror" element={<MismatchError />} />
                <Route path="/invaliderror" element={<invalidTokenError />} />


                {/* <Route path = "*" element = {<ErrorPage />}/> */}
              </Routes>
            </Router>

          </div>

        </Container>
      </AuthProvider>
    


  );

};

export default App
