import  React, {Component} from 'react';

import './Transfer.css'

class TransferTicket extends Component{

    render(){
        const transfer = this.props.transfer;
        return(
            <div >
                {
                    transfer !== undefined ? 
                        <div>
                            <h2 className="transfer-tikcet-header">{transfer.tokenSymbol} transfer details</h2>
                            <div><u>From</u> {transfer.from}</div>
                            <div><u>To</u> {transfer.to}</div>
                            <hr />
                            <div><u>Nonce</u> {transfer.nonce}</div>
                            <hr />
                            <div><u>Gas limit</u> {transfer.gas}</div>
                            <hr />
                            <div><u>Gas used</u> {transfer.gasUsed}</div>
                            <hr />
                            <div><u>Gas price</u> {parseFloat(transfer.gasPrice) / Math.pow(10, parseFloat(9))}</div>
                            <hr />
                        </div>
                        : null
                }
            </div>
        )
    }
}

export default TransferTicket;