const containeR = document.getElementById("container");

const griD = document.getElementById("grid");
const seCtion2 = document.getElementById("sec2");
const seCtion3 = document.getElementById("sec3");

const hoMe = document.getElementById("home");

containeR.style.display = "block";

griD.classList.add("animation");

hoMe.addEventListener("click", (e) => {
	e.preventDefault();
	griD.style.display = "grid";
	griD.classList.add("animation");
	seCtion3.style.display = "none";
	seCtion2.style.display = "none";
});

const aboutMe2 = document.querySelector(".aboutme2");
const aboutMe = document.getElementById("aboutme");
const aboutMePosition = aboutMe.getBoundingClientRect();
const portFolio = document.getElementById("portfolio");
const portFolioPosition = aboutMe.getBoundingClientRect();

aboutMe2.addEventListener("click", (e) => {
	e.preventDefault();
	griD.style.display = "none";
	seCtion2.style.display = "grid";
	seCtion2.classList.add("animation");
	seCtion3.style.display = "none";

	tabSlider.style.left = aboutMe.offsetLeft + "px";
	tabSlider.style.setProperty("--width", aboutMePosition.width + "px");
});

aboutMe.addEventListener("click", (e) => {
	e.preventDefault();
	griD.style.display = "none";
	seCtion2.style.display = "grid";
	seCtion2.classList.add("animation");
	seCtion3.style.display = "none";
});

const portFolio2 = document.querySelector(".portfolio2");

portFolio2.addEventListener("click", (e) => {
	e.preventDefault();
	griD.style.display = "none";
	seCtion3.style.display = "grid";
	seCtion3.classList.add("animation");
	seCtion2.style.display = "none";

	window.scrollTo(0, 0);
	tabSlider.style.left = portFolio.offsetLeft + "px";
	tabSlider.style.setProperty("--width", portFolioPosition.width + "px");
});

portFolio.addEventListener("click", (e) => {
	e.preventDefault();
	griD.style.display = "none";
	seCtion3.style.display = "grid";
	seCtion3.classList.add("animation");
	seCtion2.style.display = "none";
});

// MENU
const tabSlider = document.querySelector("#tab-slider");
const homePosition = hoMe.getBoundingClientRect();
tabSlider.style.left = hoMe.offsetLeft + "px";
tabSlider.style.setProperty("--width", homePosition.width + "px");

function setSlider(e) {
	const elData = e.target.getBoundingClientRect();
	tabSlider.style.left = e.target.offsetLeft + "px";
	tabSlider.style.setProperty("--width", elData.width + "px");
}

document.querySelector(".tabs").addEventListener("click", (e) => {
	if (e.target.classList.contains("tab")) {
		setSlider(e);
	}
});

/* MODO OSCURO */

const btnSwitch = document.querySelector("#switch");
let sobremiImg = document.getElementById("sobremiimg");
let portfolioImg = document.getElementById("portfolioimg");
const Switch = document.querySelector("#hide-checkbox");

btnSwitch.addEventListener("click", () => {
	document.body.classList.toggle("dark");

	if (document.body.classList.contains("dark")) {
		localStorage.setItem("dark-mode", "true");
		sobremiImg.src = "/img/sobremidarkimg.png";
		portfolioImg.src = "/img/portfoliodark.png";
	} else {
		localStorage.setItem("dark-mode", "false");
		sobremiImg.src = "/img/sobremisun.png";
		portfolioImg.src = "/img/portfoliosun.png";
	}
});

if (localStorage.getItem("dark-mode") === "true") {
	document.body.classList.add("dark");
	Switch.checked = true;
	sobremiImg.src = "/img/sobremidarkimg.png";
	portfolioImg.src = "/img/portfoliodark.png";
} else {
	document.body.classList.remove("dark");
	Switch.checked = false;
	sobremiImg.src = "/img/sobremisun.png";
	portfolioImg.src = "/img/portfoliosun.png";
}

// MOUSE MOVE
let anchoVentana = window.innerWidth;

if (anchoVentana >= 1024) {
	document.addEventListener("mousemove", parallax);

	function parallax(f) {
		this.querySelectorAll(".layer").forEach((layer) => {
			const speed = layer.getAttribute("data-speed");
			const x = (window.innerWidth - f.pageX * speed) / 200;
			const y = (window.innerHeight - f.pageY * speed) / 250;
			layer.style.transform = `translateX(${x}px) translateY(${y}px)`;
		});
	}
}

// MODAL

var modal = document.querySelector(".modal");
var trigger = document.querySelector(".trigger");
var closeButton = document.querySelector(".close-button");

function toggleModal() {
	modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
	if (event.target === modal) {
		toggleModal();
	}
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

// FORMULARIO

const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s-Z0-9]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
};

