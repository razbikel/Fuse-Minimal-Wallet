import  React, {Component} from 'react';
import {connect} from 'react-redux';
import { fetchAccountTokens } from '../../actions/accountTokens';
import Token from './Token';

class Balances extends Component{

    state = {
        tokens: undefined
    }

    componentDidMount(){
        this.props.fetchAccountTokens(this.props.account.accountAddress)
        .then(() => {
            this.setState({ tokens: this.props.accountTokens.tokens})
        })
        .catch((error) => console.error(error))
    }

    render(){
        const tokens = this.state.tokens;
        return(
            <div>
                <h2>Balances</h2>
                <div>
                    {
                        tokens !== undefined ? 
                            tokens.map((token, index) => {
                                return <Token token={token} key={index}/>
                            }) : null  
                    }
                </div>
            </div>
        )
    }
}

export default connect(
    ({ account, accountTokens }) => ({ account, accountTokens }),
    { fetchAccountTokens }
)(Balances);