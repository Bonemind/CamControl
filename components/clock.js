import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native';
import { Counter } from './counter';

export class ClockComponent extends Component {
	constructor(props) {
		super(props);
		this.state = { counter: 0 };
	}

	componentDidMount() {
		this.timerId = setInterval(() => {
			this.setState((prevstate) => { return { counter: prevstate.counter + 1 } });
		}, 1000);
	}

	componentWillUnmount() {
		clearInterval(this.timerId);
	}

	render() {
		return (
			<View>
				<Text>I am Clockcounter</Text>
				<Counter count={ this.state.counter }></Counter>
			</View>
		);
	}
}
