import  React, {Component} from 'react';
import {connect} from 'react-redux';
import history from '../../history'


class Token extends Component{

     getTokenRealValue = (balance, decimals) => {
        return parseFloat(balance) / (Math.pow(10, parseFloat(decimals)));
    }

    getTransfers = (token) => {
        const transfers = this.props.account.map[token.contractAddress];
        history.push(`/token-transfers?account_add=${this.props.account.accountAddress}&token_add=${token.contractAddress}`, {
            transfers,
            account: this.props.account.accountAddress,
            symbol: token.symbol,
            balance: this.getTokenRealValue(token.balance, token.decimals)
        });

    }

    render(){
        const token = this.props.token;
        return (
                <div className={"token"} onClick={() => this.getTransfers(token)}>
                    <div className={"token-content"}>
                        {this.getTokenRealValue(token.balance, token.decimals)} &nbsp;&nbsp;&nbsp;{token.symbol}
                    </div>
                </div>
        )
    }

}

export default connect(
    ({ account, accountTransfers }) => ({ account, accountTransfers }),
    null
)(Token);
