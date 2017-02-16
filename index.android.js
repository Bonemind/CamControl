/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View
} from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import { Testscene } from './components/testscene';
import DeviceSelect from './components/DeviceSelect';
import ControlScene from './components/ControlScene';

export default class camcontrol extends Component {
	render() {
		return (
			<Router style = {styles.container }>
				<Scene key="root">
					<Scene key="deviceSelect" component={DeviceSelect} title="deviceSelect" initial={ true } />
					<Scene key="controlScene" component={ControlScene} title="controlScene" />
				</Scene>
			</Router>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
AppRegistry.registerComponent('camcontrol', () => camcontrol);
