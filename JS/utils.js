/**
 * utils.js — Banco Acme
 * Funciones de validación, formato y navegación inteligente.
 */

// ══════════════════════════════════════════════════════════════
//  1. VALIDACIONES
// ══════════════════════════════════════════════════════════════

function esCampoVacio(valor) {
  return !valor || valor.trim() === "";
}

function esCorreoValido(correo) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(correo);
}

function esTelefonoValido(telefono) {
  return /^\d{10}$/.test(telefono);
}

function esPasswordValida(password) {
  return password && password.length >= 6;
}

function esSoloNumeros(valor) {
  return /^\d+$/.test(valor);
}

// ══════════════════════════════════════════════════════════════
//  2. FORMATO DE DATOS
// ══════════════════════════════════════════════════════════════

function formatearMoneda(valor) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(valor);
}

function formatearFecha(fechaISO) {
  if (!fechaISO) return "";
  const [anio, mes, dia] = fechaISO.split("-");
  return `${dia}/${mes}/${anio}`;
}

function capitalizarNombre(texto) {
  if (!texto) return "";
  return texto
    .toLowerCase()
    .split(" ")
    .map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1))
    .join(" ");
}

// ══════════════════════════════════════════════════════════════
//  3. NAVEGACIÓN INTELIGENTE (LA CLAVE DEL ÉXITO)
// ══════════════════════════════════════════════════════════════

/**
 * Esta función detecta automáticamente si estás dentro de /html/
 * y ajusta la ruta para que no tengas que escribir ../ manualmente.
 */
function redirigirA(pagina) {
  // Comparamos en minúscula para que funcione sin importar el caso
  const ruta = window.location.pathname.toLowerCase();
  const enCarpetaHtml = ruta.includes('/html/');

  if (pagina === "index.html") {
    // Desde html/ hay que subir un nivel con ../
    window.location.href = enCarpetaHtml ? "../index.html" : "index.html";
  } else {
    if (enCarpetaHtml) {
      // Ya estamos dentro de html/, vamos directo al archivo
      window.location.href = pagina;
    } else {
      // Estamos en raíz, entramos a html/ (minúscula, así está tu carpeta)
      window.location.href = `html/${pagina}`;
    }
  }
}

/**
 * Protege páginas privadas. Si no hay sesión, manda al login.
 */
function protegerPagina() {
  const sesion = obtenerSesionActiva();
  if (!sesion) {
    redirigirA("index.html");
  }
  return sesion;
}

// ══════════════════════════════════════════════════════════════
//  4. IMPRESIÓN CON RUTA DE CSS DINÁMICA
// ══════════════════════════════════════════════════════════════

function imprimirElemento(idElemento, titulo = "Banco Acme") {
  const elemento = document.getElementById(idElemento);
  if (!elemento) return;

  // Detectamos dónde estamos para poner la ruta del CSS correcta
  const enCarpetaHtml = window.location.pathname.toLowerCase().includes('/html/');
  const rutaCSS = enCarpetaHtml ? "../CSS/styles.css" : "CSS/styles.css";

  const ventana = window.open("", "_blank", "width=800,height=600");
  ventana.document.write(`
    <html>
      <head>
        <title>${titulo}</title>
        <link rel="stylesheet" href="${rutaCSS}">
        <style>
          body { padding: 2rem; font-family: 'Lato', sans-serif; background: white; }
          .no-print { display: none !important; }
        </style>
      </head>
      <body>
        ${elemento.innerHTML}
      </body>
    </html>
  `);
  ventana.document.close();
  ventana.onload = () => {
    ventana.print();
    ventana.close();
  };
}