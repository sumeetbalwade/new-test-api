const VISA_REGEX = /^4[0-9]{12}(?:[0-9]{3})?$/;
const MASTERCARD_REGEX = /^5[1-5][0-9]{14}$/;
const AMEX_REGEX = /^3[47][0-9]{13}$/;
const DISCOVER_REGEX = /^6(?:011|5[0-9]{2})[0-9]{12}$/;
const JCB_REGEX = /^(?:2131|1800|35\d{3})\d{11}$/;
const DINERS_CLUB_REGEX = /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/;
const UNIONPAY_REGEX = /^(62|88)\d{14}$/;

function isValidCardNumber(number) {
	let sum = 0;
	let isSecondDigit = false;
	for (let i = number.length - 1; i >= 0; i--) {
		let digit = parseInt(number.charAt(i));
		if (isSecondDigit) {
			digit *= 2;
			if (digit > 9) {
				digit -= 9;
			}
		}
		sum += digit;
		isSecondDigit = !isSecondDigit;
	}
	return sum % 10 == 0;
}

function identifyCardType(number) {
	if (VISA_REGEX.test(number)) {
		return "Visa";
	} else if (MASTERCARD_REGEX.test(number)) {
		return "Mastercard";
	} else if (AMEX_REGEX.test(number)) {
		return "American Express";
	} else if (DISCOVER_REGEX.test(number)) {
		return "Discover";
	} else if (JCB_REGEX.test(number)) {
		return "JCB";
	} else if (DINERS_CLUB_REGEX.test(number)) {
		return "Diners Club";
	} else if (UNIONPAY_REGEX.test(number)) {
		return "UnionPay";
	} else {
		return "Unknown";
	}
}

const validateCard = (req, res) => {
	let number = req.query.number;
	if (number == null) {
		return res.status(200).json({
			status: "failed",
			cardNumber: null,
			message: "NO Card number Found",
		});
	}
	if (!isValidCardNumber(number)) {
		return res.status(200).json({
			status: "success",
			cardNumber: number,
			message: "Invalid credit card number",
		});
	} else {
		return res.status(200).json({
			status: "success",
			cardNumber: number,
			cardType: identifyCardType(number),
			message: "Valid Card number",
		});
	}
};

module.exports = validateCard;
