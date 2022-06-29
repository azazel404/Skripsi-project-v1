import moment from "moment";

const Helpers = {
	restrict: (profile, accessPermission) => {
		let allowed = false;
		let permissionFromUser = profile;

		accessPermission.forEach((permit) => {
			let access = permissionFromUser.includes(permit);
			if (access) allowed = access;
		});

		return allowed;
	},
	restrictUI: (permission) => {
		const { profile, accessPermission, children } = permission;
		let allowed = false;
		let permissionFromUser = profile;

		if (permission) {
			accessPermission.forEach((permit) => {
				let access = permissionFromUser.includes(permit);
				if (access) allowed = access;
			});
		}

		let resultAllowed = allowed ? children : null;

		return resultAllowed;
	},
	IsEmptyObject: (object) => {
		return (
			!Object.getOwnPropertySymbols(object).length &&
			!Object.getOwnPropertyNames(object).length
		);
	},
	generateRandomNDigits: (n) => {
		return Math.floor(Math.random() * (9 * Math.pow(10, n))) + Math.pow(10, n);
	},
	changeDateFormat: (date, format = "DD MMM YYYY") => {
		return moment(date).format(format);
	},
	postDate: (date) => {
		return moment(date).format("YYYY-MM-DD");
	},

	renderStatus: (status) => {
		if (status === 0) {
			return (
				<div style={{ display: "flex", alignItems: "center" }}>
					<div
						style={{
							height: "8px",
							width: "8px",
							borderRadius: "50%",
							backgroundColor: "#3F89D1",
							marginRight: "6px",
						}}
					/>
					<div>Dikumpulkan</div>
				</div>
			);
		} else if (status === 1) {
			return (
				<div style={{ display: "flex", alignItems: "center" }}>
					<div
						style={{
							height: "8px",
							width: "8px",
							borderRadius: "50%",
							backgroundColor: "#4FB8A5",
							marginRight: "6px",
						}}
					/>
					<div>Diterima</div>
				</div>
			);
		} else if (status === 2) {
			return (
				<div style={{ display: "flex", alignItems: "center" }}>
					<div
						style={{
							height: "8px",
							width: "8px",
							borderRadius: "50%",
							backgroundColor: "#D14242",
							marginRight: "6px",
						}}
					/>
					<div>DITOLAK</div>
				</div>
			);
		} else if (status === 3) {
			return (
				<div style={{ display: "flex", alignItems: "center" }}>
					<div
						style={{
							height: "8px",
							width: "8px",
							borderRadius: "50%",
							backgroundColor: "#ED6C01",
							marginRight: "6px",
						}}
					/>
					<div>Revisi</div>
				</div>
			);
		}
	},
	ErrorHandler: (error) => {
		let message = "Silakan hubungi Administrator untuk informasi lebih lanjut";
		let severity = "error";

		if (error) {
			if (error.response) {
				if (error.response.status === 403) {
					message = "403 | Anda tidak memiliki izin untuk permintaan ini";
					severity = "warning";
				}

				if (error.response.status === 401) {
					message = "401 | Tidak sah, silakan masuk untuk melanjutkan";
					severity = "error";
				}

				if (error.response) {
					if (error.response.data.message) {
						message = error.response.data.message;
					} else if (error.response.data.errors) {
						error.response.data.errors.map((item) => {
							message = item.msg;
							return message;
						});
					}
				}
			}
		}

		return {
			message,
			severity,
		};
	},
};
export default Helpers;
