import  React, {Component} from 'react';
import {connect} from 'react-redux';
import { fetchAccountTokens } from '../../actions/accountTokens';
import { Button } from 'react-bootstrap';
import Token from './Token';
import history from '../../history';

class Balances extends Component{

    state = {
        tokens: undefined,
    }

    componentDidMount(){
        this.props.fetchAccountTokens(this.props.account.accountAddress)
        .then(() => {
            this.setState({ tokens: this.props.accountTokens.tokens})
        })
        .catch((error) => console.error(error))
    }

    toggleAddToken = () => {
        history.push('/add-token')
    }

    render(){
        const tokens = this.state.tokens;
        return(
            <div>
                <h2>Balances</h2>
                <div>
                    {
                        tokens === undefined || this.props.accountTokens.status === 'fetching' ?
                            <div>fetchinig...</div>  :
                            tokens.map((token, index) => {
                                return <Token token={token} key={index}/>
                            })   
                    }
                </div>
                <br />
                <Button onClick={this.toggleAddToken}>add token</Button>
            </div>
        )
    }
}

export default connect(
    ({ account, accountTokens }) => ({ account, accountTokens }),
    { fetchAccountTokens }
)(Balances);