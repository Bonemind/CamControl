
import React, { Component } from 'react';
import {
	TimePickerAndroid,
	AppRegistry,
	StyleSheet,
	ScrollView,
	Text,
	TextInput,
	View
} from 'react-native';
import { Counter } from './counter';
import BluetoothSerial from 'react-native-bluetooth-serial';
import { Actions } from 'react-native-router-flux';

export default class SettingsScrollViewItem extends Component {
	state = { value: 0 }
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.state = { value: this.props.setting.value };
	}
	
	renderInput() {
		return this.renderMsInput();
	}
	
	renderMsInput() {
		// Renders input
		// When value is changed the passed props.cb is used to update it upstream
		return (
			<TextInput
				onChangeText={(text) => {
						if (text == '') {
							return;
						}
						this.setState({ value: text})
						this.props.cb(this.props.setting.id, text);
					}
				}
				style={ styles.input }
				keyboardType="numeric"
				underlineColorAndroid="#F5F5F5"
				value={this.state.value + ''}
			/>
		);
	}

	render() {
		return (
			<View>
				<Text style={ styles.text }>
					{this.props.setting.name}
				</Text>
				{this.renderInput()}
			</View>
		);
	}
}

const styles = {
	text: {
		marginLeft: 5,
		color: '#F5F5F5',
	},
	input: {
		color: '#F5F5F5',
	}
}
