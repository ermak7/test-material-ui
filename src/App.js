import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Switch, withRouter} from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SearchIcon from '@material-ui/icons/Search';

import './App.css';
import Main from './pages/main';
import Search from './pages/search';
import Favorite from './pages/favorite';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 0,
            favorite: props.favorite.items,
        };
    }

    componentWillMount() {
        this.updateMenu(this.props);
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            this.updateMenu(nextProps);
        }
    }

    updateMenu(nextProps) {
        let page = 0;
        switch (nextProps.location.pathname) {
            case '/':
            default:
                page = 0;
                break;
            case '/search':
                page = 1;
                break;
            case '/favorite':
                page = 2;
                break;
        }

        this.setState({value: page});
    }

    render() {
        return (
            <div className="App">
                <BottomNavigation
                    value={this.state.value}
                    onChange={(event, newValue) => {
                        this.setState({value: newValue});
                    }}
                    showLabels
                    className={'navigation'}
                >
                    <BottomNavigationAction label="Home" icon={<HomeIcon/>} component={Link} to="/"/>
                    <BottomNavigationAction label="Find" icon={<SearchIcon/>} component={Link} to="/search"/>
                    <BottomNavigationAction label="Favorites" icon={<FavoriteIcon/>} component={Link} to="/favorite"/>
                </BottomNavigation>
                <Switch>
                    <Route path="/search" component={() => <Search/>}/>
                    <Route path="/favorite" component={() => <Favorite/>}/>
                    <Route path="/" render={() => <Main/>}/>
                </Switch>
            </div>
        );
    }
}

export default withRouter(connect(
    (state) => ({
        favorite: state.favorite,
    }),
    dispatch => ({})
)(App));