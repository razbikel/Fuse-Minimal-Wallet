import  React, {Component} from 'react';
import './Main.css'
import {connect} from 'react-redux';
import Balances from './Balances/Balances';
import Transfers from './Transfers/Transfers';
import { fetchAccountTransfers } from '../actions/accountTransfers';
import { uploadMap } from '../actions/accountTokenTransferMap';


class Main extends Component{

    state = {
        tab: 'Balances',
        transfers: [],
    }

    componentDidMount(){
        this.props.fetchAccountTransfers(this.props.account.accountAddress)
        .then(() => {
            this.setState({ transfers: this.props.accountTransfers.transfers}, () => {
                this.tokenTransfers_map()
            })
        })
        .catch((error) => console.error(error))
    }

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
        this.setState({ tab: newTab })
    }

    getFuseBalance = () => {
        return parseFloat(this.props.account.result) / Math.pow(10, 18);
    }

    render(){
        return (
            <div className="container">
                <h2>Main</h2>
                <h4>account: {this.props.account.accountAddress}</h4>
                <br />
                <h3>{this.getFuseBalance()} FUSE</h3>
                <hr />
                <div className="tab-bar">
                    <span onClick={() => this.toggleSetTab('Balances')}>Balances</span>
                    <span onClick={() => this.toggleSetTab('Transfers')}>Transfers</span>
                </div>
                {
                    this.state.tab === 'Balances' ? <Balances /> : <Transfers />
                }
            </div>
        )
    }

}

export default connect(
    ({ account, accountTransfers }) => ({ account, accountTransfers }),
    { fetchAccountTransfers, uploadMap }
)(Main);