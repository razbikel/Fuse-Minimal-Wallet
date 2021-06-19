import  React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import history from '../../history';
import {connect} from 'react-redux';
import {BACKEND} from '../../config';
import { sendUpdatedAccountTokens } from '../../actions/updatedAccountTokens';

import './Balances.css'

class ConfirmAddToken extends Component{

    state = {
        token: undefined,
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
        .then(() => history.push(`/main?address=${this.props.account.accountAddress}`))
        .catch((error) => console.error(error));
    }

    error = () => {
        const error = this.state.show_message ? <div className="error">{this.state.message}</div> : null;
        return error;
    }

    render(){
        return(
            <div className="container-confirm">
                <h2 className="add-token-header">add token confirm</h2>
                <h4 className="add-token-header-small">are you sure you want to add this token?</h4>
                <hr />
                <div className="confirm-heads">
                    <div className="confirm-head">token</div>
                    <div className="confirm-head">balance</div>
                </div>
                <br />
                <div className="confirm-values">
                    <div className="confirm-value">{this.state.token !== undefined ? this.state.token.symbol : null}</div>
                    <div className="confirm-value">{this.state.token !== undefined ? this.state.token.balance : null}</div>
                </div>
                <br />
                {this.error()}
                <Button className={"nav-button"} onClick={this.back}>back</Button>
                &nbsp;&nbsp;&nbsp;
                <Button className={"nav-button"} onClick={this.add} disabled={!this.state.next_button}>add token</Button>
        </div>
        )
    }
}

export default connect(
    ({ account, accountTokens, addToken }) => ({ account, accountTokens, addToken }),
    { sendUpdatedAccountTokens }
)(ConfirmAddToken);