# Rick and Morty Wiki – Frontend

![Angular](https://img.shields.io/badge/Angular-16-red?logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue?logo=typescript)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-purple?logo=bootstrap)
![Netlify](https://img.shields.io/badge/Deploy-Netlify-success?logo=netlify)

Aplicación web desarrollada en **Angular** como parte del proyecto final del programa **Pre-Academy de Moby Digital**. Esta SPA (Single Page Application) consume la API de Rick and Morty y se integra con un backend propio en **NestJS** para manejar autenticación, usuarios, favoritos y comentarios.

---

## 🚀 Características
- **Listado y detalle de personajes** con paginación, búsqueda y filtros.
- **Autenticación completa** (login y registro) con roles de usuario y administrador.
- **Gestión de sesión** con `sessionStorage` y protección de rutas mediante guards.
- **Perfil de usuario editable** (nickname, foto, ubicación).
- **Favoritos por usuario**, con persistencia en base de datos.
- **Sistema de comentarios en episodios** con control de permisos (CRUD y moderación para admins).
- **Diseño responsive** con **Bootstrap** y **Angular Material**.
- **Arquitectura modular** con lazy loading y buenas prácticas.

---

## 🛠 Tecnologías
- **Framework:** Angular 16, TypeScript, RxJS
- **Estilos:** Bootstrap, Angular Material
- **Estado y servicios:** BehaviorSubject, Observables
- **Control de versiones:** Git, GitHub
- **Deploy:** Netlify

---

## 🌐 Deploy
- **Frontend:** [Ver aplicación en Netlify](https://rickymortybymica.netlify.app/)
- **Backend (NestJS):** [Repositorio aquí](https://github.com/micaPrieto/back-rickymorty)
 (El backend esta corriendo en Render, por lo cual no es necesario clonarlo)
---

## ▶️ Instalación y ejecución local
### 1. Clonar el repositorio
```bash
git clone https://github.com/micaPrieto/rick-and-morty.git
cd rick-and-morty


### 2. Instalar dependencias
npm install

### 3. Ejecutar la aplicación
ng serve --o

Abrir en http://localhost:4200/

### 4. Configurar el backend
Para que el frontend funcione correctamente, el backend debe estar corriendo en NestJS. Configura la URL base de la API en environment.ts.



Desarrollado por Micaela Prieto

