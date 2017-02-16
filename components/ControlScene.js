
import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	ScrollView,
	Text,
	TouchableOpacity,
	ToastAndroid,
	Picker,
	View
} from 'react-native';
import { Counter } from './counter';
import BluetoothSerial from 'react-native-bluetooth-serial';
import { Actions } from 'react-native-router-flux';
import modes from '../modes.json';

const Item = Picker.Item;

const TOASTLENGTH = 3;

export default class ControlScene extends Component {
	state = {
		currentMode: 0
	}
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		BluetoothSerial.on('error', (err) => {
			ToastAndroid.show(`Error: ${err.message}`, 3)
		});
		BluetoothSerial.on('connectionLost', () => {
			ToastAndroid.show('Connection to device has been lost', TOASTLENGTH)
		})
	}

	componentDidMount() {
		return;
		ToastAndroid.show(this.props.deviceId, TOASTLENGTH);
		BluetoothSerial.connect(this.props.deviceId)
		.then((res) => {
			ToastAndroid.show('Connected to device');
		})
		.catch((err) => {
			ToastAndroid.show(`Failed to connect: ${ err.message }`, TOASTLENGTH)
			Actions.pop();
		});
	}
	
	componentWillUnmount() {
		BluetoothSerial.disconnect()
		.then(() => {
			ToastAndroid.show('Disconnected', TOASTLENGTH);
		}).catch((err) => {
			ToastAndroid.show(`Failed to disconnect: ${err.message}`, TOASTLENGTH);
		});
	}

	modeItem(mode) {
		return (
			<Item label={ mode.name } key={ mode.id } value={ mode.id } />
		);
	}

	changeMode(mode) {
		this.setState({ currentMode: mode });
		//blahblah write
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>
					{ this.props.deviceId }
				</Text>
				<Picker mode="dialog" style={ styles.picker }
					selectedValue={ this.state.currentMode }
					onValueChange={ this.changeMode.bind(this) }
				>
					{ modes.modes.map((m) => this.modeItem(m)) }
				</Picker>
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
	picker: {
		width: 100
	},
});

