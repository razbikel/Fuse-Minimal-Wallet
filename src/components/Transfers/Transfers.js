import  React, {Component} from 'react';
import {connect} from 'react-redux';
import { fetchAccountTransfers } from '../../actions/accountTransfers';
import Transfer from './Transfer';

class Transfers extends Component{

    render(){
        const transfers = this.props.transfers;
        return(
            <div>
                <div>
                    {
                        transfers === undefined && this.props.accountTransfers.status === 'fetching' ? 
                            <div>fetchinig...</div>  :
                            this.props.accountTransfers.status === 'fetching' ? 
                            <div>fetchinig...</div>  :
                            this.props.accountTransfers.status === 'error' ? <div>{this.props.accountTransfers.message}</div> :
                            (transfers === undefined || transfers === []) && this.props.accountTransfers.status !== 'fetching' ? 
                                <div>You dont have any transfers for this token</div> :
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