import  React, {Component} from 'react';
import {Button, FormGroup, FormControl} from 'react-bootstrap';
import history from '../../history';
import {connect} from 'react-redux';
import { fetchToken } from '../../actions/addToken';

import './Balances.css'

class AddToken extends Component{

    state = {
        tokenAddress: '',
        tokenSymbol: '',
        tokenDecimals: '',
        accountTokens: [],
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
                return token.contractAddress.toLowerCase() === this.state.tokenAddress.toLowerCase();
            })

            // this token have already exists in wallet
            if (isExist.length !== 0){
                this.setState({ show_message: true, message:'This token have already exists in your wallet!'})
                return;
            }

            else{
                this.setState({ show_message: false, message:''})

                this.props.fetchToken(this.state.tokenAddress)
                .then(() => {
                    const token = this.props.addToken.token;
                    if (this.props.addToken.message === "OK"){
                        this.setState({ tokenSymbol: token.symbol, tokenDecimals: token.decimals, next_button: true })
                    }
                    else{
                        this.setState({ 
                            tokenSymbol:'', 
                            tokenDecimals: '', 
                            next_button: false, 
                            show_message: true,
                            message: this.props.addToken.message
                            })
                    }

                })
                .catch(error => console.error(error));
            }
        });
    }

    back = () => {
        history.goBack();
    }

    next = () => {
        history.push(`/confirm-add-token?account_add=${this.props.account.accountAddress}&token_add=${this.state.tokenAddress}`) 
    }

    error = () => {
        const error = this.state.show_message ? <div className="add-error">{this.state.message}</div> : null;
        return error;
    }

    render(){
        return(
            <div className="container">
                <h2 className="add-token-header" >add token</h2>
                <FormGroup>
                    <FormControl 
                        type = 'text'
                        value = {this.state.tokenAddress}
                        placeholder = 'enter token address'
                        onChange = {(event) => this.fetchNewToken(event, "tokenAddress")}
                        className='input-address' />
                </FormGroup>
                <br /><br />
                <FormGroup>
                    <FormControl 
                        type = 'text'
                        value = {this.state.tokenSymbol}
                        placeholder = 'token symbol'
                        onChange = {(event) => this.fetchNewToken(event, "tokenSymbol")}
                        className='input-address' />
                </FormGroup>
                <br /><br />
                <FormGroup>
                    <FormControl 
                        type = 'text'
                        value = {this.state.tokenDecimals}
                        placeholder = 'token decimals'
                        onChange = {(event) => this.fetchNewToken(event, "tokenDecimals")}
                        className='input-address' />
                </FormGroup>
                <br /><br />
                <Button className={"nav-button"} onClick={this.back}>back</Button>
                &nbsp;&nbsp;&nbsp;
                <Button className={"nav-button"} onClick={this.next} disabled={!this.state.next_button}>next</Button>
                {this.error()}
        </div>
        )
    }
}

export default connect(
    ({ account, accountTokens, addToken }) => ({  account, accountTokens, addToken }),
    { fetchToken }
)(AddToken);