import  React, {Component} from 'react';
import {connect} from 'react-redux';
import { fetchAccountTransfers } from '../../actions/accountTransfers';
import Transfer from './Transfer';

class Transfers extends Component{

    state = {
        transfers: undefined
    }

    componentDidMount(){
        this.props.fetchAccountTransfers(this.props.account.accountAddress)
        .then(() => {
            this.setState({ transfers: this.props.accountTransfers.transfers})
        })
        .catch((error) => console.error(error))
    }

    render(){
        const transfers = this.state.transfers;
        return(
            <div>
                <h2>Transfers</h2>
                <div>
                    {
                        transfers !== undefined ? 
                        transfers.map((transfer, index) => {
                                return <Transfer transfer={transfer} key={index}/>
                            }) : null  
                    }
                </div>
            </div>
        )
    }
}

export default connect(
    ({ account, accountTransfers }) => ({ account, accountTransfers }),
    { fetchAccountTransfers }
)(Transfers);