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
import HeaderImage from './HeaderImage';
import { Button } from 'react-native';

class Action extends View {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				<HeaderImage
					h1="2. Action"
					h2="Choose an action to execute"
					goBack={this.props.navigation.goBack}
				/>
				<Button title="Time" onPress={() => this.props.navigation.navigate('Time')}/>
			</View>
		);
	}
}

module.exports = Action;