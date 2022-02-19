// src/Login.js 
import React, { useRef, useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import {Link} from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Patient_view/AuthContext"

const KeyLogin = (props) => {
    const navigate = useNavigate();
    const { healthCareLogin } = useAuth()
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const emailRef = useRef()
    const keyRef = useRef()

    async function hcLogin(e) {
        e.preventDefault()

        try {
            setError("")
            setSuccess("")
             
            const response = await healthCareLogin(emailRef.current.value, keyRef.current.value )
            console.log(response)
            if (response.status_code === 200 ){
                setSuccess("Health care provider Successfuly logged in ")
                navigate("/dashboard")
            }
            else{
                if( response.data.detail === "Invalid request" ){
                    setError("Username and key are not in query")
                }
                else if (response.data.detail === "No such user") {
                    setError("No such username")
                }
                else {
                    setError("No such key")
                }
            }
        
        } 
        catch {
            setError("Health Care provider failed to login")
        }

    }

    return (
        <>
    

       

        <Card>
            <Card.Body>
                <h3 className= 'text-center mb-4'>Health Care Provider Key</h3>
                <Form onSubmit = {hcLogin}>
                <Form.Group id ="username2">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type = "username" ref={emailRef} required />

                    </Form.Group>
                    <Form.Group id = "key">
                        <Form.Label>Key</Form.Label>
                        <Form.Control type = "key" ref={keyRef} required />
                    </Form.Group>

                    <Button  className = "w-100 text" type = "submit">Log in</Button>
                </Form>
            </Card.Body>
        </Card>
        
        </>
        
    );

};
export default KeyLogin; 
