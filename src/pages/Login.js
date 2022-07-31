import { post } from "jquery";
import { useHistory } from "react-router-dom";
import LoginImage from "../images/LoginImage.jpg";

function Login()
{
    const redirect = useHistory();
    const ServerIP = window.location.host.split(":")[0];

    const handleLogin = () => {
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;

        post(`http://${ServerIP}/php/login.php?username=${username}&password=${password}`,
        function(response) {
            if (response === "success") {
                redirect.push("/system");
            } else {
                document.getElementById("result").innerHTML = response;
            }
        });
    }

    return (
        <div className="prompt my-4">
            <div className="card mx-auto" style={{width: "20rem"}}><br/>
                <img className="card-img-top mx-auto" src={LoginImage} style={{width: "80%",height: "250px"}} alt="Login"/>
                
                <div className="card-body">
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" id="username" className="form-control"/>
                    </div><br/>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" id="password" className="form-control"/>
                    </div>
                    <div id="result" style={{color:"red"}}/><br/>

                    <div className="d-flex flex-row" style={{gap: "8px"}}>
                        <button onClick={() => handleLogin()} className="btn btn-success">Login</button>
                        <button onClick={() => redirect.push("/register")} className="btn btn-warning">Register</button>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
export default Login;