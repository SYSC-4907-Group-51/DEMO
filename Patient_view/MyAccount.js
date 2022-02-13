// src/Login.js 
import React, { useRef, useState } from "react"
import { Form, Button, Card, Navbar, Alert } from 'react-bootstrap'
import Header from './Header';
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import store from "../store"


const MyAccount = (props) => {
    // const emailRef = useRef()
 
    const [error, setError] = useState("")
    const { authorization } = useAuth()
    const { currentUser, logout, deleteAccount } = useAuth()
    const passwordRef = useRef()
    const navigate = useNavigate();


    async function handleLogout() {

        try {
            
            setError("")
            // const response = await logout();
            // if(response.status === 200 && response.details === "Successfully Logged out"){ // checks what type of response
                
                navigate("/")
            }

                // console.log()
           
       // } 
        catch {
            setError("Failed to log out")
        }
    }



    async function handleDeleteAccount() {
     
        try{
        setError("")
        const response = await deleteAccount(passwordRef.current.value)
        console.log(response)

        if(response.status === 204){ // checks what type of response 
            // store.dispatch({
            //     type: "storeAccess",
            //     payload: {
            //         access: response.access
            //     }
            // });
            // console.log(store.getState());
            navigate("/")
        } else {
            setError("Invalid password")
            
        }
        }catch{
            setError("Failed to delete account")
        }

       
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
                    <Button onClick={handleLogout}>
                        Log Out
                    </Button>




                </div>
                <Card>
                    <Card.Body>

                        < Form  onSubmit={handleDeleteAccount} style={{ margin: 20 }} >
                            {error && <Alert variant="danger">{error}</Alert>}

                            <Form.Group id="password">
                                <Form.Label> Confirm Password 2 delete</Form.Label>
                                <Form.Control type="password" ref={passwordRef} required />
                            </Form.Group>

                            <Button type = "submit"  className="w-100 text">Delete Account </Button>
                        </Form>
                    </Card.Body>
                </Card>



            </div>




        </>

    );

};
export default MyAccount; 