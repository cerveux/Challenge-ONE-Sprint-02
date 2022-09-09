const pantalla = document.querySelector("canvas");
const pincel = pantalla.getContext("2d");
pincel.fillStyle = "rgba(116, 114, 114, 0.6)";
pincel.fillRect(0, 0, 294, 360);

const arr = ["PALABRA", "SECRETA", "TELEFONO", "PROGRAMA", "MANCO"];

var palabraSecreta = "";
var cantLetras = 0;
const letrasCorrectas = [];
const errores = [];
var juego = false;
var regEx = /[A-ZÑ]/;

const dom = {
  menu: document.querySelector(".inicio"),
  game: document.querySelector(".game"),
  agregarPalabra: document.querySelector(".add"),
  btnDesistir: document.querySelector(".desistir"),
  letras: document.querySelector(".letras"),
  btnNuevoJuego: document.querySelector(".new-game"),
  erroresArea: document.querySelector(".mostrar-errores"),
  mensaje: document.querySelector(".alerta")
};

const funciones = {
  inicio: () => {
    juego = true;
    dom.menu.classList.add("atras");
    dom.game.classList.remove("atras");

    funciones.escogerPalabra();
    funciones.agregarLetras();

    dom.btnDesistir.onclick = funciones.reiniciar;
    dom.btnNuevoJuego.onclick = funciones.nuevoJuego;
  },
  nuevoJuego: ()=>{
    juego = true;
    document.querySelector(".mensaje").innerHTML = "";
    dom.letras.innerHTML = "";
    pincel.clearRect(0, 0, 294, 360);
    pincel.fillStyle = "rgba(116, 114, 114, 0.6)";
    pincel.fillRect(0, 0, 294, 360);
    dom.erroresArea.innerHTML = "";
    letrasCorrectas.splice(0, 10);
    errores.splice(0, 10);
    funciones.escogerPalabra();
    funciones.agregarLetras();
  },
  agregarLetras: ()=>{
    for (var i = 1; i <= palabraSecreta.length; i++) {
      var newDiv = document.createElement("div");
      dom.letras.appendChild(newDiv);
      newDiv.classList.add("letra");
      newDiv.classList.add(`n-${i}`);
      newDiv.id = `n-${i}`;
    }
  },
  escogerPalabra: ()=>{
    palabraSecreta = arr[Math.floor(Math.random() * arr.length)];
    cantLetras = palabraSecreta.length;
  },
  teclaPresionada: (e)=>{
    if (juego) {
      e = e || window.event;
      var intento = e.key.toUpperCase();
      if (errores.length !== 10 && palabraSecreta !== "" && cantLetras !== 0) {
        if (
          ((e.keyCode >= 65 && e.keyCode <= 90) || e.keyCode == 192) &&
          regEx.test(intento)
        ) {
          if (
            palabraSecreta.includes(intento) &&
            letrasCorrectas.includes(intento) === false
          ) {
            letrasCorrectas.push(intento);
            funciones.intentoCorrecto(intento);
          } else if (
            errores.includes(intento) === false &&
            palabraSecreta.includes(intento) === false
          ) {
            errores.push(intento);
            funciones.intentoIncorrecto(intento);
          }
        }
      }
    }
  },
  intentoCorrecto: (intento)=>{
    for (var i = 0; i < palabraSecreta.length; i++) {
      if (palabraSecreta[i] === intento) {
        document.getElementById(`n-${i + 1}`).innerHTML = intento;
        cantLetras--;
      }
    }
  
    cantLetras === 0 && funciones.cartel("Ganaste, felicidades!!!", "green");
  },
  intentoIncorrecto: (intento)=>{
    dom.erroresArea.innerHTML = errores.join(" - ");
    switch (errores.length) {
      case 1:
        dibujar.piso();
        break;
      case 2:
        dibujar.poste();
        break;
      case 3:
        dibujar.travesa();
        break;
      case 4:
        dibujar.cuerda();
        break;
      case 5:
        dibujar.cabeza();
        break;
      case 6:
        dibujar.cuerpo();
        break;
      case 7:
        dibujar.brazoI();
        break;
      case 8:
        dibujar.brazoD();
        break;
      case 9:
        dibujar.piernaI();
        break;
      case 10:
        dibujar.piernaD();
        funciones.cartel(`Perdiste =( la palabra era ${palabraSecreta}`, "red");
  
        break;
  
      default:
        break;
    }
  },
  cartel: (mensaje, color)=>{
    const plantilla = `<div class="mascara" onclick="funciones.reiniciar()"><div class="modal"  style="color: ${color};">${mensaje}</div></div>`;
    document.querySelector(".mensaje").innerHTML = plantilla;
  },
  reiniciar: ()=>{
    juego = false;
    document.querySelector(".mensaje").innerHTML = "";
    dom.letras.innerHTML = "";
    pincel.clearRect(0, 0, 294, 360);
    pincel.fillStyle = "rgba(116, 114, 114, 0.6)";
    pincel.fillRect(0, 0, 294, 360);
    dom.erroresArea.innerHTML = "";
    dom.game.classList.add("atras");
    dom.menu.classList.remove("atras");
    letrasCorrectas.splice(0, 10);
    errores.splice(0, 10);
  },
  palabra:()=>{
    dom.menu.classList.add("atras");
    dom.agregarPalabra.classList.remove("atras");
  },
  cancelarNueva:()=>{
    var textarea = document.querySelector(".ingreso");
    textarea.value = "";
    dom.agregarPalabra.classList.add("atras");
    dom.menu.classList.remove("atras");
  },
  guardarPalabra:()=> {
    var textarea = document.querySelector(".ingreso");
    if (textarea.value.length <= 8 && textarea.value.length > 3) {
      arr.push(textarea.value);
      textarea.value = "";
      funciones.palabraAnadida("Palabra añadida", "#0a3871");
    } else {
      funciones.alerta();
    }
  },
  alerta:()=> {
    dom.mensaje.classList.add("accion");
    setTimeout(() => dom.mensaje.classList.remove("accion"), 1000);
  },
  palabraAnadida: (mensaje, color)=>{
    const plantilla = `<div class="mascara" onclick="funciones.agregarIniciar()"><div class="modal"  style="color: ${color};">${mensaje}</div></div>`;
    document.querySelector(".mensaje").innerHTML = plantilla;
  },
  agregarIniciar: ()=>{
    dom.agregarPalabra.classList.add("atras");
    document.querySelector(".mensaje").innerHTML = "";
  
    funciones.inicio();
  }
  
};


