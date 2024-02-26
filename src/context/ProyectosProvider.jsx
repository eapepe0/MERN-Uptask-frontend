import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { clientePrivadoAxios } from '../config/clienteAxios';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import useAuth from '../hooks/useAuth';

let socket;

const ProyectosContext = createContext();

const ProyectosProvider = ({ children }) => {
	//* Aca irian las funciones , datos ,que queremos compartir entre componentes
	const [proyectos, setProyectos] = useState([]); //* guardamos los proyectos del usuario en este estado
	const [alerta, setAlerta] = useState({}); //* estado en el que guardamos un mensaje y un bool de error para pasar al componente Alerta
	const [proyecto, setProyecto] = useState({}); //* guardamos el proyecto asociado a un id
	const [cargando, setCargando] = useState(false);
	const [modalFormularioTarea, setModalFormularioTarea] = useState(false);
	const [tarea, setTarea] = useState({});
	const [editandoTarea, setEditandoTarea] = useState(false);
	const [modalEliminarTarea, setModalEliminarTarea] = useState(false);
	const [colaborador, setColaborador] = useState({});
	const [modalEliminarColaborador, setModalEliminarColaborador] = useState(false);
	const [buscador, setBuscador] = useState(false);

	const navigate = useNavigate(); //* nos permite navegar a otra parte de la app

	const { auth } = useAuth();

	//* este effect obtiene los proyectos de la BD y los pone en el estado proyectos , cuando carga la 1era vez
	useEffect(() => {
		const obtenerProyectos = async () => {
			try {
				const token = localStorage.getItem('token'); //* sacamos el token del LS
				if (!token) return; //* si no existe el token , detenemos la ejecucion

				const { data } = await clientePrivadoAxios(token).get('/proyectos'); //* la respuesta da , enviamos el token en post, y los datos de proyecto lo enviamos en el request
				setProyectos(data);
			} catch (error) {
				console.error(error);
			}
		};
		obtenerProyectos();
	}, [auth]);

	//* creamos una conexion con socket.io
	useEffect(() => {
		socket = io(import.meta.env.VITE_BACKEND_URL);
	}, []);

	const mostrarAlerta = (alerta) => {
		setAlerta(alerta); //* ponemos el mensaje en el estado

		//* esperamos 5 seg para borrar el alerta
		setTimeout(() => {
			setAlerta({});
		}, 5000);
	};

	const submitProyecto = async (proyecto) => {
		//* si tiene un id que no es null o sea se esta editando
		if (proyecto.id) {
			await editarProyecto(proyecto);
		} else {
			await nuevoProyecto(proyecto);
		}
		return;
	};

	const editarProyecto = async (proyecto) => {
		try {
			const token = localStorage.getItem('token'); //* sacamos el token del LS
			if (!token) return; //* si no existe el token , detenemos la ejecucion

			const { data } = await clientePrivadoAxios(token).put(`/proyectos/${proyecto.id}`, proyecto); //* la respuesta da , enviamos el token en post, y los datos de proyecto lo enviamos en el request

			//* para mantener sincronizado los datos de la BD y el ultimo proyecto cargado por el formulario ,
			//* para no tener que volver a llamar a la API , metemos el estado dentro de data

			const proyectosActualizados = proyectos.map((proyectoState) =>
				proyectoState._id === data._id ? data : proyectoState
			);

			setProyectos(proyectosActualizados);

			//* si lo anterior se ejecuta correctamente , pondremos en el alerta un mensaje satisfactorio
			setAlerta({ msg: 'Proyecto actualizado correctamente', error: false });

			//* timer de 3 seg , donde borraremos las alertas e iremos a la url /proyectos
			setTimeout(() => {
				setAlerta({});
				navigate('/proyectos');
			}, 3000);
		} catch (error) {
			console.log(error);
		}
	};

	const nuevoProyecto = async (proyecto) => {
		try {
			const token = localStorage.getItem('token'); //* sacamos el token del LS
			if (!token) return; //* si no existe el token , detenemos la ejecucion

			const { data } = await clientePrivadoAxios(token).post('/proyectos', proyecto); //* la respuesta da , enviamos el token en post, y los datos de proyecto lo enviamos en el request

			//* para mantener sincronizado los datos de la BD y el ultimo proyecto cargado por el formulario ,
			//* para no tener que volver a llamar a la API , metemos el estado dentro de data

			setProyectos([...proyectos, data]);

			//* si lo anterior se ejecuta correctamente , pondremos en el alerta un mensaje satisfactorio
			setAlerta({ msg: 'Proyecto creado correctamente', error: false });

			//* timer de 3 seg , donde borraremos las alertas e iremos a la url /proyectos
			setTimeout(() => {
				setAlerta({});
				navigate('/proyectos');
			}, 3000);
		} catch (error) {
			console.log(error);
		}
	};

	const obtenerProyecto = async (id) => {
		setCargando(true);
		try {
			const token = localStorage.getItem('token'); //* sacamos el token del LS
			if (!token) return; //* si no existe el token , detenemos la ejecucion
			const { data } = await clientePrivadoAxios(token).get(`/proyectos/${id}`); //* pedimos el proyecto asociado al id
			setProyecto(data); //* guardamos en el estado
		} catch (error) {
			navigate('/proyectos');
			mostrarAlerta({
				msg: error.response.data.msg,
				error: true,
			});
		} finally {
			setCargando(false);
		}
	};

	const eliminarProyecto = async (id) => {
		try {
			const token = localStorage.getItem('token'); //* sacamos el token del LS
			if (!token) return; //* si no existe el token , detenemos la ejecucion

			const { data } = await clientePrivadoAxios(token).delete(`/proyectos/${id}`); //* la respuesta da , enviamos el token en delete

			//* sincronizar el estado

			const proyectosActualizados = proyectos.filter((proyectoState) => proyectoState._id !== id);

			setProyectos(proyectosActualizados);
			//* si lo anterior se ejecuta correctamente , pondremos en el alerta un mensaje satisfactorio
			setAlerta({ msg: data.msg, error: false });

			//* timer de 3 seg , donde borraremos las alertas e iremos a la url /proyectos
			setTimeout(() => {
				setAlerta({});
				navigate('/proyectos');
			}, 3000);
		} catch (error) {
			console.log(error);
		}
	};

	const handleModalTarea = () => {
		setModalFormularioTarea(!modalFormularioTarea);
		setTarea({});
	};

	const submitTarea = async (tarea) => {
		if (tarea?.id) {
			await editarTarea(tarea);
		} else {
			await crearTarea(tarea);
		}
	};

	const editarTarea = async (tarea) => {
		try {
			const token = localStorage.getItem('token'); //* sacamos el token del LS
			if (!token) return; //* si no existe el token , detenemos la ejecucion

			const { data } = await clientePrivadoAxios(token).put(`/tareas/${tarea.id}`, tarea); //* la respuesta da , enviamos el token en delete

			//* socket.io
			//*

			socket.emit('actualizar tarea', data);
			setAlerta({});
			setModalFormularioTarea(false);
		} catch (error) {
			console.log(error);
		}
	};

	const crearTarea = async (tarea) => {
		try {
			const token = localStorage.getItem('token'); //* sacamos el token del LS
			if (!token) return; //* si no existe el token , detenemos la ejecucion

			const { data } = await clientePrivadoAxios(token).post(`/tareas`, tarea); //* la respuesta da , enviamos el token en delete

			//* si lo anterior se ejecuta correctamente , pondremos en el alerta un mensaje satisfactorio
			setAlerta({ msg: data.msg, error: false });

			//* timer de 3 seg , donde borraremos las alertas e iremos a la url /proyectos
			setTimeout(() => {
				setAlerta({});
				/* 				navigate('/proyectos');
				 */
			}, 3000);
			//* socket.io

			socket.emit('nueva tarea', data.tarea); //* emitimos nueva tarea, y le pasamos la tarea
		} catch (error) {
			console.log(error);
		}
	};

	const handleModalEditarTarea = (tarea) => {
		setTarea(tarea);
		setModalFormularioTarea(true);
	};

	const handleModalEliminarTarea = (tarea) => {
		setTarea(tarea);
		setModalEliminarTarea(!modalEliminarTarea);
	};

	const eliminarTarea = async () => {
		try {
			const token = localStorage.getItem('token'); //* sacamos el token del LS
			if (!token) return; //* si no existe el token , detenemos la ejecucion

			const { data } = await clientePrivadoAxios(token).delete(`/tareas/${tarea._id}`); //* la respuesta da , enviamos el token en delete
			setAlerta({
				msg: data.msg,
				error: false,
			});

			setModalEliminarTarea(false);

			//* socket.io
			//* emitimos un evento , eliminar tarea al backend
			socket.emit('eliminar tarea', tarea);

			setTarea({});

			setTimeout(() => {
				setAlerta({});
			}, 2000);
		} catch (error) {
			console.log(error);
		}
	};

	const submitColaborador = async (email) => {
		setCargando(true);
		setColaborador({});
		try {
			const token = localStorage.getItem('token'); //* sacamos el token del LS
			if (!token) return; //* si no existe el token , detenemos la ejecucion

			const { data } = await clientePrivadoAxios(token).post('/proyectos/colaboradores', { email });
			setColaborador(data);
			setAlerta({});
		} catch (error) {
			mostrarAlerta({
				msg: error.response.data.msg,
				error: true,
			});
		} finally {
			setCargando(false);
		}
	};

	const agregarColaborador = async (email) => {
		try {
			const token = localStorage.getItem('token'); //* sacamos el token del LS
			if (!token) return; //* si no existe el token , detenemos la ejecucion

			const { data } = await clientePrivadoAxios(token).post(`/proyectos/colaboradores/${proyecto._id}`, email);

			mostrarAlerta({
				msg: data.msg,
				error: false,
			});

			setColaborador({});
		} catch (error) {
			mostrarAlerta({
				msg: error.response.data.msg,
				error: true,
			});
		}
	};

	const eliminarColaborador = async () => {
		try {
			const token = localStorage.getItem('token'); //* sacamos el token del LS
			if (!token) return; //* si no existe el token , detenemos la ejecucion

			const { data } = await clientePrivadoAxios(token).post(`/proyectos/eliminar-colaborador/${proyecto._id}`, {
				id: colaborador._id,
			});

			const proyectoActualizado = { ...proyecto };
			proyectoActualizado.colaboradores = proyectoActualizado.colaboradores.filter(
				(colaboradorState) => colaboradorState._id !== colaborador._id
			);

			setProyecto(proyectoActualizado);
			mostrarAlerta({
				msg: data.msg,
				error: false,
			});
			setColaborador({});
			setModalEliminarColaborador(!modalEliminarColaborador);
		} catch (error) {
			console.log(error);
		}
	};

	const handleModalEliminarColaborador = (colaborador) => {
		setModalEliminarColaborador(!modalEliminarColaborador);
		setColaborador(colaborador);
	};

	const completarTarea = async (id) => {
		try {
			const token = localStorage.getItem('token'); //* sacamos el token del LS
			if (!token) return; //* si no existe el token , detenemos la ejecucion

			const { data } = await clientePrivadoAxios(token).post(`/tareas/estado/${id}`, {});

			setTarea({});
			setAlerta({});

			socket.emit('cambiar estado', data);
		} catch (error) {
			console.log(error.response);
		}
	};

	const handleBuscador = () => {
		setBuscador(!buscador);
	};

	//* socket.io

	const submitTareasProyecto = (tareaNueva) => {
		//* sincronizar el estado
		const proyectoActualizado = { ...proyecto };
		proyectoActualizado.tareas = [...proyectoActualizado.tareas, tareaNueva];
		setProyecto(proyectoActualizado);
	};

	const eliminarTareaProyecto = (tareaEliminada) => {
		//* sincronizar el estado
		const proyectoActualizado = { ...proyecto };
		proyectoActualizado.tareas = proyectoActualizado.tareas.filter(
			(tareaState) => tareaState._id !== tareaEliminada._id
		);
		setProyecto(proyectoActualizado);
	};

	const actualizarTareaProyecto = (tareaEditada) => {
		//* sincronizar el estado
		const proyectoActualizado = { ...proyecto };
		proyectoActualizado.tareas = proyectoActualizado.tareas.map((tareasState) =>
			tareasState._id === tareaEditada._id ? tareaEditada : tareasState
		);
		setProyecto(proyectoActualizado);
	};

	const cambiarEstadoTarea = (tarea) => {
		const proyectoActualizado = { ...proyecto };
		proyectoActualizado.tareas = proyectoActualizado.tareas.map((tareaState) =>
			tareaState._id === tarea._id ? tarea : tareaState
		);

		setProyecto(proyectoActualizado);
	};

	const cerrarSesionProyecto = () => {
		setProyecto({});
		setProyectos([]);
		setAlerta({});
	};
	return (
		<ProyectosContext.Provider
			value={{
				proyectos,
				mostrarAlerta,
				alerta,
				submitProyecto,
				obtenerProyecto,
				proyecto,
				cargando,
				eliminarProyecto,
				handleModalTarea,
				modalFormularioTarea,
				submitTarea,
				handleModalEditarTarea,
				tarea,
				editandoTarea,
				setEditandoTarea,
				handleModalEliminarTarea,
				modalEliminarTarea,
				eliminarTarea,
				submitColaborador,
				colaborador,
				agregarColaborador,
				handleModalEliminarColaborador,
				eliminarColaborador,
				modalEliminarColaborador,
				completarTarea,
				handleBuscador,
				buscador,
				submitTareasProyecto,
				eliminarTareaProyecto,
				actualizarTareaProyecto,
				cambiarEstadoTarea,
				cerrarSesionProyecto,
			}}
		>
			{children}
		</ProyectosContext.Provider>
	);
};

ProyectosProvider.propTypes = {
	children: PropTypes.node,
};

export { ProyectosProvider, ProyectosContext };

//* recomendado : crear el archivo en ProyectosProvider.jsx en la carpeta context
//* modo de uso : <ProyectosProvider>
//*             :    <App/> o un Componente de Alto Orden (HOC)
//*               </ProyectosProvider>
//*
//*
//* Recomendado usar el snippet hookcontext , para usar solamente el hook
//* nos evitamos importar useContext , ProyectosContext y usar useContext(ProyectosContext)
//* cada vez que querramos usar un dato, con el hook usaremos:,

//*  import useProyectos from '<rutaDelHook/useProyectos'
//*
//* const {dato a sacar del context o funcion} = useProyectos()

//* en la carpeta /hooks/useProyectos()
