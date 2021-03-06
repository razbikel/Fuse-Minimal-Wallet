import  React, {Component} from 'react';
import './Main.css'
import {connect} from 'react-redux';
import Balances from './Balances/Balances';
import Transfers from './Transfers/Transfers';
import AccountsMenu from './AccountsMenu/AccountsMenu';
import AccountsMenuModal from './Modal/AccountsMenuModal';
import { fetchAccountTransfers } from '../actions/accountTransfers';
import { fetchAccountTokens } from '../actions/accountTokens';
import { uploadMap } from '../actions/accountTokenTransferMap';


class Main extends Component{

    state = {
        tab: 'Balances',
        transfers: [],
        tokens: undefined,
        balances_active: true,
        transfers_active: false,
        accountsMenu: false
    }

    componentDidMount(){
        this.props.fetchAccountTransfers(this.props.account.accountAddress)
        .then(() => {
            this.setState({ transfers: this.props.accountTransfers.transfers}, () => {
                this.tokenTransfers_map()
            })
        })
        .catch((error) => console.error(error));

        this.props.fetchAccountTokens(this.props.account.accountAddress)
        .then(() => {
            this.setState({ tokens: this.props.accountTokens.tokens})
        })
        .catch((error) => console.error(error));
    }


    // hash map for the account token - the keys are the tokens and values are the transfers details
    tokenTransfers_map = () => {
        let token_transfer_map = new Map()
        this.state.transfers.forEach((transfer) => {
            if (token_transfer_map[transfer.contractAddress] === undefined){
                token_transfer_map[transfer.contractAddress] = [transfer]
            }
            else{
                token_transfer_map[transfer.contractAddress] = [ ...token_transfer_map[transfer.contractAddress], transfer];
            }
            
        })
        this.props.uploadMap(token_transfer_map);
    }

    toggleSetTab = (newTab) => {
        if(newTab === 'Balances'){
            this.setState({ tab: newTab, balances_active: true, transfers_active: false })
        }
        else{
            this.setState({ tab: newTab, balances_active: false, transfers_active: true })
        }

    }

    getFuseBalance = () => {
        return parseFloat(this.props.account.result) / Math.pow(10, 18);
    }

    accountsMenu = () => {
        this.setState({ accountsMenu: !this.state.accountsMenu })
    }

    render(){
        return (
            <div>
                <AccountsMenuModal show={this.state.accountsMenu}>
                    <AccountsMenu />
                </AccountsMenuModal>
                <div className="container-main">
                    <div className="accounts-menu" onClick={this.accountsMenu}>Accounts Menu {'>'}</div>
                    <h4 className="account"><u>account:</u> {this.props.account.accountAddress}</h4>
                    <hr />
                    <br/>
                    <h3 className="balance-fuse">{this.getFuseBalance()} FUSE</h3>
                    <hr />
                    <div className="tab-bar">
                        <div className={`tab-${this.state.balances_active}`} onClick={() => this.toggleSetTab('Balances')}>Balances</div>
                        <div className={`tab-${this.state.transfers_active}`} onClick={() => this.toggleSetTab('Transfers')}>Transfers</div>
                    </div>
                    <br /><br />
                    {
                        this.state.tab === 'Balances' ? <Balances tokens={this.props.accountTokens.tokens}/> : <Transfers transfers={this.props.accountTransfers.transfers} />
                    }
                </div>
            </div>
        )
    }

}

export default connect(
    ({ account, accountTokens, accountTransfers }) => ({ account, accountTokens, accountTransfers }),
    { fetchAccountTransfers, fetchAccountTokens, uploadMap }
)(Main);