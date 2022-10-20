import React, { useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";


const Login = () => {
    const email = useRef();
    const password = useRef();

    const login = (e) => {
        e.preventDefault();
        console.log(email.current.value);
        console.log(password.current.value);

        axios.post('http://dummy-api.d0.acom.cloud/api/auth/login', {
            email: email.current.value,
            password: password.current.value
          })
          .then(function (response) {
            console.log(response.data.access_token);
            Cookies.set("token", response.data.access_token)
          })
    }

    return (
        <div className="login">
            <form>
                <span>Hi, let's log in</span>
                <input type="email" ref={email} placeholder="Email" />
                <input type="password" ref={password} placeholder="Password" />
                <input type="submit" value="Login" onClick={login} />
            </form>
        </div>
    )
}

export default Login;