
import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	ScrollView,
	Text,
	View
} from 'react-native';
import { Counter } from './counter';
import BluetoothSerial from 'react-native-bluetooth-serial';
import { Actions } from 'react-native-router-flux';
import SettingsScrollViewItem from './SettingsScrollViewItem';

export default class SettingsScrollView extends Component {
	renderSettings() {
		let is = [];
		this.props.settings.forEach((s) => {
			is.push((<SettingsScrollViewItem cb={this.props.cb} setting={s} key={s.id} />));
		});
		return is;
	}

	render() {
		return (
			<View>
				<ScrollView style={ styles.scrollview }>
					{this.renderSettings()}
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
