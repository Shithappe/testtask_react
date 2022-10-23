import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [emailError, setEmailError] = useState("Email must not be empty");
    const [passwordError, setPasswordError] = useState("Password must not be empty");

    const emailHandler = (e) => {
        setEmail(e.target.value);
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        !re.test(String(e.target.value).toLocaleLowerCase()) ? setEmailError("Incorrect email") : setEmailError("");
    }
    const passwordHandler = (e) => {
        setPassword(e.target.value);
        !e.target.value.length >= 8 ? setPasswordError("Password must be a 8 charns") : setPasswordError("");
        console.log(e.target.value.length);
    }

    const blurHandler = (e) => {
        switch (e.target.name) {
            case "email":
                setEmailDirty(true);
                break;
            case "password":
                setPasswordDirty(true);
                break;
        }

    }


    const login = (e) => {
        e.preventDefault();

        axios.post('http://dummy-api.d0.acom.cloud/api/auth/login', {
            email,
            password
          })
          .then(function (response) {
            console.log(response.data.access_token);
            Cookies.set("token", response.data.access_token);
            window.location.reload();
          })
    }

    return (
        <div className="login">
            <form>
                <span>Hi, let's log in</span>
                <input onChange={e => emailHandler(e)} onBlur={e => blurHandler(e)} type="email" value={email} name={"email"} placeholder="Email" />
                {(emailDirty && emailError) && <div>{emailError}</div>}
                <input onChange={e => passwordHandler(e)} onBlur={e => blurHandler(e)} type="password" value={password} name={"password"} placeholder="Password" />
                {(passwordDirty && passwordError) && <div>{passwordError}</div>}
                <input type="submit" value="Login" onClick={login} />
            </form>
        </div>
    )
}

export default Login;