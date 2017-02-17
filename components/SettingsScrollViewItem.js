
import React, { Component } from 'react';
import {
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
				keyboardType="numeric"
				value={this.state.value + ''}
			/>
		);
	}

	render() {
		return (
			<View>
				<Text>
					{this.props.setting.name}
					{JSON.stringify(this.props.setting)}
					{JSON.stringify(this.state)}
				</Text>
				{this.renderInput()}
			</View>
		);
	}
}
