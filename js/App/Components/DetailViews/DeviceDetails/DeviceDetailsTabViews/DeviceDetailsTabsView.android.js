/**
 * Copyright 2016-present Telldus Technologies AB.
 *
 * This file is part of the Telldus Live! app.
 *
 * Telldus Live! app is free : you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Telldus Live! app is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Telldus Live! app.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @providesModule DeviceDetailsTabsView
 */

// @flow

'use strict';

import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import ExtraDimensions from 'react-native-extra-dimensions-android';

import { getStore } from '../../../../Store/ConfigureStore';

import { Text, View, Image } from 'BaseComponents';

import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icon_settings from './../../../TabViews/img/selection.json';
const Icon = createIconSetFromIcoMoon(icon_settings);

import DeviceDetailsTabView from 'DeviceDetailsTabView';
import { TabNavigator } from 'react-navigation';
let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

let statusBarHeight = ExtraDimensions.get('STATUS_BAR_HEIGHT');
let stackNavHeaderHeight = deviceHeight * 0.1;
let deviceIconCoverHeight = (deviceHeight * 0.2);
let totalTop = statusBarHeight + stackNavHeaderHeight + deviceIconCoverHeight;
let screenSpaceRemaining = deviceHeight - totalTop;

type Props = {
	dispatch: Function,
	device: Object,
	stackNavigator: Object,
};

type State = {
};

class DeviceDetailsTabsView extends View {
	props: Props;
	state: State;

	goBack: () => void;
	onNavigationStateChange: (Object, Object) => void;
	getRouteName: (Object) => void;

	constructor(props: Props) {
		super(props);
		this.state = {
			currentTab: 'Overview',
		};
		this.goBack = this.goBack.bind(this);
		this.onNavigationStateChange = this.onNavigationStateChange.bind(this);
	}

	goBack() {
		this.props.stackNavigator.goBack();
	}

	getRouteName(navigationState) {
		if (!navigationState) {
			return null;
		}
		const route = navigationState.routes[navigationState.index];
		// dive into nested navigators
		if (route.routes) {
			return this.getRouteName(route);
		}
		return route.routeName;
	}

	onNavigationStateChange(prevState, currentState) {
		const currentScreen = this.getRouteName(currentState);
		this.setState({
			currentTab: currentScreen,
		});
	}

	render() {
		let screenProps = {
			device: this.props.device,
			currentTab: this.state.currentTab,
		};
		return (
			<View style={styles.container}>
				<Image style={styles.deviceIconBackG} resizeMode={'stretch'} source={require('./../../../TabViews/img/telldus-geometric-header-bg.png')}>
					<View style={styles.deviceIconBackground}>
						<Icon name="icon_device_alt" size={36} color={'#F06F0C'} />
					</View>
					<Text style={styles.textDeviceName}>
						{this.props.device.name}
					</Text>
				</Image>
				<View style={{ height: screenSpaceRemaining }}>
					<Tabs screenProps={screenProps} onNavigationStateChange={this.onNavigationStateChange} />
				</View>
			</View>
		);
	}
}
// Might not be the best way, but will work fine, may use till a better solution is found.
function onTabPress(tab) {
	let { dispatch } = getStore();
	dispatch({
		type: 'REQUEST_MODAL_CLOSE',
		payload: {},
	});
}

const styles = StyleSheet.create({
	container: {
	},
	deviceIconBackG: {
		height: (deviceHeight * 0.2),
		width: deviceWidth,
		alignItems: 'center',
		justifyContent: 'center',
	},
	icon: {
		width: 15,
		height: 15,
	},
	textDeviceName: {
		fontSize: 18,
		color: '#fff',
	},
	deviceIconBackground: {
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		width: (deviceHeight * 0.12),
		height: (deviceHeight * 0.12),
		borderRadius: (deviceHeight * 0.06),
	},
});

const Tabs = TabNavigator(
	{
		Overview: {
			screen: DeviceDetailsTabView.Overview,
		},
		History: {
			screen: DeviceDetailsTabView.History,
		},
		Settings: {
			screen: DeviceDetailsTabView.Settings,
		},
	},
	{
		initialRouteName: 'Overview',
		tabBarOptions: {
			indicatorStyle: {
				backgroundColor: '#fff',
			},
			labelStyle: {
				fontSize: Math.round(Dimensions.get('window').width / 35),
			},
			style: {
				backgroundColor: '#fff',
				shadowColor: '#000000',
				shadowOpacity: 1.0,
				elevation: 2,
				height: deviceHeight * 0.085,
				alignItems: 'center',
				justifyContent: 'center',
			},
			tabStyle: {
				width: Dimensions.get('window').width / 3,
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'center',
			},
			iconStyle: {
				width: 25,
				height: 25,
			},
			onTabPress: (tab) => {
				onTabPress(tab);
			},
			swipeEnabled: true,
			lazy: true,
			animationEnabled: true,
			upperCaseLabel: false,
			scrollEnabled: true,
			activeTintColor: '#F06F0C',
			inactiveTintColor: '#A59F9A',
			showIcon: true,
		},
	}
);

function mapStateToProps(store, ownprops) {
	return {
		stackNavigator: ownprops.navigation,
		device: store.devices.byId[ownprops.navigation.state.params.id],
	};
}
function mapDispatchToProps(dispatch) {
	return {
		dispatch,
	};
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(DeviceDetailsTabsView);
