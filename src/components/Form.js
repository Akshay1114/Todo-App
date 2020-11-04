
import React, { Component } from 'react'
import { Button, InputGroup,FormControl, Navbar , Container} from 'react-bootstrap';
import Todo from './Todo'
import axios from 'axios'
import { withRouter } from 'react-router-dom';


 class Form extends Component {
     constructor(props) {
         super(props)
     
         this.state = {
              header : ''
         }
     }
componentDidMount(){

    console.log(localStorage.getItem('access_token'))

        const token = localStorage.getItem('access_token')

    axios({
        method : 'get',
        url :'https://navjot-task-app.herokuapp.com/users/me',
        headers : {
            "Authorization":  token,
            'Content-Type': 'application/json'
        }
        })
        .then(res =>{
            console.log(res.data)
            this.setState({header : res.data.name})
        })
        .catch(error =>{
            console.log(error)
        })   
}  

handleLogout = (e)=>{
    e.preventDefault();
    localStorage.clear("token")
    this.props.history.push('/')

}
     
    render() {
        return (
            <div>
                
                    <Navbar expand="lg" variant="light" bg="light">
                            <Container>
                                <h4 style={{fontFamily:" courier",color:"#2F4F4F"}}>
                                    Logged In As {this.state.header}
                                </h4>
                            </Container>
                            <Button variant="dark" style={{float:"right", marginRight:"50px"}}
                                    onClick={this.handleLogout} >
                                Logout
                            </Button>
                    </Navbar>

             <div className="add-item">
                        <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Add Task..."
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            />
                        <InputGroup.Append>
                        <Button variant="outline-secondary">Button</Button>
                        </InputGroup.Append>
                    </InputGroup>
              </div>
        </div>

        )
    }
}

export default withRouter  (Form);