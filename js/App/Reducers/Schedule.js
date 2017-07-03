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
 * @providesModule Reducers_Schedule
 */

// @flow

'use strict';

import type { Action } from 'Actions_Types';
import { SCHEDULE_SELECT_DEVICE, SCHEDULE_EDIT_RESET, SCHEDULE_SELECT_ACTION } from 'Actions_Types';

const initialState = {
	id: 0,
	deviceId: 0,
	method: 0,
	methodValue: 0,
	type: '',
	hour: 0,
	minute: 0,
	offset: 0,
	randomInterval: 0,
	active: true,
	weekdays: [],
};

export default function scheduleReducer(state = initialState, action) {
	switch (action.type) {
		case SCHEDULE_SELECT_DEVICE:
			return {
				...state,
				id: 0,
				deviceId: action.payload.deviceId,
			};

		case SCHEDULE_SELECT_ACTION:
			return {
				...state,
				method: action.payload.method,
				methodValue: action.payload.methodValue,
			};

		case SCHEDULE_EDIT_RESET:
			return initialState;

		default:
			return state;
	}
}