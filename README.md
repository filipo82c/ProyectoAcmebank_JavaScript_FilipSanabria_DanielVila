# 🏦 Banco Acme — Aplicación Web de Autogestión Bancaria

Aplicación web de banca en línea desarrollada con **HTML5, CSS3 y JavaScript puro (Vanilla JS)**, sin frameworks externos. Permite a los usuarios gestionar sus cuentas bancarias desde el navegador.

---

## 📁 Estructura del proyecto

```
ProyectoAcmebank_JavaScript/
│
├── index.html          ← Página de inicio de sesión
├── registro.html       ← Formulario de registro de cuenta
├── recuperar.html      ← Recuperación de contraseña
├── dashboard.html      ← Panel principal del usuario
├── README.md
│
├── css/
│   └── styles.css      ← Estilos globales (variables CSS, responsive)
│
└── js/
    ├── storage.js      ← Manejo de persistencia (localStorage)
    ├── utils.js        ← Funciones reutilizables (validaciones, formato)
    └── components.js   ← Web Components personalizados
```

## ✅ Funcionalidades implementadas

### Autenticación
- [x] Inicio de sesión con tipo de ID, número de ID y contraseña
- [x] Validación de credenciales contra localStorage
- [x] Redirección automática al Dashboard si hay sesión activa
- [x] Mensajes de error claros al fallar el login
- [x] Protección de páginas (redirección si no hay sesión)

### Registro de cuenta
- [x] Formulario completo con 10 campos obligatorios
- [x] Validación en tiempo real (correo, teléfono, contraseñas)
- [x] Verificación de usuario duplicado
- [x] Generación automática de número de cuenta (`ACME-XXXXXXXX`)
- [x] Asignación de fecha de creación
- [x] Resumen de cuenta al completar el registro

### Recuperación de contraseña
- [x] Verificación en 2 pasos: identidad → nueva contraseña
- [x] Validación cruzada (tipo ID + número ID + correo)
- [x] Actualización segura de la contraseña en localStorage

### Dashboard
- [x] Resumen de cuenta (número, saldo, fecha, datos del titular)
- [x] Menú lateral con navegación dinámica sin recargar la página
- [x] Resumen de las últimas 10 transacciones en tabla
- [x] Consignación electrónica con actualización de saldo
- [x] Retiro de dinero con validación de saldo suficiente
- [x] Pago de servicios públicos (Energía, Agua, Gas, Internet)
- [x] Generación de comprobantes para cada transacción
- [x] Certificado bancario oficial con formato profesional
- [x] Botón de imprimir en transacciones, comprobantes y certificado
- [x] Cierre de sesión

### Diseño
- [x] Diseño responsive (móvil, tablet, desktop)
- [x] Tipografía Google Fonts (Playfair Display + Lato)
- [x] Paleta de colores bancaria (azul marino, dorado, blanco)
- [x] Sidebar adaptativo (lateral en desktop, barra inferior en móvil)
- [x] Animaciones CSS en modales y secciones

---

## 🧩 Web Components implementados

| Componente | Tag HTML | Descripción |
|---|---|---|
| AcmeAlert | `<acme-alert>` | Mensajes de éxito/error con auto-ocultado |
| AcmeLoader | `<acme-loader>` | Spinner de carga |
| AcmeModal | `<acme-modal>` | Ventana modal reutilizable |
| AcmeHeader | `<acme-header>` | Encabezado con datos de sesión |
| AcmeCampoError | `<acme-campo-error>` | Mensaje de error bajo inputs |

---

## 🗃️ Estructura de datos (localStorage)

### Usuarios (`acme_usuarios`)
```json
[
  {
    "tipoId": "CC",
    "numeroId": "1234567890",
    "nombres": "Juan Carlos",
    "apellidos": "Pérez García",
    "genero": "M",
    "telefono": "3001234567",
    "correo": "juan@correo.com",
    "direccion": "Calle 1 # 2-3, Centro",
    "ciudad": "Bogotá",
    "password": "miPassword123",
    "numeroCuenta": "ACME-45213876",
    "saldo": 500000,
    "fechaCreacion": "2025-01-15"
  }
]
```

### Transacciones (`acme_transacciones`)
```json
[
  {
    "id": "lx7a8b2c",
    "numeroCuenta": "ACME-45213876",
    "fecha": "2025-01-15",
    "hora": "10:30:00",
    "referencia": "REF-87654321",
    "tipo": "Consignación",
    "concepto": "Consignación por canal electrónico",
    "valor": 500000
  }
]
```

### Sesión activa (`acme_sesion_activa`)
```json
{ "numeroId": "1234567890" }
```

---

## 🛠️ Conceptos de JavaScript aplicados

- **DOM Manipulation**: `getElementById`, `querySelector`, `querySelectorAll`, `innerHTML`
- **Eventos**: `addEventListener` con `submit`, `click`, `blur`, `input`
- **Arrays**: `find`, `filter`, `map`, `forEach`, `push`, `slice`, `reverse`
- **Objetos**: spread operator (`...`), `Object.values()`, destructuring
- **localStorage**: `getItem`, `setItem`, `removeItem`
- **JSON**: `JSON.stringify`, `JSON.parse`
- **Web Components**: `class extends HTMLElement`, `customElements.define`
- **Expresiones regulares (RegEx)**: validación de correo, teléfono
- **Template Literals**: strings con backticks y `${}`
- **Módulos de código**: separación en archivos (storage, utils, components)
- **Intl API**: `Intl.NumberFormat` para formatear moneda
- **BOM**: `window.location.href`, `window.print()`, `window.open()`

---

## 👥 Autores

- **Filip Sanabria**
- **Daniel Vila**

Proyecto desarrollado para el módulo de JavaScript — Banco Acme.
