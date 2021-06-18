import  React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import history from '../../history';
import {connect} from 'react-redux';
import {BACKEND} from '../../config';
import { sendUpdatedAccountTokens } from '../../actions/updatedAccountTokens';

import './Balances.css'

class ConfirmAddToken extends Component{

    state = {
        tokenSymbol: undefined,
        tokenName: undefined,
        token: undefined,
        balance: undefined,
        next_button : false,
        show_message: false,
        message: ''
    }

    componentDidMount(){

        let accountAddress = this.props.account.accountAddress;
        let tokenAddress = this.props.addToken.token.contractAddress;

        //for adding account balance of this token
        let updatedToken = { ...this.props.addToken.token };

        fetch(`${BACKEND.BASE_URL}?module=${'account'}&action=${'tokenbalance'}&contractaddress=${tokenAddress}&address=${accountAddress}`)
        .then(res => res.json())
        .then(json => {
            if(json.message !== 'OK'){
                this.setState({ show_message: true, message: json.message })
            }
            else{
                updatedToken.balance = json.result;
                this.setState({ token: updatedToken, next_button: true })
            }
        })
        .catch(error => console.error(error));

    }

    back = () => {
        history.goBack();
    }

    add = () => {
        let updatedTokens = this.props.accountTokens.tokens;
        updatedTokens.push(this.state.token);
        this.props.sendUpdatedAccountTokens(updatedTokens)
        .then(() => history.push('/main'))
        .catch((error) => console.error(error));
    }

    error = () => {
        const error = this.state.show_message ? <div className="error">{this.state.message}</div> : null;
        return error;
    }

    render(){
        return(
            <div className="container">
                <h2>add token confirm</h2>
                <h4>are you sure you want to add this token?</h4>
                <hr />
                <div className="confirm-heads">
                    <span>token</span>
                    <span>balance</span>
                </div>
                <div className="confirm-values">
                    <span>{this.state.token !== undefined ? this.state.token.symbol : null}</span>
                    <span>{this.state.token !== undefined ? this.state.token.balance : null}</span>
                </div>
                <br />
                {this.error()}
                <Button onClick={this.back}>back</Button>
                <Button onClick={this.add} disabled={!this.state.next_button}>add token</Button>
        </div>
        )
    }
}

export default connect(
    ({ account, accountTokens, addToken }) => ({ account, accountTokens, addToken }),
    { sendUpdatedAccountTokens }
)(ConfirmAddToken);