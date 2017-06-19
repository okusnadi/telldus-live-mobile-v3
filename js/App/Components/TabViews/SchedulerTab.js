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
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { List, ListDataSource, View, Text, I18n } from 'BaseComponents';
import { JobRow } from 'TabViews/SubViews';
import { getJobs } from 'Actions';
import Theme from 'Theme';

import moment from 'moment-timezone';

import { parseJobsForListView } from 'Reducers/Jobs';

import { Image, Dimensions } from 'react-native';
import { syncWithServer, switchTab } from 'Actions';
import getTabBarIcon from '../../Lib/getTabBarIcon';

const daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

class SchedulerTab extends View {

	static navigationOptions = {
		title: I18n.t('pages.scheduler'),
		tabBarIcon: ({ focused, tintColor }) => getTabBarIcon(focused, tintColor, 'scheduler'),
	};

	constructor(props) {
		super(props);

		const { sections, sectionIds } = this.props.rowsAndSections;

		this.state = {
			dataSource: new ListDataSource({
				rowHasChanged: this.rowHasChanged,
				sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
			}).cloneWithRowsAndSections(sections, sectionIds),
		};

		this.windowHeight = Dimensions.get('window').height;
		this.windowWidth = Dimensions.get('window').width;
		this.addButtonSize = this.windowWidth * 0.134666667;
		this.addButtonOffset = this.windowWidth * 0.034666667;
		this.addButtonTextSize = this.windowWidth * 0.056;

		this.styles = {
			container: {
				flex: 1,
			},
			header: {
				paddingTop: 20,
				backgroundColor: Theme.Core.brandPrimary,
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				maxHeight: this.windowHeight * 0.095952024,
			},
			logo: {
				width: this.windowWidth * 0.277333333,
				height: this.windowHeight * 0.026236882,
			},
			addButton: {
				backgroundColor: Theme.Core.brandSecondary,
				borderRadius: 50,
				position: 'absolute',
				height: this.addButtonSize,
				width: this.addButtonSize,
				bottom: this.addButtonOffset,
				right: this.addButtonOffset,
				shadowColor: '#000',
				shadowOpacity: 0.5,
				shadowRadius: 2,
				shadowOffset: {
					height: 2,
					width: 0,
				},
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
			},
			iconPlus: {
				width: this.addButtonTextSize,
				height: this.addButtonTextSize,
			},
		};

		this.renderRow = this.renderRow.bind(this);
		this.renderSectionHeader = this.renderSectionHeader.bind(this);
		this.onRefresh = this.onRefresh.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		const { sections, sectionIds } = nextProps.rowsAndSections;

		this.setState({
			dataSource: this.state.dataSource.cloneWithRowsAndSections(sections, sectionIds),
		});
	}

	componentDidMount() {
		this.props.onTabSelect('schedulerTab');
	}

	onRefresh() {
		this.props.dispatch(getJobs());
	}

	rowHasChanged(r1, r2) {
		if (r1 === r2) {
			return false;
		}
		return (
			r1.effectiveHour !== r2.effectiveHour ||
			r1.effectiveMinute !== r2.effectiveMinute ||
			r1.method !== r2.method ||
			r1.deviceId !== r2.deviceId
		);
	}

	handleAddingSchedule = () => {
		//this.props.navigator.push({
		//	title: 'Telldus',
		//	component: AddSchedule.Action,
		//	navigationBarHidden: false,
		//});
	};

	// TODO: make component
	renderHeader() {
		return (
			<View style={this.styles.header}>
				<Image source={require('./img/telldus-logo@3x.png')} style={this.styles.logo}/>
			</View>
		);
	}

	render() {
		return (
			<View style={this.styles.container}>
				{this.renderHeader()}
				<List
					dataSource={this.state.dataSource}
					renderRow={this.renderRow}
					renderSectionHeader={this.renderSectionHeader}
					onRefresh={this.onRefresh}
				/>
				<View style={this.styles.addButton}>
					<Image source={require('./img/iconPlus.png')} style={this.styles.iconPlus}/>
				</View>
			</View>
		);
	}

	renderSectionHeader(sectionData, sectionId) {
		// TODO: move to own Component
		const todayInWeek = parseInt(moment().format('d'), 10);
		const absoluteDayInWeek = (todayInWeek + sectionId) % 7;

		let sectionName;
		if (sectionId === 0) {
			sectionName = 'Today';
		} else if (sectionId === 1) {
			sectionName = 'Tomorrow';
		} else if (sectionId === 7) {
			sectionName = `Next ${daysInWeek[todayInWeek]}`;
		} else {
			sectionName = daysInWeek[absoluteDayInWeek];
		}

		return (
			<View style={Theme.Styles.sectionHeader}>
				<Text style={Theme.Styles.sectionHeaderText}>
					{sectionName}
				</Text>
			</View>
		);
	}

	renderRow(props) {
		return (
			<JobRow {...props} />
		);
	}
}

SchedulerTab.propTypes = {
	rowsAndSections: React.PropTypes.object,
};

const getRowsAndSections = createSelector(
	[
		({ jobs }) => jobs,
		({ gateways }) => gateways,
		({ devices }) => devices,
	],
	(jobs, gateways, devices) => {
		const { sections, sectionIds } = parseJobsForListView(jobs, gateways, devices);
		return {
			sections,
			sectionIds,
		};
	}
);

function mapStateToProps(store) {
	return {
		rowsAndSections: getRowsAndSections(store),
		devices: store.devices,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		onTabSelect: (tab) => {
			dispatch(syncWithServer(tab));
			dispatch(switchTab(tab));
		},
		dispatch,
	};
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(SchedulerTab);
