import React from 'react';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import auth from './auth';
import {useHistory} from 'react-router-dom';


export const Home = (props) => {
    const history = useHistory();
    return (
             <div>
               <h1>Task</h1>
                 <Button 
                    onClick={() => {
                      auth.login(() => {
                          history.push("/login")       
                      });
                    }}>Login</Button>
                 <Button component={Link} to="/sign-in">Sign In</Button>
             </div>
    )
    
}


