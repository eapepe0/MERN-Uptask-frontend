import useProyectos from '../hooks/useProyectos';

export default function Colaborador({ colaborador }) {
	const { nombre, email } = colaborador;
	const { handleModalEliminarColaborador } = useProyectos();

	return (
		<div className='border-blur p-5 flex justify-between items-center'>
			<div>
				<p className='text-sm font-bold uppercase'>{nombre}</p>
			</div>
			<p className='text-sm text-gray-700'>{email}</p>
			<div>
				<button
					type='button'
					className='bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg'
					onClick={() => handleModalEliminarColaborador(colaborador)}
				>
					Eliminar
				</button>
			</div>
		</div>
	);
}
