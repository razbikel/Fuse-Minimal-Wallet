import  React, {Component} from 'react';
import history from '../../history';
import Auth from '../Auth';
import { Button } from 'react-bootstrap';

import '../Balances/Balances.css'

class AddAccount extends Component{

    back = () => {
        history.goBack();
    }

    render(){
        return(
            <div>
                <Auth />
                <Button className="addAccount-button" onClick={this.back}>back</Button>
            </div>
        )
    }
}

export default AddAccount