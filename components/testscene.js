
import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ClockComponent } from './clock';
import { Increment } from './increment';
import { Counter } from './counter';

export class Testscene extends Component {
	constructor(props) {
		super(props);
		this.state = { counter: 0 }
	}

	increment() {
		this.setState(() => { return { counter: this.state.counter + 1 } });
	}

	render() {
		return (
			<View style={styles.container}>
			<Text style={styles.welcome}>
			Welcome to React Native!
			</Text>
			<Text style={styles.instructions}>
			To get started, edit index.android.js
			</Text>
			<Text style={styles.instructions}>
			Double tap R on your keyboard to reload,{'\n'}
			Shake or press menu button for dev menu
				Blahblah
			</Text>
			<ClockComponent name="Blah"></ClockComponent>
			<Increment cb = { this.increment.bind(this) }></Increment>
			<Counter count = { this.state.counter }></Counter>
			<Increment cb = { Actions.deviceSelect }></Increment>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
});

