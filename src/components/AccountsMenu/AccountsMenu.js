import  React, {Component} from 'react';
import {connect} from 'react-redux';
import history from '../../history';
import { fetchAccountAddress } from '../../actions/account';
import { fetchAccountTransfers } from '../../actions/accountTransfers';
import { fetchAccountTokens } from '../../actions/accountTokens';

import '../Main.css'


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

    getAccountStyle = (accountItem) => {
        let current =  this.props.account.accountAddress === accountItem ? true : false;
        return `account-menu-item-${current}`
    }

    render(){
        const accounts = this.props.account.accounts
        return(
            <div>
                {
                    accounts.map((account, index) => {
                        return (
                            <div>
                                <div 
                                    key={index} 
                                    className={this.getAccountStyle(account)} 
                                    onClick={() => this.updateCurrentAccount(account)}
                                >
                                    {account}
                                </div>
                                <hr />
                            </div>
                        )
                    })
                }
                <br />
                <div className={"add-account-btn"}onClick={this.addAccount}>+ Add Account</div>
            </div>
        )
    }
}

export default connect(
    ({ account, accountTokens, accountTransfers }) => ({ account, accountTokens, accountTransfers }),
    { fetchAccountTransfers, fetchAccountTokens, fetchAccountAddress }
)(AccountsMenu);