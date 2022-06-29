import { combineReducers } from "redux";
import actionTypes from "../actions/types";

const initialState = {
	storeData: [],
	storeBoolean: false,

	profile: {
		// permissions: []
	},

	isOpenUpdateProfile: false,

	toast: {
		open: false,
		type: "success",
		message: "",
	},
};

const generalReducer = (state = initialState, action) => {
	switch (action.type) {
		// Storing Profile & Data
		case actionTypes.STORE_PROFILE:
			state = Object.assign({}, state, {
				profile: action.data,
			});

			return state;

		case actionTypes.STORE_BOOLEAN:
			state = Object.assign({}, state, {
				storeBoolean: action.data,
			});

			return state;

		case actionTypes.STORE_DATA:
			state = Object.assign({}, state, {
				storeData: action.data,
			});

			return state;

		// Toast
		case actionTypes.OPEN_NOTIFICATION:
			state = Object.assign({}, state, {
				toast: action.data,
			});

			return state;

		case actionTypes.OPEN_ERROR_MESSAGE:
			state = Object.assign({}, state, {
				toast: action.data,
			});

			return state;

		case actionTypes.CLOSE_TOAST:
			state = Object.assign({}, state, {
				toast: {
					open: false,
					type: state.toast.type,
					message: "",
				},
			});

			return state;

		default:
			return state;
	}
};

// COMBINED REDUCERS
const reducers = {
	general: generalReducer,
};

export default combineReducers(reducers);
