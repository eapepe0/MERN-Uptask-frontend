import { useState } from 'react';
import Alerta from './Alerta';
import useProyectos from '../hooks/useProyectos';

export default function FormularioColaborador() {
	const [email, setEmail] = useState('');

	const { mostrarAlerta, alerta, submitColaborador } = useProyectos();
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (email === '') {
			mostrarAlerta({
				msg: 'El email no debe estar vacio',
				error: true,
			});
			return;
		}

		await submitColaborador(email);
	};

	const { msg } = alerta;
	return (
		<form className='bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow' onSubmit={handleSubmit}>
			{msg && <Alerta alerta={alerta} />}
			<div className='mb-5'>
				<label htmlFor='email' className='text-gray-700 uppercase text-sm font-bold'>
					Email del Colaborador
				</label>
				<input
					type='email'
					id='email'
					placeholder='Email del usuario'
					className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>

			<input
				type='submit'
				className='bg-sky-600 hover:bg-sky-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded text-sm'
				value='Buscar colaborador'
			/>
		</form>
	);
}
