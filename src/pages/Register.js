import { post } from "jquery";
import { useHistory } from 'react-router-dom';
import RegistrationImage from "../images/RegistrationImage.jpg";

function Login()
{
    const redirect = useHistory();
    const ServerIP = window.location.host.split(":")[0];

    const handleRegister = () => {
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        let confirm = document.getElementById("confirm").value;
        let result = document.getElementById("result");

        result.style.color = "red";
        if (username.length < 4 || password.length < 4) {
            result.innerHTML = "Username/Password must be greater than 3 Characters";
            return;
        }
        else if (password !== confirm) {
            result.innerHTML = "Passwords do not Match";
            return;
        
        } post(`http://${ServerIP}/php/register.php?username=${username}&password=${password}`,
        function(response) {
            if (response === "registered") {
                result.style.color = "green";
                result.innerHTML = "Account has been Registered";
            } else {
                document.getElementById("result").innerHTML = response;
            }
        });
    }

    return (
        <div className="prompt my-4">
            <div className="card mx-auto" style={{width: "20rem"}}><br/>
                <img className="card-img-top mx-auto" src={RegistrationImage} style={{width: "80%",border: "1px solid black"}} alt="Login"/>
                
                <div className="card-body">
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" id="username" className="form-control"/>
                    </div><br/>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" id="password" className="form-control"/>
                    </div><br/>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input type="password" id="confirm" className="form-control"/>
                    </div>
                    <div id="result"/><br/>

                    <div className="d-flex flex-row" style={{gap: "8px"}}>
                        <button onClick={() => handleRegister()} className="btn btn-warning">Register Account</button>
                        <button onClick={() => redirect.push("/")} className="btn btn-success">Back to Login</button>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
export default Login;