import actionTypes from "./types";

// Storing Profile & Data
export const storeData = (data) => ({
	type: actionTypes.STORE_DATA,
	data,
});

export const storeProfile = (profile) => ({
	type: actionTypes.STORE_PROFILE,
	data: profile,
});

export const storeBoolean = (profile) => ({
	type: actionTypes.STORE_BOOLEAN,
	data: profile,
});

// Toast
export const openNotificationToast = (message) => ({
	type: actionTypes.OPEN_NOTIFICATION,
	data: {
		open: true,
		type: "success",
		message: message,
	},
});

export const openErrorToast = (message) => ({
	type: actionTypes.OPEN_ERROR_MESSAGE,
	data: {
		open: true,
		type: "error",
		message: message,
	},
});

export const closeToast = () => ({
	type: actionTypes.CLOSE_TOAST,
});
