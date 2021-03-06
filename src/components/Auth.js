import  React, {Component} from 'react';
import {Button, FormGroup, FormControl} from 'react-bootstrap';
import './Auth.css'
import {connect} from 'react-redux';
import { fetchAccountAddress } from '../actions/account';
import history from '../history';

class Auth extends Component{

    state = {
        account_address: ''
    }

    account_address = (event) => {
        this.setState({ account_address: event.target.value })
    }

    connect = () => {
        this.props.fetchAccountAddress(this.state.account_address)
        .then(() => {
            history.push(`/main?address=${this.props.account.accountAddress}`);
        })
        .catch(error => console.error(error))
    };

    render(){
        return(
            <div className="container">
                <h2 className={"auth-header"}>connect to fuse network</h2>
                <div className="auth-content">
                    <FormGroup>
                        <FormControl 
                            type = 'text'
                            value = {this.state.account_address}
                            placeholder = 'enter account address on Fuse network'
                            onChange = {this.account_address}
                            className='input-address' />
                    </FormGroup>
                    <br />
                    <br />
                    <Button className={"connect-button"} onClick={this.connect}>Connect</Button>
                </div>
                {
                    this.props.account.status === 'error' ? 
                    <div className="auth-error">{this.props.account.message}</div> : null
                }
            </div>
        )
    }
}

export default connect(
    ({ account }) => ({ account }),
    { fetchAccountAddress }
)(Auth);