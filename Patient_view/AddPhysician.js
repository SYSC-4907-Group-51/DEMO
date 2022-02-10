import React from 'react'
import { Container, Button, Card,Navbar,InputGroup,FormControl} from 'react-bootstrap'
import Header from './Header';
import "bootstrap/dist/css/bootstrap.min.css"
import { useNavigate } from "react-router-dom";


const AddPhysican = (props) => {
    const navigate = useNavigate();
    return (
        <>
            <Navbar>
                <Header/>
            </Navbar>

            <Container style = {{padding:50}} >
                <h2 className = 'text-center'>Adding new Physician</h2>
                <InputGroup className="mb-5" >
                            <InputGroup.Text>First and last name</InputGroup.Text>
                            <FormControl style = {{width:50}} aria-label="First name" />
                            <FormControl style = {{width:50}} aria-label="Last name" />

                </InputGroup>
                <InputGroup className="mb-3">
                    <FormControl
                    placeholder="Physican's email"
                    aria-label="Physican's email"
                    aria-describedby="basic-addon2"
                    />
                    <InputGroup.Text id="basic-addon2">@example.com</InputGroup.Text>
                </InputGroup>
                
                <form>
                    <h3>
                        Permisson for following data: 
                    </h3>
                    <label>
                        <ul>
                            <p>Tip: click boxes to enable sharing</p>
                           <li>
                                <input type = "checkbox" name = "Resting Heart Rate"/> Resting Heart Rate
                            </li> 
                            <li>
                                <input type = "checkbox" name = "Sleep Efficiency"/> Sleep Efficiency
                            </li>
                            <li>
                                <input type = "checkbox" name = "Activity Steps "/> Activity Steps 
                            </li>
                        </ul>

                        
                        
                    </label>
                </form>

                <Button onClick = {() => navigate("/share")} className = "w-100 text">Save</Button>
                    
                    
                        
                   
                

                
            </Container>

            
        </>
    );
}

export default AddPhysican; 