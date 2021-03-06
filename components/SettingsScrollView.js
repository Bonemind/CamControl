
import React, { Component } from 'react';
import {
	StyleSheet,
	ScrollView,
	View
} from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-serial';
import { Actions } from 'react-native-router-flux';
import SettingsScrollViewItem from './SettingsScrollViewItem';

export default class SettingsScrollView extends Component {
	renderSettings() {
		// Renders all settings elements
		let is = [];
		this.props.settings.forEach((s) => {
			is.push((<SettingsScrollViewItem cb={this.props.cb} setting={s} key={s.id} />));
		});
		return is;
	}

	render() {
		return (
			<View style={ styles.wrapper }>
				<ScrollView style={ styles.scrollview }>
					{this.renderSettings()}
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	wrapper: {
		marginBottom: 150
	},
	scrollview: {
		marginTop: 15,
		backgroundColor: '#616161'
	},
});