const campos = {
	nombre: false,
	correo: false,
};

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "nombre":
			validarCampo(expresiones.nombre, e.target, "nombre");
			break;
		case "correo":
			validarCampo(expresiones.correo, e.target, "correo");
			break;
	}
};

const validarCampo = (expresion, input, campo) => {
	if (expresion.test(input.value)) {
		document
			.querySelector(`#grupo__${campo} .formulario__input-error`)
			.classList.remove("formulario__input-error-activo");
		campos[campo] = true;
	} else {
		document
			.querySelector(`#grupo__${campo} .formulario__input-error`)
			.classList.add("formulario__input-error-activo");
		campos[campo] = false;
	}
};

inputs.forEach((input) => {
	input.addEventListener("keyup", validarFormulario);
	input.addEventListener("blur", validarFormulario);
});

formulario.addEventListener("submit", (e) => {
	e.preventDefault();

	if (campos.nombre && campos.correo) {
		document
			.getElementById("formulario__mensaje-exito")
			.classList.add("formulario__mensaje-exito-activo");
		setTimeout(() => {
			document
				.getElementById("formulario__mensaje-exito")
				.classList.remove("formulario__mensaje-exito-activo");
		}, 5000);
		formulario.submit();
		formulario.reset();
	} else {
		document
			.getElementById("formulario__mensaje")
			.classList.add("formulario__mensaje-activo");
		setTimeout(() => {
			document
				.getElementById("formulario__mensaje")
				.classList.remove("formulario__mensaje-activo");
		}, 5000);
	}
});

// FORMULARIO DE PORTFOLIO

const formularioPortfolio = document.getElementById("formulario-portfolio");
const inputsPortfolio = document.querySelectorAll(
	"#formulario-portfolio input"
);

const expresionesPortfolio = {
	nombrep: /^[a-zA-ZÀ-ÿ\s-Z0-9]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	correop: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
};

const camposPortfolio = {
	nombrep: false,
	correop: false,
};

const validarFormularioPortfolio = (e) => {
	switch (e.target.name) {
		case "nombrep":
			validarCampoPortfolio(expresionesPortfolio.nombrep, e.target, "nombrep");
			break;
		case "correop":
			validarCampoPortfolio(expresionesPortfolio.correop, e.target, "correop");
			break;
	}
};

const validarCampoPortfolio = (expresionesPortfolio, inputportfolio, campo) => {
	if (expresionesPortfolio.test(inputportfolio.value)) {
		document
			.querySelector(`#grupo__${campo} .formulario__input-error`)
			.classList.remove("formulario__input-error-activo");
		camposPortfolio[campo] = true;
	} else {
		document
			.querySelector(`#grupo__${campo} .formulario__input-error`)
			.classList.add("formulario__input-error-activo");
		camposPortfolio[campo] = false;
	}
};

inputsPortfolio.forEach((inputsPortfolio) => {
	inputsPortfolio.addEventListener("keyup", validarFormularioPortfolio);
	inputsPortfolio.addEventListener("blur", validarFormularioPortfolio);
});

formularioPortfolio.addEventListener("submit", (e) => {
	e.preventDefault();

	if (camposPortfolio.nombrep && camposPortfolio.correop) {
		document
			.getElementById("formulario__mensaje-exito-portfolio")
			.classList.add("formulario__mensaje-exito-activo");
		setTimeout(() => {
			document
				.getElementById("formulario__mensaje-exito-portfolio")
				.classList.remove("formulario__mensaje-exito-activo");
		}, 5000);

		formularioPortfolio.submit();
		formularioPortfolio.reset();
	} else {
		document
			.getElementById("formulario__mensaje-portfolio")
			.classList.add("formulario__mensaje-activo");
		setTimeout(() => {
			document
				.getElementById("formulario__mensaje-portfolio")
				.classList.remove("formulario__mensaje-activo");
		}, 5000);
	}
});

/* BOTON IDIOMA */

