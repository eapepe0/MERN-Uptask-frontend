import { useParams, Link } from 'react-router-dom';
import useProyectos from '../hooks/useProyectos';
import { useEffect } from 'react';
import Spinner from '../components/Spinner';
import ModalFormularioTarea from '../components/ModalFormularioTarea';
import ModalEliminarTarea from '../components/ModalEliminarTarea';

import Tarea from '../components/Tarea';
import Colaborador from '../components/Colaborador';
import ModalEliminarColaborador from '../components/ModalEliminarColaborador';
import useAdmin from '../hooks/useAdmin';
import io from 'socket.io-client';

let socket;

export default function Proyecto() {
	const { id } = useParams();

	const {
		obtenerProyecto,
		proyecto,
		cargando,
		handleModalTarea,
		submitTareasProyecto,
		eliminarTareaProyecto,
		actualizarTareaProyecto,
		cambiarEstadoTarea,
	} = useProyectos();

	const { nombre } = proyecto;

	const admin = useAdmin();

	useEffect(() => {
		obtenerProyecto(id);
	}, []);

	//* cuanto entramos a un proyecto , emitimos un evento 'abrir proyecto'
	//* lo que hace el backend , es unirnos a las personas que estamos en el mismo proyecto a un room , o habitacion
	//* , donde compartimos datos entre las personas que compartimos la habitacion

	useEffect(() => {
		socket = io(import.meta.env.VITE_BACKEND_URL);
		socket.emit('abrir proyecto', id);
	}, []);

	//* si estamos en el mismo room del proyecto tarea agregada, y la tareaNueva es igual al proyecto donde estamos ubicados
	//* haremos un submitTareasProyecto , lo cual mantenemos actualizado el estado para todos los clientes que esten en el mismo room
	useEffect(() => {
		if (!proyecto.nombre || cargando) return;
		socket.on('tarea agregada', (tareaNueva) => {
			submitTareasProyecto(tareaNueva);
		});

		//* si nos mandan el evento tarea eliminada
		//* llamamos a la funcion eliminarTareaProyecto enviada del provider
		socket.on('tarea eliminada', (tareaEliminada) => {
			eliminarTareaProyecto(tareaEliminada);
		});

		socket.on('tarea actualizada', (tareaActualizada) => {
			actualizarTareaProyecto(tareaActualizada);
		});

		socket.on('nuevo estado', (nuevoEstadoTarea) => {
			cambiarEstadoTarea(nuevoEstadoTarea);
		});

		return () => {
			socket.off('tarea agregada');
			socket.off('tarea eliminada');
			socket.off('tarea actualizada');
			socket.off('nuevo estado');
		};
	});

	if (cargando)
		return (
			<div className='text-center'>
				<Spinner />
			</div>
		);

	return (
		<>
			<div className='flex justify-between'>
				<h1 className='font-black text-4xl'>{nombre}</h1>
				{admin && (
					<div className='flex items-center gap-2 text-gray-400 hover:text-black'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='w-6 h-6'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125'
							/>
						</svg>
						<Link to={`/proyectos/editar/${id}`} className='uppercase font-bold'>
							Editar
						</Link>
					</div>
				)}
			</div>
			{/* SI SOS ADMNIN SE HABILITAEL BOTON NUEVA TAREA */}
			{admin && (
				<button
					type='button'
					className='text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center mt-5 flex gap-2 items-center'
					onClick={handleModalTarea}
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-6 h-6'
					>
						<path strokeLinecap='round' strokeLinejoin='round' d='M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' />
					</svg>
					Nueva Tarea
				</button>
			)}
			<p className='font-bold text-xl mt-10'>Tareas del Proyecto</p>

			<div className='bg-white shadow mt-10 rounded-lg'>
				{proyecto.tareas?.length ? (
					proyecto.tareas?.map((tarea) => <Tarea key={tarea?._id} tarea={tarea} />)
				) : (
					<p className='text-center my-5 p-10 font-bold uppercase'>No hay tareas en este proyecto...</p>
				)}
			</div>
			{admin && (
				<>
					<div className='flex  justify-between mt-10 '>
						<p className='font-bold text-xl'>Colaboradores</p>
						<div className='flex items-center gap-2 text-gray-400 hover:text-black'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={1.5}
								stroke='currentColor'
								className='w-6 h-6'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z'
								/>
							</svg>
							<Link
								to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
								className='text-gray-400 uppercase font-bold  hover:text-black inline-flex'
							>
								Añadir
							</Link>
						</div>
					</div>

					<div className='bg-white shadow mt-10 rounded-lg'>
						{proyecto.colaboradores?.length ? (
							proyecto.colaboradores?.map((colaborador) => (
								<Colaborador key={colaborador?._id} colaborador={colaborador} />
							))
						) : (
							<p className='text-center my-5 p-10 font-bold uppercase'>No hay colaboradores en este proyecto...</p>
						)}
					</div>
				</>
			)}
			<ModalFormularioTarea />
			<ModalEliminarTarea />
			<ModalEliminarColaborador />
		</>
	);
}
