
import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	ScrollView,
	Text,
	TouchableOpacity,
	ToastAndroid,
	Picker,
	Button,
	View
} from 'react-native';
import { Counter } from './counter';
import BluetoothSerial from 'react-native-bluetooth-serial';
import { Actions } from 'react-native-router-flux';
import modes from '../modes.json';
import SettingsScrollView from './SettingsScrollView';

const Item = Picker.Item;

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
		BluetoothSerial.on('error', (err) => {
			ToastAndroid.show(`Error: ${err.message}`, TOASTLENGTH)
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
		this.setState({ currentMode: mode, settings: JSON.parse(JSON.stringify(modes.modes[mode].settings)) });
		this.sendMessage(`MODE ${mode}\r\n`);
	}

	changeSetting(number, value) {
		var state = JSON.parse(JSON.stringify(this.state));
		state.settings[number].value = value;
		this.setState(state);
	}

	sendAction() {
		this.sendMessage('ACTION\r\n');
	}

	sendSettings() {
		//send
		this.state.settings.forEach((s) => {
			let serialString = `CONFIGURE ${s.id} ${s.value}\r\n`;
			this.sendMessage(serialString);
		});
	}

	sendMessage(msg) {
		console.log(msg);
		BluetoothSerial.write(msg).catch(() => {
			ToastAndroid.show(`Failed: ${err.message}`);
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<Picker mode="dialog" style={ styles.picker }
					selectedValue={ this.state.currentMode }
					onValueChange={ this.changeMode.bind(this) }
				>
					{ modes.modes.map((m) => this.modeItem(m)) }
				</Picker>
				<Button style={ styles.actionButton } title="Action" onPress={ this.sendAction.bind(this)} />
				<SettingsScrollView cb={this.changeSetting.bind(this)} settings={ this.state.settings } />
				<Button style={ styles.actionButton } title="Send" onPress={ this.sendSettings.bind(this) } />
				<Button style={ styles.actionButton } title="State" onPress={ () => { console.log(JSON.stringify(this.state)) } } />

			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'stretch',
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
		marginBottom: 15
	},
	item: {
		textAlign: 'center',
		borderColor: '#d3d3d3',
		borderWidth: 1,
		padding: 5,
		margin: 5
	},
	picker: {
		marginTop: 50
	},
	actionButton: {
	}
});