function changeLanguage() {
	let languageButtonMovil = document.getElementById("languageButtonmovil");
	let languageButton = document.getElementById("languageButton");
	let element1 = document.getElementById("element1");
	let home = document.getElementById("home");
	let aboutme = document.getElementById("aboutme");
	let portfolio = document.getElementById("portfolio");
	let business = document.getElementById("business");
	let make = document.getElementById("make");
	let one = document.getElementById("one");
	let two = document.getElementById("two");
	let profesional = document.getElementById("profesional");
	let three = document.getElementById("three");
	let together = document.getElementById("together");
	let togethertext = document.getElementById("togethertext");
	let formonename = document.getElementById("formonename");
	let buttonsend = document.getElementById("buttonsend");
	let formoneinstertname = document.getElementById("formoneinsertname");
	let formoneinstertemail = document.getElementById("formoneinsertemail");
	let errortext = document.getElementById("errortext");
	let modalone = document.getElementById("modalone");
	let modaltwo = document.getElementById("modaltwo");
	let modalthree = document.getElementById("modalthree");
	let modalfour = document.getElementById("modalfour");
	let im = document.getElementById("im");
	let skills = document.getElementById("skills");
	let aboutmee = document.getElementById("aboutmee");
	let formation = document.getElementById("formation");
	let udemy = document.getElementById("udemy");
	let davinci = document.getElementById("davinci");
	let iac = document.getElementById("iac");
	let project = document.getElementById("project");
	let projectp = document.getElementById("projectp");
	let jobs = document.getElementById("jobs");
	let jobsp = document.getElementById("jobsp");
	let contactprojects = document.getElementById("contactprojects");
	let contactprojectsp = document.getElementById("contactprojectsp");

	if (
		languageButton.dataset.language === "en" ||
		languageButtonMovil.dataset.language === "en"
	) {
		languageButton.dataset.language = "es";
		languageButtonMovil.dataset.language = "es";
		languageButton.textContent = "EN";
		languageButtonMovil.textContent = "EN";
		element1.innerHTML =
			'<p id="element1">Hola! &#128075; soy <span>Juan</span>, un desarrollador web de Argentina. Interesado por el diseño, Criptos, Startups y Marketing. Bienvenidos a mi sitio web.</p>';
		home.textContent = "Inicio";
		aboutme.textContent = "Sobre mi";
		portfolio.textContent = "Portfolio";
		business.textContent =
			"Tenes un emprendimiento? Queres ofrecer tus servicios con un sitio web?";
		make.innerHTML =
			'<p id="make">Crear un sitio web para ese fin requiere de estar siempre actualizado y acompañando al cliente para poder lograr el mejor resultado. <br> <br>Los proyectos se realizar para que sean adaptables a todos los dispositivos móviles <strong>( 100% Responsivos )</strong>.</p>';
		one.textContent = "Diseño Web";
		two.textContent = "Desarrollo";
		profesional.innerHTML =
			"<p>Desarrollo profesional para pymes y emprendedores. <br><br> También ofrecemos servicios de <strong>web hosting</strong>.</p>";
		three.innerHTML = '<i class="fa-solid fa-arrow-up"></i>Ver más';
		together.textContent = "Trabajamos juntos?";
		togethertext.innerHTML =
			'<p id="togethertext">Nos ponemos en contacto a la brevedad para comenzar el proyecto juntos.<strong>Contactame</strong>.</p>';
		formonename.innerHTML = ' <span class="text-nombre">Nombre</span>';
		buttonsend.textContent = "Enviar";
		formoneinstertname.textContent = "Ingrese nombre";
		formoneinstertemail.textContent = "Ingrese un correo válido";
		errortext.innerHTML =
			'<i class="fas fa-exclamation-triangle"></i> Por favor rellena el formulario correctamente.';
		modalone.innerHTML =
			'<i class="fa-solid fa-calendar-days"></i><h3>Tiempo de entrega</h3><p>El proyecto tiene un lapso de entrega de entre 10 y 15 días.</p>';
		modaltwo.innerHTML =
			'<i class="fa-solid fa-credit-card"></i><h3>Medios de pago</h3><p>Pay Pal / Bitcoin / USDT</p>';
		modalthree.innerHTML =
			'<i class="fa-solid fa-circle-dollar-to-slot"></i><h3>Plazos de pago</h3><p>50% al inicio del desarrollo web, 50% al finalizar el sitio.</p>';
		modalfour.innerHTML =
			'<i class="fa-solid fa-cloud-arrow-up"></i><h3>Mantenimiento de hosting</h3><p>Costo anual U$S40, se abona al finalizar el sitio.</p>';
		im.innerHTML =
			'<p id="im">Hola! &#128075; me llamo Juan Pablo Duette y soy <strong>diseñador web</strong>. Manejo las últimas tecnologías del mercado, me gusta mantenerme actualizado para poder brindar diseños de alto impacto.<br><br>Me caracterizo por hacer el seguimiento de mis clientes y brindar el soporte que necesitan ante cualquier circunstancia que ellos requieran.</p>';
		skills.textContent = "Habilidades";
		// aboutmee.innerHTML = '<a href="" class="botonbig aboutme2" id="aboutme">Sobre mi<i class="fa-solid fa-arrow-up"></i></a>';
		aboutmee.textContent = "Sobre mi";
		formation.textContent = "Formación";
		udemy.innerHTML =
			'<li id="udemy"><strong>Desarrollador Front End</strong> - Udemy (2022)</li>';
		davinci.innerHTML =
			'<li id="davinci"><strong>Desarrollador Web</strong> - Escuela Multimedial Davinci (2006)</li>';
		iac.innerHTML =
			'<li id="iac"><strong>Diseñador de paginas web</strong> - Instituto Argentino de Computación (2004)</li>';
		project.textContent = "Proyectos Freelance";
		projectp.textContent =
			"Estoy abierto a cualquier propuesta para integrar un equipo de trabajo para proyectos freelance.";
		jobs.textContent = "Ultimos proyectos finalizados";
		jobsp.textContent =
			"Esta es una colección de mis últimos proyectos freelance";
		contactprojects.textContent = "Contactame";
		contactprojectsp.textContent =
			"Si te gustaron podés contactarme para comenzar un proyecto juntos.";
	} else {
		languageButton.dataset.language = "en";
		languageButtonMovil.dataset.language = "en";
		languageButton.textContent = "ES";
		languageButtonMovil.textContent = "ES";
		element1.innerHTML =
			'<p id="element1">Hello! &#128075; Iam <span>Juan</span>, web development from Argentina. Interested design, Criptos, Startups and Marketing. Welcome to my web site.</p>';
		home.textContent = "Home";
		aboutme.textContent = "About me";
		portfolio.textContent = "Portfolio";
		business.textContent =
			"Do you have a business? Do you want to offer your services with a website?";
		make.innerHTML =
			'<p id="make">Creating a website for this purpose requires always being updated and accompanying the client in order to achieve the best result. <br> <br>The projects are carried out so that they are adaptable to all mobile devices  <strong>( 100% Responsive )</strong>.</p>';
		one.textContent = "Web Design";
		two.textContent = "Development";
		profesional.innerHTML =
			"<p>Professional development for startups and entrepreneurs. <br><br> We also offer <strong>web hosting</strong> services.</p>";
		three.innerHTML = '<i class="fa-solid fa-arrow-up"></i>See more';
		together.textContent = "Do we work together?";
		togethertext.innerHTML =
			'<p id="togethertext">We will contact you shortly to start the project together.<strong> Contact me</strong>.</p>';
		formonename.innerHTML = ' <span class="text-nombre">Name</span>';
		buttonsend.textContent = "Send";
		formoneinstertname.textContent = "Insert name";
		formoneinstertemail.textContent = "Enter a valid E-mail";
		errortext.innerHTML =
			'<i class="fas fa-exclamation-triangle"></i> Please fill out the form correctly.';
		modalone.innerHTML =
			'<i class="fa-solid fa-calendar-days"></i><h3>Lead Time</h3><p>The project has a lead time of between 10 and 15 days</p>';
		modaltwo.innerHTML =
			'<i class="fa-solid fa-credit-card"></i><h3>Payment methods</h3><p>Pay Pal / Bitcoin / USDT</p>';
		modalthree.innerHTML =
			'<i class="fa-solid fa-circle-dollar-to-slot"></i><h3>Payment terms</h3><p>50% at the start of web development, 50 % at the end of the site</p>';
		modalfour.innerHTML =
			'<i class="fa-solid fa-cloud-arrow-up"></i><h3>Hosting maintenance</h3><p>Annual cost US$40, paid at the end of the site</p>';
		im.innerHTML =
			'<p id="im">Hello! &#128075; My name is Juan Pablo Duette and I am a <strong>web designer</strong>. I handle the latest technologies on the market, I like to keep myself updated in order to provide high-impact designs.<br><br>I am known for following up on my clients and providing the support they need in any circumstance that they require.</p >';
		skills.textContent = "Skills";
		aboutmee.textContent = "About Me";
		formation.textContent = "Formation";
		udemy.innerHTML =
			'<li id="udemy"><strong>Front End Developer</strong> - Udemy (2022)</li>';
		davinci.innerHTML =
			'<li id="davinci"><strong>Web Developer</strong> - Escuela Multimedial Davinci (2006)</li>';
		iac.innerHTML =
			'<li id="iac"><strong>Web designer</strong> - Instituto Argentino de Computación (2004)</li>';
		project.textContent = "Freelance Projects";
		projectp.textContent =
			"I am open to any proposal to integrate a work team for freelance projects.";
		jobs.textContent = "Last completed projects";
		jobsp.textContent = "This is a collection of my latest freelance projects";
		contactprojects.textContent = "Contact me";
		contactprojectsp.textContent =
			"If you liked them you can contact me to start a project together.";
	}
}

//FORMULARIO ENVIAR MAIL

document.addEventListener("DOMContentLoaded", () => {
	const form = document.getElementById("formulario");

	form.addEventListener("submit", async (e) => {
		e.preventDefault(); // <--- SI ESTO NO CORRE, VES EL JSON EN LA PAGINA

		const formData = new FormData(form);

		try {
			const respuesta = await fetch("/api/sendmail", {
				method: "POST",
				body: new URLSearchParams(formData),
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			});

			const data = await respuesta.json();

			document.getElementById("formulario__mensaje-exito").textContent =
				data.mensaje;
		} catch (error) {
			console.error("Error:", error);
		}
	});
});
