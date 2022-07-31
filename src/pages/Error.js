import { Link } from "react-router-dom";

function Error()
{
    return (
        <center>
            <h2>Unable to Connect to Server.</h2>
            <b>Go back to <Link to="/">Login</Link></b>
        </center>
    );
}
export default Error;