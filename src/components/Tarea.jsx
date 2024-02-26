import formatearFecha from '../helpers/formatearFecha';
import PropTypes from 'prop-types';
import useProyectos from '../hooks/useProyectos';
import useAdmin from '../hooks/useAdmin';

Tarea.propTypes = {
	tarea: PropTypes.shape({
		descripcion: PropTypes.string,
		nombre: PropTypes.string,
		prioridad: PropTypes.string,
		fechaEntrega: PropTypes.string,
		_id: PropTypes.string,
		estado: PropTypes.bool,
		completado: PropTypes.oneOfType([
			PropTypes.shape({
				_id: PropTypes.string,
				email: PropTypes.string,
				nombre: PropTypes.string,
			}),
			PropTypes.string,
		]),
	}),
};

export default function Tarea({ tarea }) {
	const { descripcion, nombre, prioridad, fechaEntrega, estado, _id } = tarea;
	const { handleModalEditarTarea, handleModalEliminarTarea, completarTarea } = useProyectos();
	const admin = useAdmin();

	const estiloPrioridad =
		prioridad === 'Alta' ? 'text-red-600' : prioridad === 'Media' ? 'text-sky-600' : 'text-green-600';

	return (
		<div className={`border-b p-5 flex justify-between items-center ${estado ? 'opacity-30' : ''} `}>
			<div className='flex flex-col items-start'>
				<p className='mb-1 text-xl'>{nombre}</p>
				<p className='mb-1 text-sm text-gray-500 uppercase'>{descripcion}</p>
				<p className='text-xl mb-1'>{formatearFecha(fechaEntrega)}</p>
				<p className='mb-1 text-gray-600'>
					Prioridad : <span className={`font-bold uppercase text-sm ${estiloPrioridad}`}>{prioridad}</span>
				</p>
				{estado && (
					<p className='text-xs bg-green-600 text-white font-bold uppercase p-1 rounded-lg'>
						Completada por : {tarea.completado.nombre}
					</p>
				)}
			</div>

			<div className='flex flex-col lg:flex-row gap-2'>
				{admin && (
					<button
						className='bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg hover:bg-indigo-800 transition-colors'
						onClick={() => {
							handleModalEditarTarea(tarea);
						}}
					>
						Editar
					</button>
				)}
				<button
					className={`${
						estado ? 'bg-sky-600 hover:bg-sky-800' : 'bg-gray-600 hover:bg-gray-800'
					} px-4 py-3 text-white uppercase font-bold text-sm rounded-lg transition-colors`}
					onClick={() => completarTarea(_id)}
				>
					{estado ? 'Completa' : 'Incompleta'}
				</button>

				{admin && (
					<button
						className='bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg hover:bg-red-800 transition-colors'
						onClick={() => {
							handleModalEliminarTarea(tarea);
						}}
					>
						Eliminar
					</button>
				)}
			</div>
		</div>
	);
}
