/**
 * storage.js — Banco Acme
 * Cerebro de persistencia de datos usando localStorage.
 */

// ── Claves para localStorage ──────────────────────────
const KEYS = {
  USUARIOS: "acme_usuarios",
  TRANSACCIONES: "acme_transacciones",
  SESION: "acme_sesion_activa",
};

// ══════════════════════════════════════════════════════════════
//  1. GESTIÓN DE USUARIOS
// ══════════════════════════════════════════════════════════════

/** Obtiene la lista de usuarios */
function obtenerUsuarios() {
  const datos = localStorage.getItem(KEYS.USUARIOS);
  return datos ? JSON.parse(datos) : [];
}

/** Guarda la lista de usuarios */
function guardarUsuarios(usuarios) {
  localStorage.setItem(KEYS.USUARIOS, JSON.stringify(usuarios));
}

/** * Registra un nuevo usuario 
 * CORRECCIÓN: Ahora verifica si el ID ya existe antes de guardar.
 */
function registrarUsuario(datos) {
  const usuarios = obtenerUsuarios();

  // Si ya existe un usuario con ese número de ID, retornamos null
  const existe = usuarios.find(u => u.numeroId === datos.numeroId);
  if (existe) return null;

  const nuevoUsuario = {
    tipoId: datos.tipoId,
    numeroId: datos.numeroId,
    nombres: datos.nombres,
    apellidos: datos.apellidos,
    genero: datos.genero || "No especificado",
    telefono: datos.telefono,
    correo: datos.correo,
    direccion: datos.direccion,
    ciudad: datos.ciudad,
    password: datos.password,
    numeroCuenta: generarNumeroCuenta(),
    saldo: 0, // Saldo inicial en 0
    fechaCreacion: new Date().toISOString().split("T")[0],
  };

  usuarios.push(nuevoUsuario);
  guardarUsuarios(usuarios);
  return nuevoUsuario;
}

/** Busca usuario por ID */
function buscarUsuarioPorId(tipoId, numeroId) {
  const usuarios = obtenerUsuarios();
  return usuarios.find(u => u.tipoId === tipoId && u.numeroId === numeroId);
}

/** Busca usuario por número de cuenta */
function buscarUsuarioPorNumeroCuenta(numeroCuenta) {
  const usuarios = obtenerUsuarios();
  return usuarios.find(u => u.numeroCuenta === numeroCuenta);
}

/** Actualiza datos de un usuario (saldo, contraseña, etc.) */
function actualizarUsuario(numeroId, cambios) {
  const usuarios = obtenerUsuarios();
  const actualizados = usuarios.map((u) =>
    u.numeroId === numeroId ? { ...u, ...cambios } : u
  );
  guardarUsuarios(actualizados);
}

// ══════════════════════════════════════════════════════════════
//  2. TRANSACCIONES
// ══════════════════════════════════════════════════════════════

function obtenerTransacciones() {
  const datos = localStorage.getItem(KEYS.TRANSACCIONES);
  return datos ? JSON.parse(datos) : [];
}

function obtenerTransaccionesPorCuenta(numeroCuenta) {
  return obtenerTransacciones().filter(t => t.numeroCuenta === numeroCuenta);
}

function registrarTransaccion(datos) {
  const transacciones = obtenerTransacciones();

  const nuevaTx = {
    id: generarId(),
    numeroCuenta: datos.numeroCuenta,
    fecha: new Date().toISOString().split("T")[0],
    hora: new Date().toLocaleTimeString("es-CO"),
    referencia: generarReferencia(),
    tipo: datos.tipo, // "Consignación" | "Retiro" | "Transferencia enviada" | "Transferencia recibida"
    concepto: datos.concepto,
    valor: Number(datos.valor),
  };

  transacciones.push(nuevaTx);
  localStorage.setItem(KEYS.TRANSACCIONES, JSON.stringify(transacciones));

  // Actualizar el saldo en el objeto usuario
  const usuario = obtenerUsuarios().find(u => u.numeroCuenta === datos.numeroCuenta);
  if (usuario) {
    let nuevoSaldo;
    if (datos.tipo === "Consignación" || datos.tipo === "Transferencia recibida") {
      nuevoSaldo = usuario.saldo + nuevaTx.valor;
    } else {
      nuevoSaldo = usuario.saldo - nuevaTx.valor;
    }
    actualizarUsuario(usuario.numeroId, { saldo: nuevoSaldo });
  }

  return nuevaTx;
}

/** 
 * Realiza una transferencia entre dos cuentas 
 * @param {string} cuentaOrigen - Número de cuenta origen
 * @param {string} cuentaDestino - Número de cuenta destino
 * @param {number} monto - Monto a transferir
 * @returns {object|null} - Objeto con las dos transacciones o null si falla
 */
function realizarTransferencia(cuentaOrigen, cuentaDestino, monto) {
  const usuarioOrigen = buscarUsuarioPorNumeroCuenta(cuentaOrigen);
  const usuarioDestino = buscarUsuarioPorNumeroCuenta(cuentaDestino);

  // Validaciones
  if (!usuarioOrigen || !usuarioDestino) return null;
  if (usuarioOrigen.saldo < monto) return null;

  // Registrar transacción de salida para origen
  const txOrigen = registrarTransaccion({
    numeroCuenta: cuentaOrigen,
    tipo: "Transferencia enviada",
    concepto: `Transferencia a ${usuarioDestino.nombres} ${usuarioDestino.apellidos}`,
    valor: monto,
  });

  // Registrar transacción de entrada para destino
  const txDestino = registrarTransaccion({
    numeroCuenta: cuentaDestino,
    tipo: "Transferencia recibida",
    concepto: `Transferencia de ${usuarioOrigen.nombres} ${usuarioOrigen.apellidos}`,
    valor: monto,
  });

  return { txOrigen, txDestino, usuarioDestino };
}

// ══════════════════════════════════════════════════════════════
//  3. SESIÓN ACTIVA
// ══════════════════════════════════════════════════════════════

function iniciarSesion(usuario) {
  localStorage.setItem(KEYS.SESION, JSON.stringify({ numeroId: usuario.numeroId }));
}

function obtenerSesionActiva() {
  const sesion = localStorage.getItem(KEYS.SESION);
  if (!sesion) return null;
  const { numeroId } = JSON.parse(sesion);
  return obtenerUsuarios().find((u) => u.numeroId === numeroId) || null;
}

function cerrarSesion() {
  localStorage.removeItem(KEYS.SESION);
}

// ══════════════════════════════════════════════════════════════
//  4. GENERADORES ALEATORIOS
// ══════════════════════════════════════════════════════════════

function generarNumeroCuenta() {
  const num = Math.floor(Math.random() * 90000000 + 10000000);
  return `ACME-${num}`;
}

function generarReferencia() {
  const num = Math.floor(Math.random() * 90000000 + 10000000);
  return `REF-${num}`;
}

function generarId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}