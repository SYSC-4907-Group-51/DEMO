import React, { useState } from "react";
import { Card, Button, Alert, Navbar} from "react-bootstrap";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from './Header';


export default function AddTracker() {
  const [error, setError] = useState("")
  const { authorization } = useAuth()

  async function handleAuthorization(e) {
    e.preventDefault()

    try {
    setError("")
    const response = await authorization()
    console.log(response)
    } catch {
    setError("Failed to authorize")
    }
}




  return (
    <>
      <Navbar>
        <Header />
      </Navbar>

      <Card style = {{padding: 70}} > 
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Button onClick={handleAuthorization} className="w-100" type="submit">
              Add Tracker
          </Button>
        </Card.Body>
      </Card>
      
    </>
  )
}