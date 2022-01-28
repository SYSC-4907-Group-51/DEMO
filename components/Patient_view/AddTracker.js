import React, { useState } from "react";
import { Card, Button, Alert, Navbar} from "react-bootstrap";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from './Header';


export default function AddTracker() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate();


  async function handleLogout() {
    setError("")

    try {
      navigate("/")
    } catch {
      setError("Failed to log out")
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
          <Link to="/login" className="btn btn-primary w-100 mt-3">
            Add Tracker
          </Link>
        </Card.Body>
      </Card>
      
    </>
  )
}