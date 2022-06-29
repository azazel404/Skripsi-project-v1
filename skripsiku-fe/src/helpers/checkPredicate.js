const CheckPredicate = (number) => {
	let render;

	if (number >= 81 && number <= 100) {
		render = "A";
	} else if (number >= 76 && number <= 80) {
		render = "AB";
	} else if (number >= 71 && number <= 75) {
		render = "B";
	} else if (number >= 61 && number <= 70) {
		render = "BC";
	} else if (number >= 56 && number <= 60) {
		render = "C";
	} else if (number >= 46 && number <= 55) {
		render = "D";
	} else if (number >= 0 && number <= 45) {
		render = "E";
	}

	return render;
};

export default CheckPredicate;
