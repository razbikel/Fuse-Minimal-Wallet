import  React, {Component} from 'react';
import {connect} from 'react-redux';
import { fetchAccountTransfers } from '../../actions/accountTransfers';
import Transfer from './Transfer';

class Transfers extends Component{

    state = {
        transfers: undefined
    }

    componentDidMount(){
        this.setState({ transfers: this.props.accountTransfers.transfers })
    }


    render(){
        const transfers = this.state.transfers;
        return(
            <div>
                <h2>Transfers</h2>
                <div>
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