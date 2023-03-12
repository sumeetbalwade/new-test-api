const express = require("express");
const axios = require("axios");
const request = require("request");
const router = express.Router();
const _ = require("lodash");
const validateCard = require("./validateCard");

router.get("/", (req, res) => {
	res.json({
		message: "API - 👋🌎🌍🌏",
	});
});

router.get("/validate-card", validateCard);
router.get("/validate-pan", (req, res) => {
	let panCardNo = req.query.pan;

	const regex = new RegExp(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/);

	// if PAN Number
	// is empty return false
	if (panCardNo == null) {
		return res.status(200).json({
			status: "failed",
			panNumber: null,
			message: "NO PAN number Found",
		});
	}
	panCardNo = _.toUpper(panCardNo);

	// Return true if the PAN NUMBER
	// matched the ReGex
	if (regex.test(panCardNo) == true) {
		return res.status(200).json({
			status: "success",
			panNumber: panCardNo,
			message: "Valid PAN number",
		});
	} else {
		return res.status(200).json({
			status: "success",
			panNumber: panCardNo,
			message: "InValid PAN number",
		});
	}
});

router.get("/rates", (req, res) => {
	// const url = `https://rest.coinapi.io/v1/exchangerate/BTC/USD`;
	const url = `https://rest.coinapi.io/v1/exchangerate/${req.query.crypto}/${req.query.currency}`;
	request(
		url,
		{
			headers: { "X-CoinAPI-Key": process.env.API_KEY },
		},
		(error, response, body) => {
			if (error) {
				return res.status(500).json({ error: error });
			}
			return res.status(200).json({
				status: "success",
				message: JSON.parse(body),
			});
		}
	);
});
module.exports = router;
