import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Button
} from 'react-native';

export class Increment extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View>
				<Button onPress = { this.props.cb } title="Increment" />
			</View>
		);
	}
}
