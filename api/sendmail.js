import nodemailer from "nodemailer";

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Método no permitido" });
	}

	const { nombre, correo } = req.body;

	if (!nombre || !correo) {
		return res.status(400).json({ message: "Complete todos los campos" });
	}

	const userGmail = "juanpabloduettedev@gmail.com";
	const passAppGmail = process.env.PASS;

	const transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 465,
		secure: true,
		auth: {
			user: userGmail,
			pass: passAppGmail,
		},
	});

	const mailOptions = {
		from: `"Sitio Web www.juanpabloduette.com.ar" <${userGmail}>`,
		to: userGmail,
		subject: "Nuevo mensaje desde el formulario web",
		text: `Nombre: ${nombre}\nCorreo: ${correo}`,
	};

	try {
		await transporter.sendMail(mailOptions);

		// res.send("<h2>Mensaje enviado OK</h2>");
		res.json({ ok: true, mensaje: "Mensaje enviado correctamente" });
	} catch (error) {
		console.error("Error:", error);
		return res.status(500).json({ message: error.message });
	}
}
