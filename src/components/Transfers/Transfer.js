import  React, {Component} from 'react';
import TransferTicketModal from '../Modal/TransferTicketModal';
import TransferTicket from '../Transfers/TransferTicket';
import {connect} from 'react-redux';

class Transfer extends Component{

    state = {
        transferTicket: false
    }

    toggleTransferTicket = () => {
        this.setState({ transferTicket: !this.state.transferTicket })
    }

    render(){
        const transfer = this.props.transfer;
        return (
            <div>
                <TransferTicketModal show={this.state.transferTicket} close={this.toggleTransferTicket}>
                    <TransferTicket transfer={transfer} account={this.props.account.accountAddress}/>
                </TransferTicketModal>
                <div onClick={this.toggleTransferTicket}>{transfer.value} &nbsp;&nbsp;&nbsp;{transfer.gasPrice}</div>
            </div>
            
        )
    }

}

export default connect(
    ({ account }) => ({ account }),
    null
)(Transfer);
