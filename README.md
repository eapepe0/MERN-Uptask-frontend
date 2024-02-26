# Uptask App (Mern Mongo Express React Node)

# Frontend

Realizado con **React** , **headlessui** , **modal** , **socket.io** , **tailwindcss** , **react-router-dom** , **axios** (cliente publico / cliente privado)

#### Autenticacion

- Registro de usuario
- Cambio de contraseña
- Autenticar Usuario
- Confirmar Usuario
- JWT
- Token

#### Manejo de rutas con rrdom , basadas en el token

- Rutas Privadas
- Rutas Publicas

#### useContext / Provider

- **authProvider** : Manejo de la autorizacion del usuario) / distintos tipos de usuarios que pueden ingresar a determinado proyecto , editar o eliminar tareas o proyectos

- **proyectoProvider** : Manejo de la creacion/edicion/eliminacion de **Proyectos** , creacion/edicion/eliminacion/actualizacion de **Tareas** , agregar o eliminar **Colaboradores**

#### socket.io

- Manejo estados de una tarea o proyecto de forma dinamica y en tiempo real entre colaboradores y administradores de **Proyectos**

# Backend

Realizado con **Express** , **cors** , **dotenv** , **mongoose** (manejo de **mongo**)

#### Controladores

- **proyecto , usuario , tarea**

#### Rutas

- Rutas para cada endpoint de la **api** , proyecto , tarea , usuario

#### Modelos

- Creacion de Modelos para la BD , de mongo usando Mongoose (proyecto , tarea , usuario)

#### JWT

- Generacion y validacion de JWT

#### Middleware

- Chequeamos la autenticacion del usuario y protegemos las rutas.

## Deploy

[Link a la pagina cliente](https://MERN-Uptask-frontend-lilac.vercel.app/)
[Link a la pagina admin](https://MERN-Uptask-frontend-lilac.vercel.app/admin)

## Capturas

![screen-1](https://raw.githubusercontent.com/eapepe0//MERN-Uptask-frontend/main/screen-1.jpg)
![screen-2](https://raw.githubusercontent.com/eapepe0//MERN-Uptask-frontend/main/screen-2.jpg)
![screen-3](https://raw.githubusercontent.com/eapepe0//MERN-Uptask-frontend/main/screen-3.jpg)

![screen-4](https://raw.githubusercontent.com/eapepe0//MERN-Uptask-frontend/main/screen-4.jpg)
![screen-5](https://raw.githubusercontent.com/eapepe0//MERN-Uptask-frontend/main/screen-5.jpg)
![screen-6](https://raw.githubusercontent.com/eapepe0//MERN-Uptask-frontend/main/screen-6.jpg)

![screen-7](https://raw.githubusercontent.com/eapepe0//MERN-Uptask-frontend/main/screen-7.jpg)
![screen-8](https://raw.githubusercontent.com/eapepe0//MERN-Uptask-frontend/main/screen-8.jpg)
![screen-9](https://raw.githubusercontent.com/eapepe0//MERN-Uptask-frontend/main/screen-9.jpg)

![screen-10](https://raw.githubusercontent.com/eapepe0//MERN-Uptask-frontend/main/screen-10.jpg)
![screen-11](https://raw.githubusercontent.com/eapepe0//MERN-Uptask-frontend/main/screen-11.jpg)
![screen-12](https://raw.githubusercontent.com/eapepe0//MERN-Uptask-frontend/main/screen-12.jpg)

![screen-13](https://raw.githubusercontent.com/eapepe0//MERN-Uptask-frontend/main/screen-13.jpg)

## Performance

![performance](https://raw.githubusercontent.com/eapepe0//MERN-Uptask-frontend/main/performance.jpg)
