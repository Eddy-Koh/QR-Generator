const service = require('./service');

exports.generateQR = async (req, res) => {
	try {
		// Previous Version - Not use already
		// const { data } = req.body;
		// const qrCodeText = service.formatData(data);

		// Previous version 2 - Nott use already
		// const qrCodeText = req.body.qrText;
		// console.log('QR Content:\n', qrCodeText);

		// Latest Version
		const { name, contact } = req.body;
		// Format as JSON string for QR
		const qrCodeText = JSON.stringify({ name, contact });

		const qrCodeBuffer = await service.generateQRCode(qrCodeText);

		res.setHeader('Content-Disposition', 'attachment; filename=qrcode.png');
		res.type('image/png').send(qrCodeBuffer);
	} catch (err) {
		console.error('Error generating QR code:', err);
		res.status(500).send({ error: 'Internal Server Error' });
	}
};