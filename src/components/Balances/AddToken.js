import  React, {Component} from 'react';
import {Button, FormGroup, FormControl} from 'react-bootstrap';
import history from '../../history';
import {connect} from 'react-redux';

import './Balances.css'

class AddToken extends Component{

    state = {
        tokenAddress: '',
        tokenSymbol: '',
        tokenDecimals: '',
        next_button : false,
        show_message: false,
        message: ''
    }

    fetchNewToken = (event, key) => {

        let isExist;
        let accountTokens = this.props.accountTokens.tokens;
        let newState = { ...this.state };
        newState[key] = event.target.value;

        this.setState({ ...newState }, () => {
            if (this.state.tokenAddress === ''){
                return;
            }
            isExist = accountTokens.filter((token) => {
                return token.contractAddress === this.state.tokenAddress;
            })

            // this token have already exists in wallet
            if (isExist.length !== 0){
                this.setState({ show_message: true, message:'This token have already exists in your wallet!'})
                return;
            }

            else{
                this.setState({ show_message: false, message:''})
                fetch(`https://explorer.fuse.io/api?module=${'token'}&action=${'getToken'}&contractaddress=${this.state.tokenAddress}`)
                .then(res => res.json())
                .then(json => {
                    if (json.message === "OK"){
                        this.setState({ tokenSymbol: json.result.symbol, tokenDecimals: json.result.decimals, next_button: true })
                    }
                    else{
                        this.setState({ 
                            tokenSymbol:'', 
                            tokenDecimals: '', 
                            next_button: false, 
                            show_message: true,
                            message: json.message
                         })
                    }
                })
                .catch(error => console.log(error));
            }
        });

    }

    back = () => {
        //history.push('/main')
        history.goBack();
    }

    next = () => {
        history.push('/confirm-add-token') 
    }

    error = () => {
        const error = this.state.show_message ? <div className="error">{this.state.message}</div> : null;
        return error;
    }

    render(){
        return(
            <div className="container">
                <h2>add token</h2>
                <FormGroup>
                    <FormControl 
                        type = 'text'
                        value = {this.state.tokenAddress}
                        placeholder = 'enter token address'
                        onChange = {(event) => this.fetchNewToken(event, "tokenAddress")}
                        className='input-address' />
                </FormGroup>
                {this.error()}
                <FormGroup>
                    <FormControl 
                        type = 'text'
                        value = {this.state.tokenSymbol}
                        placeholder = 'token symbol'
                        onChange = {(event) => this.fetchNewToken(event, "tokenSymbol")}
                        className='input-address' />
                </FormGroup>
                <FormGroup>
                    <FormControl 
                        type = 'text'
                        value = {this.state.tokenDecimals}
                        placeholder = 'token decimals'
                        onChange = {(event) => this.fetchNewToken(event, "tokenDecimals")}
                        className='input-address' />
                </FormGroup>
                <Button onClick={this.back}>back</Button>
                <Button onClick={this.next} disabled={!this.state.next_button}>next</Button>
        </div>
        )
    }
}

export default connect(
    ({ accountTokens }) => ({  accountTokens }),
    null
)(AddToken);