import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function PreviewProyecto({ proyecto }) {
	const { auth } = useAuth();

	const { nombre, _id, cliente, creador } = proyecto;
	return (
		<div className='border-b p-5 flex flex-col md:flex-row justify-between'>
			<div className='flex  items-center gap-2 '>
				<p className='flex-1'>
					{nombre}
					<span className='text-sm text-white uppercase rounded-lg bg-sky-600 px-1 ml-3'>{cliente}</span>
				</p>
				{auth._id !== creador && (
					<p className='p-1 text-xs rounded-lg text-white bg-green-500 font-black uppercase'>Colaborador</p>
				)}
			</div>
			<Link to={`${_id}`} className='text-gray-600 hover:text-gray-800 uppercase text-sm font-bold'>
				Ver Proyecto
			</Link>
		</div>
	);
}

PreviewProyecto.propTypes = {
	proyecto: PropTypes.shape({
		cliente: PropTypes.string,
		colaboradores: PropTypes.array,
		creador: PropTypes.string,
		createdAt: PropTypes.string,
		descripcion: PropTypes.string,
		fechaEntrega: PropTypes.string,
		nombre: PropTypes.string,
		updatedAt: PropTypes.string,
		__v: PropTypes.number,
		_id: PropTypes.string,
	}),
};
