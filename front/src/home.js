import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';


function Home() {
    return (
        <div>
        <h1>Task</h1>
        <Button component={Link} to="/login">Login</Button>
        <Button component={Link} to="/sign-in">Sign In</Button>
    </div>
        
    )
    
}


export default Home;