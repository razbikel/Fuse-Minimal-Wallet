import  React, {Component} from 'react';
import {connect} from 'react-redux';
import history from '../history';
import { fetchAccountAddress } from '../actions/account';
import { fetchAccountTransfers } from '../actions/accountTransfers';
import { fetchAccountTokens } from '../actions/accountTokens';


class AccountsMenu extends Component{

    addAccount = () => {
        history.push('/add-account')
    }

    updateCurrentAccount = (account) => {
        this.props.fetchAccountAddress(account)
        .then(() => {
            return this.props.fetchAccountTokens(account, true)
        })
        .then(() => {
            return this.props.fetchAccountTransfers(account);
        })
        .then(() => {
            history.push(`/main?address=${account}`);
        })
        .catch(error => console.error(error))
    }

    render(){
        const accounts = this.props.account.accounts
        return(
            <div>
                {
                    accounts.map((account, index) => {
                        return <div onClick={() => this.updateCurrentAccount(account)} key={index}>{account}</div>
                    })
                }
                <div onClick={this.addAccount}>add account</div>
            </div>
        )
    }
}

export default connect(
    ({ account, accountTokens, accountTransfers }) => ({ account, accountTokens, accountTransfers }),
    { fetchAccountTransfers, fetchAccountTokens, fetchAccountAddress }
)(AccountsMenu);