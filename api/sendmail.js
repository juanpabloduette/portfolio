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
		from: `"Sitio Web" <${userGmail}>`,
		to: userGmail,
		subject: "Nuevo mensaje desde el formulario web",
		text: `Nombre: ${nombre}\nCorreo: ${correo}`,
	};

	try {
		await transporter.sendMail(mailOptions);

		return res.status(200).send(`
			<html>
			  <body style="background-color: white; color: #343d5d; width: 100%; height: 100vh; font-family: Arial, sans-serif; margin-top: 50px;">
				<div style="max-width: 500px; margin: 0 auto; background-color: #6ed2b7;border-radius: 30px; display:flex; justify-content: center; align-items: center; flex-direction: column;" class="container-message"> 
					<h2>Mensaje enviado con éxito</h2>
					<p>Serás redirigido en unos segundos...</p>
				</div>
				<script>
				  setTimeout(() => {
					window.location.href = "/";
				  }, 1500);
				</script>
			  </body>
			</html>
		`);
	} catch (error) {
		console.error("Error:", error);
		return res.status(500).json({ message: error.message });
	}
}
