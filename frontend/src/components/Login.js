import React, { useRef, useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

function Login()
{

    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');
    
    const loginName = useRef(null);
    const loginPassword = useRef(null);

    const [message,setMessage] = useState('');
    const [messageColor, setMessageColor] = useState('');

    const doLogin = async event => 
    {
        event.preventDefault();

        var obj = {email:loginName.current.value,password:loginPassword.current.value};
        var js = JSON.stringify(obj);

        var config = 
        {
            method: 'post',
            url: bp.buildPath('users/login'),	
            headers: 
            {
                'Content-Type': 'application/json'
            },
            data: js
        };

        axios(config)
            .then(function (response) 
        {
            var res = response.data;
            if (res.error) 
            {
                setMessage("User/Password combination incorrect");
            }
            else 
            {	
                storage.storeToken(res);
                var jwt = require('jsonwebtoken');
                
                var ud = jwt.decode(storage.retrieveToken(),{complete:true});
                var userId = ud.payload.id;
                var firstName = ud.payload.firstName;
                var lastName = ud.payload.lastName;
                var email = res.email;
                var accessToken = res.accessToken;

                var user = {firstName:firstName,lastName:lastName,id:userId,email:email,accessToken:accessToken}
                localStorage.setItem('user_data', JSON.stringify(user));
                
                setMessage("Logging In");
                setMessageColor('green');
                setTimeout(
                    function(){
                            window.location.href = '/museum';
                    },2000)
            }
        })
        .catch(function (error) 
        {
            console.log(error.response.data);
        });
    }


    return(
        <div id="loginDiv">
            <Grid container spacing={0} direction="column" alignItems="center" justify="center">
                <h4 id="inner-title">Please Sign In</h4><br />
                <TextField  style={{marginBottom: "2em"}} variant="outlined" required label="Email" type="text" id="loginName" inputRef={loginName}  />
                <TextField  style={{marginBottom: "2em"}} variant="outlined" required label="Password" type="password" id="loginPassword" inputRef={loginPassword} />
                <Button variant="contained" size="large" color="primary" type="submit" id="loginButton" className="buttons" value = "Log In" onClick={doLogin}>Log In</Button>
                <span id="loginResult" style={{color:messageColor}}>{message}</span><br />
                <span>Don't have an account?</span>
                <Button variant="contained" size="large" color="secondary" type="submit" id="registerButton" className="buttons" value="Register" onClick={()=>{window.location.href = '/register'}}>Register</Button><br />
                <Button size="large" onClick={()=>{window.location.href = '/forgotpassword'}}>Forgot Password?</Button>
          </Grid>
     </div>
    );
};

export default Login;