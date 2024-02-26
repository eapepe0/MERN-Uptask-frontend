import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { clientePrivadoAxios } from '../config/clienteAxios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	//* Aca irian las funciones , datos ,que queremos compartir entre componentes
	const [auth, setAuth] = useState({}); //* guardamos un objeto donde tendremos las credenciales del usuario
	const [cargando, setCargando] = useState(true); //* estado que nos permite saber si terminamos de hacer el pedido a perfil o si cargamos el token
	const navigate = useNavigate(); //* nos permite movernos por las paginas

	//* cargamos el useEffect el cual ejecutamos cuando se carga el provider , o sea al principio de todo
	useEffect(() => {
		const autenticarUsuario = async () => {
			const token = localStorage.getItem('token'); //* buscamos el token en el LS
			//* si no existe
			if (!token) {
				setCargando(false); //* terminamos de cargar
				return; //* detenemos la ejecucion
			}

			//* existe el token
			try {
				const { data } = await clientePrivadoAxios(token).get('/usuarios/perfil'); //* hacemos un llamado a perfil , y le pasamos el token al request
				setAuth(data); //* ponemos las credenciales en auth
				if (data._id && location.pathname === '/') {
					navigate('/proyectos');
				}
				//navigate('/proyectos'); //* vamos a /proyectos
			} catch (error) {
				//* si hay algun error en el token o en el request
				console.log(error);
				setAuth({}); //* vaciamos el auth por si queda algun dato guardado de algun inicio de sesion previo
			}
			//* terminamos de cargar
			setCargando(false);
		};

		autenticarUsuario();
	}, []);

	const cerrarSesionAuth = () => {
		setAuth({});
	};
	return <AuthContext.Provider value={{ setAuth, auth, cargando, cerrarSesionAuth }}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
	children: PropTypes.node,
};

export { AuthProvider };

export default AuthContext;

//* recomendado : crear el archivo en authProvider.jsx en la carpeta context
//* modo de uso : <authProvider>
//*             :    <App/> o un Componente de Alto Orden (HOC)
//*               </authProvider>
//*
//*
//* Recomendado usar el snippet hookcontext , para usar solamente el hook
//* nos evitamos importar useContext , authContext y usar useContext(authContext)
//* cada vez que querramos usar un dato, con el hook usaremos:,

//*  import useAuth from '<rutaDelHook/useAuth'
//*
//* const {dato a sacar del context o funcion} = useAuth
