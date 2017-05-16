import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router'

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

import {settingsActions} from '../../actions/settingsActions';

import './Menu.scss';

class Menu extends Component {
    constructor(props) {
        super(props);

        this.handleToggle = this.handleToggle.bind(this);
        this.openMainPage = this.openMainPage.bind(this);
    }

    handleToggle() {
        this.props.dispatch(settingsActions.drawerUpdate());
    }

    openGithubPage() {
        window.open('https://github.com/yanislav-igonin/dumpach', '_blank');
    }

    openMainPage() {
        browserHistory.push('/');
        this.props.dispatch(settingsActions.drawerUpdate());
    }

    renderOpenMainPageButton() {
        if(this.props.routing.locationBeforeTransitions.pathname !== '/'){
            return <MenuItem onClick={this.openMainPage}>Main</MenuItem>;
        }
    }

    render() {
        return (
            <div className="menu-container">
                <FlatButton label="Menu" onTouchTap={this.handleToggle}/>
                <Drawer
                    docked={false}
                    open={this.props.settings.drawerOpened}
                    onRequestChange={this.handleToggle}
                >
                    {this.renderOpenMainPageButton()}
                    <MenuItem onClick={this.openGithubPage}>Github</MenuItem>
                </Drawer>
            </div>
        );
    }

}

function mapStateToProps(state, ownProps) {
    return {
        settings: state.settings,
        routing: state.routing
    };
}

export default connect(mapStateToProps)(Menu);