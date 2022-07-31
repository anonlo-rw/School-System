import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import System from "./pages/System";
import Unauthorized from "./pages/Unauthorized";
import Error from "./pages/Error";
import NotFound from "./pages/NotFound";

function App()
{
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/system" component={System}/>
                <Route path="/unauthorized" component={Unauthorized}/>
                <Route path="/error" component={Error}/>
                <Route component={NotFound}/>
            </Switch>
        </Router>
    );
}
export default App;