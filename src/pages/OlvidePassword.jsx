import { useState } from 'react';
import { Link } from 'react-router-dom';
import Alerta from '../components/Alerta.jsx';
import clienteAxios from '../config/clienteAxios.js';

export default function OlvidePassword() {
	const [email, setEmail] = useState(''); //* guardamos el email ingresado en el form
	const [alerta, setAlerta] = useState({}); //* estado que es un objeto , el cual se encarga de pasarle los parametros a el componente Alerta

	//* funcion de submit del form
	const handleSubmit = async (e) => {
		e.preventDefault(); //* prevenimos que se recargue la pantalla cuando hacemos el submit

		//* si el email ingresado esta vacio o es menor a 6 digitos
		if (email === '' || email.length < 6) {
			//* ponemos el estado alerta con un mensaje y ponemos error en true => encargado de darle el estilo con fondo rojo
			setAlerta({
				msg: 'Ingresa un email valido',
				error: true,
			});
			//* cortamos la ejecucion
			return;
		}

		try {
			//* extraemos data de el posteo donde enviamos el email , olvide-password
			const { data } = await clienteAxios.post('/usuarios/olvide-password', { email });
			//* si es correcto ponemos los datos en alerta , y error en false => estilos fondo azul
			setAlerta({
				msg: data.msg,
				error: false,
			});

			//* si falla algo del post con axios va a venir al catch
		} catch (error) {
			//* ponemos alerta , con el mensaje que nos devuelve axios , error true => estilo rojo
			setAlerta({
				msg: error.response.data.msg,
				error: true,
			});
		}
	};

	//* extraemos el mensaje del estado alerta
	const { msg } = alerta;
	return (
		<>
			<h1 className='text-sky-600 font-black text-6xl capitalize'>
				Recupera tu acesso y no pierdas tus
				<span className='text-slate-700'> proyectos</span>
			</h1>
			{/* si existe el mensaje mostramos el componente Alerta */}
			{msg && <Alerta alerta={alerta} />}
			<form onSubmit={handleSubmit} className='my-10 bg-white shadow rounded-lg p-10'>
				<div className='my-5'>
					<label htmlFor='email' className='text-gray-600 uppercase block text-base font-bold'>
						Email
					</label>
					<input
						id='email'
						type='email'
						placeholder='Email de Registro'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className='w-full mt-3 p-3 border focus:outline-none focus:border-sky-700 rounded-xl bg-gray-50'
					/>
				</div>

				<input
					type='submit'
					value='Enviar Instrucciones'
					className='bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors'
				/>
			</form>
			<nav className='lg:flex lg:justify-between'>
				<Link to='/' className='block text-center my-5 text-slate-500 uppercase text-sm'>
					¿Ya tienes una cuenta? <span className='font-bold text-sky-600'>Inicia Sesion</span>
				</Link>
				<Link to='/registrar' className='block text-center my-5 text-slate-500 uppercase text-sm'>
					¿No tienes una cuenta? <span className='font-bold text-sky-600'>Registrate</span>
				</Link>
			</nav>
		</>
	);
}
