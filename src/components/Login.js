import React, { Component } from 'react'
import './Todo.css'
import { Button, Form , Spinner} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { withRouter } from 'react-router-dom';


class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             email: '',
             password:'',
             isLoading :null
        }
    }
    handleLoginEmail = (e)=>{
        this.setState({email: e.target.value})
    }

    handleLoginPass = (e)=>{
        this.setState({password: e.target.value})
    }

    handleLoginClick = (e)=>{
        e.preventDefault();
        console.log("clicked")
        const {email , password} = this.state
        axios({
            method : 'post',
            url :'https://navjot-task-app.herokuapp.com/users/login',
            data : {email  , password }
        })
        .then(res =>{
            console.log(res.data)
            localStorage.setItem('access_token', res.data.token)
            this.props.history.push('/form')
        })
        .catch(error =>{
            alert('This Email is not REGISTERED/Check Password')
            console.log(error)
            this.setState({isLoading:null})
        })
        this.setState({isLoading:1})
    }
    handleClick = (e)=>{
        e.preventDefault();
        this.props.history.push('/register')
    }
    
    render() {
        return (
            <div>
                
                <h1 className="header">Login Form</h1>
               
                {this.state.isLoading===null
                ?
                <Form className="credential-form" >
                    <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" 
                                  value={this.state.email} onChange={this.handleLoginEmail} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" 
                                  value={this.state.password} onChange={this.handleLoginPass} />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={this.handleLoginClick} >
                                 Submit
                    </Button>
                    <Button style={{marginLeft:"20px"}} variant="primary" type="submit"
                             onClick={this.handleClick} >
                                 Register
                    </Button>
                </Form> 
               :this.state.isLoading===1
               ?
               <Spinner style={{marginLeft:"600px"}}  animation="border" /> : 1 }
            </div>
        )
    }
}

export default withRouter (Login);
