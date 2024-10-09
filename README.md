# Backend para VManager

## :open_book: Descripción

**VManager** es una aplicación de control de vacaciones que permite a los administradores gestionar usuarios, y a los usuarios visualizar y actualizar sus días de vacaciones disponibles y utilizados. Proporciona autenticación basada en JWT y distintas rutas para usuarios con roles de administrador y de usuario estándar.

## 🛠️ Requisitos

- Node.js
- MongoDB
- pnpm , npm , yarn , burn (el de tu elección)
- Variables de entorno (`.env`)

## 🚀 Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/ERHGDEV/vmanager_back.git
```

2. Navega al directorio del proyecto:

```bash
cd vmanager_back
```

3. Instala las dependencias:

```bash
pnpm install
```

4. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
```bash
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

5. Inicia el servicio:

```bash
pnpm run dev
```

6. Abre  **http://localhost:5001** en tu navegador. 

## :desktop_computer: Endpoints

### Autenticación

- **POST** /api/login 

Inicia sesión con un `username` y `password` para recibir un token JWT.

```bash
{
  "username": "admin",
  "password": "password1234"
}
```

Respuesta exitosa:

```bash
{
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "username": "admin",
    "role": "admin"
  }
}
```

### Usuarios

- **GET** /api/users

Obtener la lista de todos los usuarios (solo para administradores).

- **GET** /api/users/`:id`

Obtener los detalles de un usuario por su `id` (solo administrador o el propio usuario).

- **POST** /api/users

Crear un nuevo usuario (solo para administradores).

```bash
{
  "username": "new_user",
  "password": "password123",
  "role": "user",
  "vacationDays": 10,
  "usedDays": 2
}
```

- **PUT** /api/users/

Actualizar los datos de un usuario por su id (solo administrador o el propio usuario).

- **DELETE** /api/users/

Eliminar un usuario por su id (solo para administradores).

## Middleware

- **authenticateToken**: Verifica el token JWT en las rutas protegidas.
- **requestLogger**: Registra información sobre cada petición.
- **unknownEndpoint**: Maneja las rutas no existentes.
- **errorHandler**: Captura y maneja errores durante las peticiones.

## Estructura del proyecto

```bash
├── controllers
│   └── users.js       # Controlador de las rutas de usuarios
├── models
│   └── user.js        # Esquema y modelo de usuario en MongoDB
├── utils
│   ├── config.js      # Configuración de las variables de entorno
│   ├── logger.js      # Logger personalizado
│   ├── middleware.js  # Middlewares personalizados
├── app.js             # Configuración de la aplicación Express
├── index.js           # Punto de entrada del servidor
└── .env               # Variables de entorno (no incluir en el repo)
```