const dibujar = {
  piso: () => {
    pincel.fillStyle = "#0a3871"; //piso
    pincel.fillRect(0, 355, 294, 5);
  },
  poste: () => {
    pincel.fillStyle = "#0a3871"; //poste
    pincel.fillRect(80.67, 0, 4.5, 360);
  },
  travesa: () => {
    pincel.fillStyle = "#0a3871"; //travesaño
    pincel.fillRect(80.67, 0, 177.75, 4.5);
  },
  cuerda: () => {
    pincel.fillStyle = "#0a3871"; //cuerda
    pincel.fillRect(253.92, 0, 4.5, 49.5);
  },
  cabeza: () => {
    pincel.fillStyle = "#0A3871"; //capocha
    pincel.beginPath();
    pincel.arc(256.42, 81, 31.5, 0, 2 * 3.14);
    pincel.fill();
    pincel.fillStyle = "rgba(116, 114, 114, 0.6)";
    pincel.beginPath();
    pincel.arc(256.42, 81, 27, 0, 2 * 3.14);
    pincel.fill();
  },
  cuerpo: () => {
    pincel.fillStyle = "#0a3871"; //cuerpo
    pincel.fillRect(253.92, 108, 4.5, 135);
  },
  brazoI: () => {
    pincel.fillStyle = "0a3871"; //brazo izq
    pincel.beginPath();
    pincel.moveTo(254.42, 108.5);
    pincel.lineTo(219.55, 168.9);
    pincel.lineTo(223.45, 171.15);
    pincel.lineTo(258.32, 110.75);
    pincel.fill();
    pincel.fillStyle = "0a3871";
    pincel.beginPath();
    pincel.arc(221.5, 170.03, 2.25, 0, 2 * 3.14);
    pincel.fill();
  },
  brazoD: () => {
    pincel.fillStyle = "0a3871"; //brazo der
    pincel.beginPath();
    pincel.moveTo(258.42, 108.5);
    pincel.lineTo(289.29, 168.9);
    pincel.lineTo(285.39, 171.15);
    pincel.lineTo(254.32, 110.75);
    pincel.fill();
    pincel.fillStyle = "0a3871";
    pincel.beginPath();
    pincel.arc(287.5, 170.03, 2.25, 0, 2 * 3.14);
    pincel.fill();
  },
  piernaI: () => {
    pincel.fillStyle = "0a3871"; //pierna izq
    pincel.beginPath();
    pincel.moveTo(254.42, 240.5);
    pincel.lineTo(219.55, 300.9);
    pincel.lineTo(223.45, 303.15);
    pincel.lineTo(258.32, 242.75);
    pincel.fill();
    pincel.fillStyle = "0a3871";
    pincel.beginPath();
    pincel.arc(221.5, 302.03, 2.25, 0, 2 * 3.14);
    pincel.fill();
  },
  piernaD: () => {
    pincel.fillStyle = "0a3871"; //brazo der
    pincel.beginPath();
    pincel.moveTo(258.42, 240.5);
    pincel.lineTo(289.29, 300.9);
    pincel.lineTo(285.39, 303.15);
    pincel.lineTo(254.32, 242.75);
    pincel.fill();
    pincel.fillStyle = "0a3871";
    pincel.beginPath();
    pincel.arc(287.5, 302.03, 2.25, 0, 2 * 3.14);
    pincel.fill();
  },
};

document.onkeydown = funciones.teclaPresionada;