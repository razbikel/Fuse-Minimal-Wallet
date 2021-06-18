import  React, {Component} from 'react';
import {connect} from 'react-redux';
import { fetchAccountTransfers } from '../../actions/accountTransfers';
import Transfer from './Transfer';

class Transfers extends Component{

    render(){
        const transfers = this.props.accountTransfers.transfers;
        return(
            <div>
                <div>
                    <br />
                    <br />
                    {
                        transfers === undefined || this.props.accountTransfers.status === 'fetching' ? 
                            <div>fetchinig...</div>  :
                            transfers.map((transfer, index) => {
                                    return <Transfer transfer={transfer} key={index}/>
                                }) 
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