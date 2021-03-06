/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet
} from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import DeviceSelect from './components/DeviceSelect';
import ControlScene from './components/ControlScene';

export default class camcontrol extends Component {
	render() {
		// Setup routing
		// Start at the select deice screen
		return (
			<Router style = {styles.container } navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} barButtonTextStyle={styles.barButtonTextStyle} barButtonIconStyle={styles.barButtonIconStyle}>
				<Scene key="root">
					<Scene key="deviceSelect" component={DeviceSelect} title="Select device" initial={ true } />
					<Scene key="controlScene" component={ControlScene} title="Control device" />
				</Scene>
			</Router>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	navBar: {
		    backgroundColor:'#607D8B',
	},
	navBarTitle:{
		    color:'#F5F5F5'
	},
	barButtonTextStyle:{
		    color:'#F5F5F5'
	},
	barButtonIconStyle:{
		    tintColor:'rgb(255,255,255)'
	}
});
AppRegistry.registerComponent('camcontrol', () => camcontrol);
