import  React, {Component} from 'react';
import {Button, FormGroup, FormControl} from 'react-bootstrap';
import './Auth.css'

class Auth extends Component{

    state = {
        account_address: ''
    }

    account_address = (event) => {
        this.setState({ account_address: event.target.value })
    }

    connect = () => {
        fetch(`https://explorer.fuse.io/api?module=${'account'}&action=${'balance'}&address=${this.state.account_address}`)
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(error => console.log(error))
    };

    render(){
        return(
            <div className="container">
                <h2>Auth</h2>
                <div className='auth-form'>
                    <FormGroup>
                        <FormControl 
                            type = 'text'
                            value = {this.state.account_address}
                            placeholder = 'enter account address on Fuse network'
                            onChange = {this.account_address}
                            className='input-address' />
                    </FormGroup>
                </div>
                <Button onClick={this.connect}>Connect</Button>
            </div>
        )
    }
}

export default Auth;