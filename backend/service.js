const QRCode = require('qrcode');

// Previous Version - Not use already
//exports.formatData = (data) => {
	// Problem: before the first ":", need to have at least 2 word like "Full Name:", "Your Name:". //Error: "Name:" (One word)
	//const qrCodeText = `Name: ${data.name}, Contact: ${data.contact}`;  //Not work
	//const qrCodeText = `Your Name: ${data.name}, Contact: ${data.contact}`;  //work
	//const qrCodeText = `YourName: ${data.name}, Contact: ${data.contact}`;  //Not work
	//const qrCodeText = `Full Name: ${data.name}, Contact: ${data.contact}`;  //work
	//const qrCodeText = `FullName: ${data.name}, Contact: ${data.contact}`;  //Not work
//	const qrCodeText = `Name is ${data.name}, Contact is ${data.contact}`; // Work
// 	return qrCodeText;
// };

exports.generateQRCode = async (qrCodeText) => {
	const options = {
		errorCorrectionLevel: 'M',
		type: 'image/png',
		margin: 1,
		width: 250
	};

	const qrCodeBuffer = await QRCode.toBuffer(qrCodeText, options);
	return qrCodeBuffer;
};