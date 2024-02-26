import { Link, useNavigate } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';
import { useState } from 'react';
import Alerta from '../components/Alerta';
import useAuth from '../hooks/useAuth';

export default function Login() {
	const [email, setEmail] = useState(''); //* estado que guardamos el email del form
	const [password, setPassword] = useState(''); //* guardamos el password del form
	const [alerta, setAlerta] = useState({}); //* estado que contiene un objeto el cual le pasamos al componente <Alerta/>

	const { msg } = alerta; //* extraemos el msg de alerta

	const { setAuth } = useAuth(); //* extraemos el setAuth sirve para poner datos en el estado auth

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault(); //* prevenimos que se actualice la pantalla al hacer submit en el form
		//* si el email o el password estan vacios
		if ([email, password].includes('')) {
			//* ponemos en el estado alerta , un error para que se muestre el componente <Alerta />
			setAlerta({
				msg: 'Todos los campos son obligatorios',
				error: true,
			});
			return; //* detenemos la ejecucion
		}

		//* si el email y el password no estan vacios
		//* le enviamos el email y el password a login
		try {
			const { data } = await clienteAxios.post('/usuarios/login', {
				email,
				password,
			});
			setAlerta({}); //* borramos las alertas
			localStorage.setItem('token', data.token); //* ponemos el token en el LS
			setAuth(data); //* ponemos la data en auth
			navigate('/proyectos');
		} catch (error) {
			setAlerta({ msg: error.response.data.msg, error: true }); //* si hay algun error ponemos el mensaje de error en alerta
		}
	};
	return (
		<>
			<h1 className='text-sky-600 font-black text-6xl capitalize'>
				Inicia sesión y administra tus
				<span className='text-slate-700'> proyectos</span>
			</h1>
			{msg && <Alerta alerta={alerta} />}
			<form action='' onSubmit={handleSubmit} className='my-10 bg-white shadow rounded-lg p-10'>
				<div className='my-5'>
					<label htmlFor='email' className='text-gray-600 uppercase block text-base font-bold'>
						Email
					</label>
					<input
						id='email'
						type='email'
						placeholder='Email de Registro'
						className='w-full mt-3 p-3 border focus:outline-none focus:border-sky-700 rounded-xl bg-gray-50'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				<div className='my-5'>
					<label htmlFor='password' className='text-gray-600 uppercase block text-base font-bold'>
						Password
					</label>
					<input
						id='password'
						type='password'
						placeholder='Password de Registro'
						className='w-full mt-3 p-3 border focus:outline-none focus:border-sky-700 rounded-xl bg-gray-50'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				<input
					type='submit'
					value='Iniciar Sesion'
					className='bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors'
				/>
			</form>
			<nav className='lg:flex lg:justify-between'>
				<Link to='registrar' className='block text-center my-5 text-slate-500 uppercase text-sm'>
					¿No tienes una cuenta? <span className='font-bold text-sky-600'>Registrate</span>
				</Link>
				<Link to='olvide-password' className='block text-center my-5 text-slate-500 uppercase text-sm'>
					<span className='font-bold text-sky-600'>Olvide </span> mi password
				</Link>
			</nav>
		</>
	);
}
