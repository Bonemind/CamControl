
import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	ScrollView,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import { Counter } from './counter';
import BluetoothSerial from 'react-native-bluetooth-serial';
import { Actions } from 'react-native-router-flux';


export default class DeviceSelect extends Component {
	constructor(props) {
		super(props);
		this.state = { devices: [] }
		this.c = 0;
	}

	createItem(item) {
		this.c = this.c + 1;
		return (
			<TouchableOpacity key={this.c} onPress={() => this.deviceSelected(item.id)}>
				<Text style={ styles.item } key={item.id}>
					{item.name}
				</Text>
			</TouchableOpacity>
		);
	}

	deviceSelected(id) {
		Actions.controlScene({ deviceId: id });
	}

	componentWillMount() {
		BluetoothSerial.on('bluetoothEnabled', () => {this.updateDevices()});
	}

	componentDidMount() {
		console.log('42');
		BluetoothSerial.isEnabled()
		.then((val) => {
			if (!val) {
				return BluetoothSerial.requestEnable();
			}
		}).then(() => {
			this.updateDevices();
		});
	}

	updateDevices() {
		BluetoothSerial.list().then((devs) => {
			this.setState({devices: devs});
		});
	}

	render() {
		return (
			<View style={styles.container}>
			<ScrollView style={ styles.scrollview }>
				{this.state.devices.map(this.createItem.bind(this))}
			</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'stretch',
		backgroundColor: '#616161',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	scrollview: {
		marginTop: 15,
		backgroundColor: '#616161',
	},
	item: {
		textAlign: 'center',
		borderColor: '#BDBDBD',
		color: '#F5F5F5',
		borderWidth: 1,
		padding: 5,
		margin: 5
	},
});

