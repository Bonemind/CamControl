import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native';

export class Counter extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View>
				<Text>{ this.props.count }</Text>
			</View>
		);
	}
}
