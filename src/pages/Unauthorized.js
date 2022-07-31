import { Link } from "react-router-dom";

function Unauthorized()
{
    return (
        <center>
            <h2>Permisson Denied</h2>
            <b>Please <Link to="/">Log In</Link> to use this page</b>
        </center>
    );
}
export default Unauthorized;