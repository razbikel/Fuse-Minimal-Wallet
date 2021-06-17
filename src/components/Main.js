import  React, {Component} from 'react';
import './Main.css'
import {connect} from 'react-redux';
import Balances from './Balances/Balances';
import Transfers from './Transfers/Transfers';


class Main extends Component{

    state = {
        route: 'Balances'
    }

    toggleSetRoute = (newRoute) => {
        this.setState({ route: newRoute })
    }

    render(){
        return (
            <div className="container">
                <h2>Main</h2>
                <h4>account: {this.props.account.accountAddress}</h4>
                <br />
                <div className="route-bar">
                    <span onClick={() => this.toggleSetRoute('Balances')}>Balances</span>
                    <span onClick={() => this.toggleSetRoute('Transfers')}>Transfers</span>
                </div>
                {
                    this.state.route === 'Balances' ? <Balances /> : <Transfers />
                }
            </div>
        )
    }

}

export default connect(
    ({ account }) => ({ account }),
    null
)(Main);