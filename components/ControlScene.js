
import React, { Component } from 'react';
import {
	StyleSheet,
	ToastAndroid,
	Picker,
	Button,
	View
} from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-serial';
import { Actions } from 'react-native-router-flux';
import modes from '../modes.json';
import SettingsScrollView from './SettingsScrollView';

// Store reference to picker item
const Item = Picker.Item;

// How long our toasts last
const TOASTLENGTH = 3;

export default class ControlScene extends Component {
	state = {
		currentMode: 0,
		settings: []
	}

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		// Register some feedback message handlers
		BluetoothSerial.on('error', (err) => {
			ToastAndroid.show(`Error: ${err.message}`, TOASTLENGTH)
			Actions.pop();
		});
		BluetoothSerial.on('connectionLost', () => {
			ToastAndroid.show('Connection to device has been lost', TOASTLENGTH)
			Actions.pop();
		});
		BluetoothSerial.on('bluetoothDisabled', () => {
			ToastAndroid.show('Blueooth disabled', TOASTLENGTH)
			Actions.pop();
		});
	}

	componentDidMount() {
		// Connect to device
		BluetoothSerial.connect(this.props.deviceId)
		.then((res) => {
			ToastAndroid.show('Connected to device', TOASTLENGTH);
			this.changeMode(0);
			this.sendSettings();
		})
		.catch((err) => {
			ToastAndroid.show(`Failed to connect: ${ err.message }`, TOASTLENGTH)
			Actions.pop();
		});
	}
	
	componentWillUnmount() {
		// Handle disconnect when navigating away
		BluetoothSerial.disconnect()
		.then(() => {
			ToastAndroid.show('Disconnected', TOASTLENGTH);
		}).catch((err) => {
			ToastAndroid.show(`Failed to disconnect: ${err.message}`, TOASTLENGTH);
		});
	}

	modeItem(mode) {
		// Draws a mode item
		return (
			<Item label={ mode.name } key={ mode.id } value={ mode.id } />
		);
	}

	changeMode(mode) {
		// Handles changing of mode
		this.setState({ currentMode: mode, settings: JSON.parse(JSON.stringify(modes.modes[mode].settings)) });
		this.sendMessage(`MODE ${mode}`);
	}

	changeSetting(number, value) {
		// Handles the storing of a setting value change
		// Callback passed down to child elements
		var state = JSON.parse(JSON.stringify(this.state));
		state.settings[number].value = value;
		this.setState(state);
	}

	sendAction() {
		// Sends ACTION to camera controller
		this.sendMessage('ACTION');
	}

	sendSettings() {
		// Sends settings to camera controller
		this.state.settings.forEach((s) => {
			let serialString = `CONFIGURE ${s.id} ${s.value}`;
			this.sendMessage(serialString);
		});
	}

	sendMessage(msg) {
		// Actually sends the message
		// Message is logged for debug purposes
		console.log(msg);
		// Linefeed is added because it's expected as a delimiter in the arduino code
		BluetoothSerial.write(msg + '\r\n').catch(() => {
			ToastAndroid.show(`Failed: ${err.message}`);
		});
	}

	render() {
		// Render modepicker, settings display and action and send buttons
		return (
			<View style={styles.container}>
				<Picker mode="dropdown" style={ styles.picker }
					selectedValue={ this.state.currentMode }
					onValueChange={ this.changeMode.bind(this) }
				>
					{ modes.modes.map((m) => this.modeItem(m)) }
				</Picker>
				<Button color='#757575' title="Action" onPress={ this.sendAction.bind(this)} />
				<SettingsScrollView cb={this.changeSetting.bind(this)} settings={ this.state.settings } />
				<View style={ styles.sendButton }>
					<Button style={ styles.sendButton } color='#757575' title="Send" onPress={ this.sendSettings.bind(this) } />
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'stretch',
		backgroundColor: '#616161'
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	item: {
		textAlign: 'center',
		borderColor: '#d3d3d3',
		borderWidth: 1,
		padding: 5,
		margin: 5
	},
	picker: {
		marginTop: 50,
		color: '#F5F5F5',
		marginLeft: 5
	},
	sendButton: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0
	}
});

