
import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	ScrollView,
	Text,
	TouchableOpacity,
	ToastAndroid,
	View
} from 'react-native';
import { Counter } from './counter';
import BluetoothSerial from 'react-native-bluetooth-serial';
import { Actions } from 'react-native-router-flux';

export default class ControlScene extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		BluetoothSerial.on('error', (err) => console.log(`Error: ${err.message}`))
		BluetoothSerial.on('connectionLost', () => {
			ToastAndroid.show('Connection to device has been lost', 1.1)
		})
	}

	componentDidMount() {
		return;
		ToastAndroid.show(this.props.deviceId, 2.2);
		BluetoothSerial.connect(this.props.deviceId)
		.then((res) => {
			ToastAndroid.show('Connected to device');
		})
		.catch((err) => {
			ToastAndroid.show(`Failed to connect: ${ err.message }`, 1.1)
			Actions.pop();
		});
	}

	render() {
		return (
			<View style={styles.container}>
			<Text style={styles.welcome}>
				{ this.props.deviceId }
			</Text>
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
	scrollview: {
		marginTop: 15,
		backgroundColor: '#F5FCFF',
	},
	item: {
		textAlign: 'center',
		borderColor: '#d3d3d3',
		borderWidth: 1,
		padding: 5,
		margin: 5
	},
});

