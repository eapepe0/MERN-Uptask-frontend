import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Alerta from '../components/Alerta.jsx';
import clienteAxios from '../config/clienteAxios.js';

export default function NuevoPassword() {
	const { token } = useParams(); //* extraemos el token de la url

	const [tokenValido, setTokenValido] = useState(false); //* estado que maneja si el token es valido o no

	const [alerta, setAlerta] = useState({}); //* estado que maneja la alerta, el cual le pasamos al componente <Alerta/>

	const [nuevoPassword, setNuevoPassword] = useState(''); //* estado que maneja el password que se pone en el input

	const [passwordModificado, setPasswordModificado] = useState(false); //* estado que maneja si el password fue modicado

	//* se ejecuta en la carga del la pagina
	useEffect(() => {
		const comprobarToken = async () => {
			try {
				//* enviamos el token a la url
				await clienteAxios.get(`/usuarios/olvide-password/${token}`);
				//* si no se ejecuta el catch el cual seria por un error de la peticion
				//* ponemos true
				setTokenValido(true);
			} catch (error) {
				//* si hay un error
				//* ponemos el estado que maneja la Alerta
				setAlerta({
					msg: error.response.data.msg,
					error: true,
				});
			}
		};
		comprobarToken();
	}, []);

	//* apretamos el boton
	const handleSubmit = async (e) => {
		e.preventDefault(); //* prevenimos que se recargue la pagina

		//* comprobamos que el password sea menor de 6 y ponemos un error
		if (nuevoPassword.length < 6) {
			setAlerta({
				msg: 'El password debe ser minimo 6 caracteres',
				error: true,
			});
			//* detenemos la ejecucion
			return;
		}

		try {
			//* extraemos data de la respuesta a la peticion donde enviamos el password nuevo
			const { data } = await clienteAxios.post(`/usuarios/olvide-password/${token}`, { password: nuevoPassword });

			//* va a ser correcto por que sino salta al catch
			//* mostramos el resutado en alerta
			setAlerta({
				msg: data.msg,
				error: false,
			});
			setPasswordModificado(true); //* ponemos el estado en true , asi renderizamos el iniciar sesion

			//* si hubo un error en la peticion , ponemos en mensaje
		} catch (error) {
			setAlerta({
				msg: error.response.data.msg,
				error: true,
			});
		}
	};
	const { msg } = alerta; //* extraermos el mensaje de alerta
	return (
		<>
			<h1 className='text-sky-600 font-black text-6xl capitalize'>
				Reestablece tu password y administra tus
				<span className='text-slate-700'> proyectos</span>
			</h1>
			{msg && <Alerta alerta={alerta} />}
			{/* si el token es valido , mostramos el form para poder cambiarlo */}
			{tokenValido && !passwordModificado ? (
				<>
					<form action='' className='my-10 bg-white shadow rounded-lg p-10' onSubmit={handleSubmit}>
						<div className='my-5'>
							<label htmlFor='password' className='text-gray-600 uppercase block text-base font-bold'>
								Nuevo Password
							</label>
							<input
								id='password'
								type='password'
								placeholder='Escribe tu nuevo Password'
								className='w-full mt-3 p-3 border focus:outline-none focus:border-sky-700 rounded-xl bg-gray-50'
								value={nuevoPassword}
								onChange={(e) => setNuevoPassword(e.target.value)}
							/>
						</div>

						<input
							type='submit'
							value='Guardar Nuevo Password'
							className='bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors'
						/>
					</form>
				</>
			) : (
				<></>
			)}
			{passwordModificado && (
				<Link to='/' className='block text-center my-5 text-slate-500 uppercase text-sm'>
					Iniciar Sesion
				</Link>
			)}
		</>
	);
}
