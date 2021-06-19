import React, { Component } from 'react'

import './Modal.css'


class AccountsMenuModal extends Component {

    shouldComponentUpdate(nextProps, nextState){
        if (nextProps.show !== this.props.show){
            return true;
        }
        else
            return false;
    }


    render(){
        return (
                <div
                className="AccountsMenuModal"
                style= {{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1': '0'
                }}>
                    {this.props.children}
                    <br />
                </div>
        )
    }
}

export default AccountsMenuModal;