const express = require("express");
const nodeMailer = require("nodemailer");

const server = express();

const port = process.env.PORT || 3000;

// Middleware para procesar datos enviados por formularios (application/x-www-form-urlencoded)
server.use(express.urlencoded({ extended: true }));

// Configuración del transportador de correo
const userGmail = "juanpabloduettedev@gmail.com";
const passAppGmail = process.env.PASS;

const transporter = nodeMailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		user: userGmail,
		pass: passAppGmail,
	},
});

server.post("/sendmail", async (req, res) => {
	const { nombre, correo } = req.body;
	// console.log(req.body);
	if (!nombre || !correo) {
		return res.status(400).send("Por favor, complete todos los campos.");
	}

	const mailOptions = {
		from: `"Sitio Web" <${userGmail}>`, // Dirección de origen
		to: userGmail, // Dirección de destino
		subject: "Nuevo mensaje desde el formulario web",
		text: `Nombre: ${nombre}\nCorreo: ${correo}`,
	};

	try {
		await transporter.sendMail(mailOptions);
		res.send(`
        <html>
			<head>
				<title>Mensaje Enviado</title>
				<link rel="stylesheet" href="../css/css.css" />
			</head>
          <body style="background-color: white; color: #343d5d; width: 100%; height: 100vh; font-family: Arial, sans-serif; margin-top: 50px;">
            <div style="max-width: 500px; margin: 0 auto; background-color: #6ed2b7;border-radius: 30px; display:flex; justify-content: center; align-items: center; flex-direction: column;" class="container-message"> 
                <h2>Mensaje enviado con éxito</h2>
                <p>Serás redirigido en unos segundos...</p>
            </div>
            <script>
              setTimeout(() => {
                window.location.href = "https://websites-rho-weld.vercel.app/";
              }, 1000);
            </script>
          </body>
        </html>
    `);
	} catch (error) {
		console.error("Error al enviar correo:", error);
		console.log(passAppGmail);
		res.status(500).send(`Error enviando el correo: ${error.message}`);
	}
});

server.listen(port, () => {
	console.log(`Servidor levantado en http://localhost:${port}`);
});
