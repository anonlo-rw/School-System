import { Link } from "react-router-dom";

function NotFound() {
    return (
        <center>
            <h2>Page Not Found</h2>
            <h5>Go Back to <Link to="/">Login</Link></h5>
        </center>
    );
}
export default NotFound;