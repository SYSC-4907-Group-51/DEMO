// src/Login.js 
import React, { useRef, useState } from "react"
import { Form, Button, Card, Navbar } from 'react-bootstrap'
import Header from './Header';
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";


const MyAccount = (props) => {
    // const emailRef = useRef()
    // const passwordRef = useRef()
    const [error, setError] = useState("")
    const { authorization } = useAuth()
    const { currentUser, logout } = useAuth()
    const passwordRef = useRef()
    const navigate = useNavigate();
    

    async function handleLogout() {
        setError("")
        console.log()
        try {
          navigate("/")
        } catch {
          setError("Failed to log out")
        }
      }
    
    
    
    async function handleDeleteAccount(e) {
        e.preventDeafult()
        const response = await handleDeleteAccount()
    
    }

    return (
        <>

            <Navbar>
                <Header />
            </Navbar>

            <div style={{ padding: 50 }}>
                <h1>Account Information:</h1>
                <p>Click box to edit the following</p>

                <Form>
                    <Form.Group id="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" required />

                    </Form.Group>
                    <Form.Group id="first-name">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="firstname" required />
                    </Form.Group>
                    <Form.Group id="last-name">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="lastname" required />
                    </Form.Group>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" required />
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" required />
                    </Form.Group>
                    <Button className="w-100 text">Update Changes </Button>
                </Form>

                <div className="w-100 text-center mt-2">
                    <Button  onClick={handleLogout}> 
                        Log Out
                    </Button>




                </div>
                < Form onSubmit = {handleDeleteAccount} >
                    <Form.Group id = "password">
                        <Form.Label>Password</Form.Label>
                        <Button.Control type = 
                    </Form.Group>
                </Form> 
                <Button onClick = {handleDeleteAccount} style={{ margin: 20 }} className="w-100 text">Delete Account </Button>

            </div>




        </>

    );

};
export default MyAccount; 
