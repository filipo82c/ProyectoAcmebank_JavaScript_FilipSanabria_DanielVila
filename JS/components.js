/**
 * components.js — Banco Acme
 * Definición de Web Components personalizados.
 */

// ══════════════════════════════════════════════════════════════
//  <acme-alert> — Mensaje de éxito o error
// ══════════════════════════════════════════════════════════════
class AcmeAlert extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<div class="acme-alert hidden" role="alert"></div>`;
  }

  mostrar(mensaje, tipo = "info") {
    const div = this.querySelector(".acme-alert");
    if (!div) return;
    div.textContent = mensaje;
    div.className = `acme-alert acme-alert--${tipo}`;

    clearTimeout(this._timer);
    this._timer = setTimeout(() => this.ocultar(), 5000);
  }

  ocultar() {
    const div = this.querySelector(".acme-alert");
    if (div) div.className = "acme-alert hidden";
  }
}
customElements.define("acme-alert", AcmeAlert);

// ══════════════════════════════════════════════════════════════
//  <acme-loader> — Spinner de carga
// ══════════════════════════════════════════════════════════════
class AcmeLoader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="acme-loader hidden">
        <div class="acme-loader__spinner"></div>
        <span>Procesando...</span>
      </div>
    `;
  }
  mostrar() { this.querySelector(".acme-loader").classList.remove("hidden"); }
  ocultar() { this.querySelector(".acme-loader").classList.add("hidden"); }
}
customElements.define("acme-loader", AcmeLoader);

// ══════════════════════════════════════════════════════════════
//  <acme-modal> — Ventana modal (popup)
// ══════════════════════════════════════════════════════════════
class AcmeModal extends HTMLElement {
  connectedCallback() {
    const contenidoOriginal = this.innerHTML;
    this.innerHTML = `
      <div class="acme-modal hidden" role="dialog" aria-modal="true">
        <div class="acme-modal__backdrop"></div>
        <div class="acme-modal__box">
          <button class="acme-modal__cerrar" aria-label="Cerrar">&times;</button>
          <div class="acme-modal__contenido">
            ${contenidoOriginal}
          </div>
        </div>
      </div>
    `;
    this.querySelector(".acme-modal__backdrop").addEventListener("click", () => this.cerrar());
    this.querySelector(".acme-modal__cerrar").addEventListener("click", () => this.cerrar());
  }
  abrir() {
    this.querySelector(".acme-modal").classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }
  cerrar() {
    this.querySelector(".acme-modal").classList.add("hidden");
    document.body.style.overflow = "";
  }
  setContenido(html) { this.querySelector(".acme-modal__contenido").innerHTML = html; }
}
customElements.define("acme-modal", AcmeModal);

// ══════════════════════════════════════════════════════════════
//  <acme-header> — Encabezado del dashboard
// ══════════════════════════════════════════════════════════════
class AcmeHeader extends HTMLElement {
  connectedCallback() {
    const usuario = obtenerSesionActiva();
    const nombre = usuario
      ? capitalizarNombre(`${usuario.nombres} ${usuario.apellidos}`)
      : "Usuario";

    this.innerHTML = `
      <header class="acme-header">
        <div class="acme-header__marca">
          <span class="acme-header__logo">🏦</span>
          <span class="acme-header__nombre">Banco Acme</span>
        </div>
        <div class="acme-header__usuario">
          <span class="acme-header__bienvenida">Hola, <strong>${nombre}</strong></span>
          <button class="btn btn--ghost btn--sm" onclick="cerrarSesionYRedirigir()">
            Cerrar sesión
          </button>
        </div>
      </header>
    `;
  }
}
customElements.define("acme-header", AcmeHeader);

// ══════════════════════════════════════════════════════════════
//  <acme-campo-error> — Mensaje de error bajo un campo
// ══════════════════════════════════════════════════════════════
class AcmeCampoError extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<span class="campo-error hidden"></span>`;
  }
  mostrar(mensaje) {
    const span = this.querySelector(".campo-error");
    span.textContent = mensaje;
    span.classList.remove("hidden");
  }
  ocultar() {
    const span = this.querySelector(".campo-error");
    span.textContent = "";
    span.classList.add("hidden");
  }
}
customElements.define("acme-campo-error", AcmeCampoError);

// ══════════════════════════════════════════════════════════════
//  FUNCIÓN GLOBAL CORREGIDA
// ══════════════════════════════════════════════════════════════
function cerrarSesionYRedirigir() {
  cerrarSesion();
  // Al usar redirigirA de utils.js, él ya sabe si poner ../ o no
  redirigirA("index.html");
}
