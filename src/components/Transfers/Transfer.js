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
        const transferDate = new Date(transfer.timeStamp * 1000).toLocaleDateString("en-US");
        console.log(transfer)
        return (
            <div className="transfer" onClick={this.toggleTransferTicket}>
                <TransferTicketModal show={this.state.transferTicket} close={this.toggleTransferTicket}>
                    <TransferTicket transfer={transfer} account={this.props.account.accountAddress}/>
                </TransferTicketModal>
                <div className="transfer-content" >
                    <u>date</u>: {transferDate}&nbsp;&nbsp;&nbsp;
                    <u>token</u>:{transfer.tokenSymbol} &nbsp;&nbsp;&nbsp;
                    <u>balance</u>:{parseFloat(transfer.value) / (Math.pow(10, parseFloat(transfer.tokenDecimal)))}
                </div>
                <div className="more-details">details{` >`}</div>
            </div>
            
        )
    }

}

export default connect(
    ({ account }) => ({ account }),
    null
)(Transfer);
