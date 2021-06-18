import  React, {Component} from 'react';
import {connect} from 'react-redux';
import history from '../../history'


class Token extends Component{

    state = {
        transfers: undefined,
        transferTicket: false
    }

    getTokenRealValue = (balance, decimals) => {
        return parseFloat(balance) / (Math.pow(10, parseFloat(decimals)));
    }

    toggleTransferTicket = () => {
        this.setState({ transferTicket: !this.state.transferTicket })
    }

    getTransfers = (token) => {
        const transfers = this.props.account.map[token.contractAddress];
        console.log(transfers)
        //this.setState({ transferTicket: !this.state.transferTicket, transfers })
        history.push('/token-transfers', {
            transfers,
            account: this.props.account.accountAddress
        });

    }


    render(){
        const token = this.props.token;
        return (
            <div>
                <div onClick={() => this.getTransfers(token)}>
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
