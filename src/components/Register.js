import React, { Component } from 'react'
import { Form, Button, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Todo.css'
import axios from 'axios'
import { withRouter } from 'react-router-dom';
class Register extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            email : "",
            password : "",
            name : "" ,
            isLoading:null
        }
    }

    handleEmail = (e)=>{
        this.setState({email: e.target.value})
    }
    handlePassword = (e)=>{
        this.setState({password : e.target.value})
    }
    handleName = (e)=>{
        this.setState({name:e.target.value})
    }
    handleClick = (e)=>{
        e.preventDefault();
        console.log("clicked")

        const {email , password, name} = this.state;

        axios({
            method: 'post',
            url: 'https://navjot-task-app.herokuapp.com/users',
            data: {email ,
                   password,
                   name}
        })
        .then(res =>{
            localStorage.setItem('access_token', res.data.token)
            this.props.history.push('/form')
            console.log(res.data)
        })
        .catch(error =>{
            console.log(error)
            alert("This Email Is Already Registred")
            this.setState({isLoading:null})
        })
        this.setState({isLoading:1})
    }
    
    render() {
        return (
        <div>
            <h1 className="header">Registration Form</h1>
            {this.state.isLoading===null
                ?

            <Form className="credential-form">
                <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Full Name" name="name"
                               value={this.state.name} onChange={this.handleName} />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email"
                               value={this.state.email} onChange={this.handleEmail} />
                <Form.Text className="text-muted">
                </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password"
                                  value={this.state.password} onChange={this.handlePassword} />
                </Form.Group>
 
                <Button variant="primary" type="submit"  onClick={this.handleClick} >
                    Submit
                </Button>
            </Form>
            :this.state.isLoading===1
            ?
            <Spinner style={{marginLeft:"600px"}} animation="border" /> : 1 }
        </div>
        )
    }
}

export default withRouter (Register)
