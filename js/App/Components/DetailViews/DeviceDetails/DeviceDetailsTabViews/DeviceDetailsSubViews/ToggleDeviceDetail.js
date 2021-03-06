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
 */

'use strict';

import React from 'react';

import { RoundedCornerShadowView, View } from 'BaseComponents';
import { StyleSheet, Dimensions } from 'react-native';
import { OnButton, OffButton } from 'TabViews_SubViews';

const deviceHeight = Dimensions.get('window').height;

const ToggleButton = ({ device }) => {
	return (
		<RoundedCornerShadowView style={styles.toggleContainer}>
			<OffButton id={device.id} isInState={device.isInState} fontSize={16} style={styles.turnOff} methodRequested={device.methodRequested} />
			<OnButton id={device.id} isInState={device.isInState} fontSize={16} style={styles.turnOn} methodRequested={device.methodRequested} />
		</RoundedCornerShadowView>
	);
};

type Props = {
	device: Object,
};

class ToggleDeviceDetailModal extends View {
	props: Props;

	constructor(props: Props) {
		super(props);
	}

	render() {
		const { device } = this.props;
		const { TURNON, TURNOFF } = device.supportedMethods;
		let toggleButton = null;

		if (TURNON || TURNOFF) {
			toggleButton = <ToggleButton device={device} onTurnOn={this.onTurnOn} onTurnOff={this.onTurnOff}/>;
		}

		return (
			<View style={styles.container}>
				<View style={[styles.toggleButtonContainer, styles.shadow]}>
					{toggleButton}
				</View>
			</View>
		);
	}

}

ToggleDeviceDetailModal.propTypes = {
	device: React.PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
	container: {
		flex: 0,
	},
	toggleButtonContainer: {
		flex: 0,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff',
		marginTop: 20,
		height: (deviceHeight * 0.2),
	},
	shadow: {
		borderRadius: 4,
		backgroundColor: '#fff',
		shadowColor: '#000000',
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowRadius: 1,
		shadowOpacity: 1.0,
		elevation: 2,
	},
	toggleContainer: {
		flexDirection: 'row',
		height: 36,
		marginHorizontal: 8,
		marginVertical: 16,
	},
	turnOff: {
		flex: 1,
		alignItems: 'stretch',
		borderTopLeftRadius: 7,
		borderBottomLeftRadius: 7,
	},
	turnOn: {
		flex: 1,
		alignItems: 'stretch',
		borderTopRightRadius: 7,
		borderBottomRightRadius: 7,
	},
});

module.exports = ToggleDeviceDetailModal;
