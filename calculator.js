let runningTotal = "0";
let buffer = "0";
let previousOperator = null;
const screen = document.querySelector(".screen");

document
	.querySelector(".calc-buttons")
	.addEventListener("click", function (event) {
		buttonClicked(event.target.innerText);
	})

function buttonClicked(value) {
	if (isNaN(parseInt(value))) {

		handleSymbol(value);
	} else {
		handleNumber(value);
	}
	rerender();
};

function handleNumber(value) {
	console.log(value);
	if (buffer === "0") {
		buffer = value;
	}
	else {
		buffer += value;
	}
};

function rerender() {
	screen.innerText = buffer;
};

function handleSymbol(value) {
	console.log(value);
	switch (value) {
		case "C":
			buffer = "0";
			runningTotal = 0;
			previousOperator = null;
			break;
		case "=":
			if (previousOperator === null) {
				return;
			}
			flushOperation(parseInt(buffer));
			previousOperator = null;
			buffer = "" + runningTotal;
			runningTotal = 0;
			break;
		case "←":
			if (buffer.length === 1) {
				buffer = "0";
			}
			else {
				buffer = buffer.substr(0, buffer.length - 1);
			}
			break;
		default:
			handleMath(value);
			break;
	}
};

function handleMath(value) {
	if (buffer === "0") {
		//do nothing
		return;
	}
	const intBuffer = parseInt(buffer);
	if (runningTotal === 0) {
		runningTotal = intBuffer;
	}
	else {
		flushOperation(intBuffer);
	}
	previousOperator = value;
	buffer = "0";
}

function flushOperation(intBuffer) {
	if (previousOperator === "+") {
		runningTotal += intBuffer;
		console.log("ans", runningTotal);
	}
	else if (previousOperator === "-") {
		runningTotal -= intBuffer;
		console.log("ans", runningTotal);
	}
	else if (previousOperator === "×") {
		runningTotal *= intBuffer;
		console.log("ans", runningTotal);
	}
	else {
		runningTotal /= intBuffer;
		console.log("ans", runningTotal);
	}
};

