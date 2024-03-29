import { useEffect } from 'react';
import FormularioColaborador from '../components/FormularioColaborador';
import useProyectos from '../hooks/useProyectos';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Alerta from '../components/Alerta';

export default function NuevoColaborador() {
	const { obtenerProyecto, proyecto, cargando, colaborador, agregarColaborador, alerta } = useProyectos();
	const { id } = useParams();

	useEffect(() => {
		obtenerProyecto(id);
	}, []);

	if (!proyecto?._id) return <Alerta alerta={alerta} />;
	return (
		<div>
			<h1 className='text-4xl font-black'>Añadir Colaborador/a al Proyecto : {proyecto.nombre}</h1>
			<div className='mt-10 flex justify-center'>
				<FormularioColaborador />
			</div>
			{cargando ? (
				<div className='text-center mt-20'>
					<Spinner />
				</div>
			) : (
				colaborador?._id && (
					<div className='flex justify-center mt-10'>
						<div className='bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow'>
							<h2 className='text-center mb-10 text-2xl font-bold'>Resultado :</h2>
							<div className='flex justify-between items-center'>
								<p>{colaborador.nombre}</p>
								<button
									type='button'
									className='bg-slate-500 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm hover:bg-slate-800 transition-colors'
									onClick={() => agregarColaborador({ email: colaborador.email })}
								>
									Agregar al Proyecto
								</button>
							</div>
						</div>
					</div>
				)
			)}
		</div>
	);
}
