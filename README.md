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
