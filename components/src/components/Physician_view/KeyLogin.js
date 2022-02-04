// src/Login.js 
import React from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import {Link} from "react-router-dom"
import { useNavigate } from "react-router-dom";

const KeyLogin = (props) => {
    const navigate = useNavigate();

    return (
        <>
    

        <Card>
            <Card.Body>
                <h3 className= 'text-center mb-4'>Health Care Provider Key</h3>
                <Form>
                    <Form.Group id = "key">
                        <Form.Label>Key</Form.Label>
                        <Form.Control type = "key"/>
                    </Form.Group>
                    <Button onClick = {() => navigate("/dataVisualization")} className = "w-100 text" >Log in</Button>
                </Form>
            </Card.Body>
        </Card>
        </>
        
    );

};
export default KeyLogin; 
