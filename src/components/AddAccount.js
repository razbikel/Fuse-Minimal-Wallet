import  React, {Component} from 'react';
import history from '../history';
import Auth from './Auth';
import { Button } from 'react-bootstrap';

class AddAccount extends Component{

    back = () => {
        history.goBack();
    }

    render(){
        return(
            <div>
                <Auth />
                <Button onClick={this.back}>back</Button>
            </div>
        )
    }
}

export default AddAccount