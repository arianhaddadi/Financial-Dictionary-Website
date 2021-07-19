import React from 'react';
import {Router, Route} from "react-router-dom";
import Header from './Header';
import Home from '../Home/Home';
import Contact from '../Contact/Contact';
import Book from '../Book/Books';
import Authors from '../Authors/Authors'; 
import Suggest from '../Suggest/Suggest';
import Apps from '../Apps/Apps';
import AddWord from "../AddWord/AddWord";
import history from './history';
import Login from "../Login/Login";
import './style/App.scss';
import Signup from '../Signup/Signup';


class App extends React.Component {

  componentDidMount() {
    let {pathname} = history.location;
    history.listen(() => {
        pathname = history.location.pathname;
        if (document.cookie === "" && pathname !== "/login" && pathname !== "/signup") {
            history.push("/login");
        }
        else if (document.cookie !== "" && (pathname === "/" || pathname === "/login" || pathname === "/signup")) {
            history.push("/home")
        }
    })
    if (document.cookie === "") {
        history.push("/login");
    }
    else if (pathname === "/" || pathname === "/login" || pathname === "/signup") {
        history.push("/home")
    }
  }

  render() {
    return (
        <>
            <Header history={history}/>
            <div className={`search-section active-cyan-3 active-cyan-4 mb-4`}>
                <Router history={history}>
                    <Route path="/home" exact component={Home} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/signup" exact component={Signup} />
                    <Route path="/home/:word" exact component={Home} />
                    <Route path="/contact" exact component={Contact} />
                    <Route path="/book" exact component={Book} />
                    <Route path="/addword" exact component={AddWord} />
                    <Route path="/authors" exact component={Authors} />
                    <Route path="/suggest" exact component={Suggest} />
                    <Route path="/apps" exact component={Apps} />
                </Router>
            </div> 
        </>
    );
  }
}

export default App;
