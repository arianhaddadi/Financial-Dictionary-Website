import React from 'react';
import Header from './Header.js';
import {Router, Route} from "react-router-dom";
import Home from '../Home/Home';
import Contact from '../Contact/Contact';
import Book from '../Book/Books';
import Authors from '../Authors/Authors'; 
import Suggest from '../Suggest/Suggest';
import Apps from '../Apps/Apps';
import history from './history';
import './style/App.scss';


class App extends React.Component {

    componentDidMount() {
        if (history.location.pathname === "/") {
            history.push("/home")
        }
        history.listen(() => {
            if (history.location.pathname === "/") {
                history.push("/home")
            }
        })
    }

    render() {
        return (
            <>
                <Header history={history}/>
                <div className={`search-section active-cyan-3 active-cyan-4 mb-4`}>
                    <Router history={history}>
                        <Route path="/home" exact component={Home} />
                        <Route path="/home/:word" exact component={Home} />
                        <Route path="/contact" exact component={Contact} />
                        <Route path="/book" exact component={Book} />
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
