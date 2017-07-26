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

// @flow

'use strict';

import React from 'react';

import { View, Text } from 'BaseComponents';
import { StyleSheet, Dimensions, Animated } from 'react-native';
import ExtraDimensions from 'react-native-extra-dimensions-android';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

let statusBarHeight = ExtraDimensions.get('STATUS_BAR_HEIGHT');
let stackNavHeaderHeight = deviceHeight * 0.1;
let deviceIconCoverHeight = (deviceHeight * 0.2);
let tabViewHeaderHeight = (deviceHeight * 0.09);
let totalTop = statusBarHeight + stackNavHeaderHeight + deviceIconCoverHeight + tabViewHeaderHeight;
let screenSpaceRemaining = deviceHeight - totalTop;

class DeviceHistoryDetails extends View {
	constructor(props) {
		super(props);
		this.state = {

		};
		this.animatedYValue = new Animated.Value(-screenSpaceRemaining);
	}

	openAnimation() {
		Animated.timing(this.animatedYValue,
			{
				toValue: 0,
				duration: 500,
			}).start();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.showDetails && !this.props.showDetails) {
			this.openAnimation();
		}
		if (!nextProps.showDetails && this.props.showDetails) {
			this.closeAnimation();
		}
	}

	closeAnimation() {
		Animated.timing(this.animatedYValue,
			{
				toValue: -screenSpaceRemaining,
				duration: 500,
			}).start();
	}

	render() {
		let YAnimatedValue = this.animatedYValue.interpolate({
			inputRange: [-screenSpaceRemaining, 0],
			outputRange: [-screenSpaceRemaining, 0],
		});
		return (
			<Animated.View style={[styles.container, { transform: [{ translateY: YAnimatedValue }] }]}>
				<View style={styles.titleTextCover}>
					<Text style={styles.titleText}>
						Details
					</Text>
				</View>
				<View style={styles.detailsConatiner}>
					<View style={styles.detailsRow}>
						<View style={styles.detailsLabelCover}>
							<Text style={styles.detailsLabel}>
								State
							</Text>
						</View>
						<View style={styles.detailsValueCover}>
							<Text style={styles.detailsText}>
								{this.props.detailsData.state === 1 ? 'ON' : 'OFF'}
							</Text>
						</View>
					</View>
					<View style={styles.detailsRow}>
						<View style={styles.detailsLabelCover}>
							<Text style={styles.detailsLabel}>
								Time
							</Text>
						</View>
						<View style={styles.detailsValueCover}>
							<Text style={styles.detailsText}>
							</Text>
						</View>
					</View>
					<View style={styles.detailsRow}>
						<View style={styles.detailsLabelCover}>
							<Text style={styles.detailsLabel}>
								Origin
							</Text>
						</View>
						<View style={styles.detailsValueCover}>
							<Text style={styles.detailsText} numberOfLines={1}>
								{this.props.detailsData.origin}
							</Text>
						</View>
					</View>
					<View style={styles.detailsRow}>
						<View style={styles.detailsLabelCover}>
							<Text style={styles.detailsLabel}>
								Status
							</Text>
						</View>
						<View style={styles.detailsValueCover}>
							<Text style={styles.detailsText}>
							</Text>
						</View>
					</View>
				</View>
			</Animated.View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: 'absolute',
		backgroundColor: '#E5E7E9',
		width: deviceWidth,
		height: screenSpaceRemaining,
	},
	titleTextCover: {
		width: deviceWidth,
		height: deviceHeight * 0.09,
		borderBottomWidth: 1,
		borderBottomColor: '#A59F9A',
		justifyContent: 'flex-end',
	},
	titleText: {
		marginLeft: 10,
		color: '#A59F9A',
		fontSize: 16,
	},
	detailsConatiner: {
		backgroundColor: '#ffffff',
		alignItems: 'center',
		justifyContent: 'flex-end',
		flexDirection: 'column',
		height: Math.floor(deviceHeight * 0.09 * 4),
		width: deviceWidth,
	},
	detailsRow: {
		flexDirection: 'row',
		width: deviceWidth,
		height: deviceHeight * 0.09,
		borderBottomWidth: 1,
		borderBottomColor: '#A59F9A',
		alignItems: 'center',
		justifyContent: 'center',
	},
	detailsLabelCover: {
		alignItems: 'flex-start',
		width: deviceWidth / 2,
	},
	detailsLabel: {
		marginLeft: 10,
		fontSize: 16,
		color: '#4C4C4C',
	},
	detailsValueCover: {
		alignItems: 'flex-end',
		width: deviceWidth / 2,
	},
	detailsText: {
		marginRight: 15,
		color: '#A59F9A',
		fontSize: 16,
	},
});

export default DeviceHistoryDetails;
