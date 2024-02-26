import { useState } from 'react';
import { Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';

export default function Registrar() {
	const [nombre, setNombre] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repetirPassword, setRepetirPassword] = useState('');
	const [alerta, setAlerta] = useState({});

	const verificarCamposVacios = () => {
		return [nombre, email, password, repetirPassword].includes('');
	};

	const verificarPassword = () => {
		return password !== repetirPassword;
	};

	const verificarLongitudPassword = () => {
		return password.length < 6;
	};

	const verificar = (verificacion, mensaje) => {
		if (verificacion()) {
			setAlerta({
				msg: mensaje,
				error: true,
			});
			return true;
		}
		return false;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (verificar(verificarCamposVacios, 'Todos los campos son obligatorios')) return;

		if (verificar(verificarPassword, 'Los passwords no son iguales')) return;

		if (verificar(verificarLongitudPassword, 'El password es muy corto, tiene que ser mínimo de 6 caracteres')) return;
		setAlerta({}); //* dejamos de mostrar el alerta

		//* consultamos la API

		try {
			//* post los datos del form , nombre , email , password => de la respuesta extraemos data
			const { data } = await clienteAxios.post('/usuarios', {
				nombre,
				email,
				password,
			});
			//* ponemos la respuesta en el alerta que sale arriba del form , ponemos error en false , asi se dibuja con el color azul
			setAlerta({ msg: data.msg, error: false });

			setNombre('');
			setEmail('');
			setPassword('');
			setRepetirPassword('');
		} catch (error) {
			//* si nos da un error la peticion
			//* ponemos el error en la alerta y ponermos error en true, asi lo dibuja con el color colorado
			setAlerta({ msg: error.response.data.msg, error: true });
		}
	};

	const { msg } = alerta; //* extraermos el mensaje de alerta

	return (
		<>
			<h1 className='text-sky-600 font-black text-6xl capitalize'>
				Crea tu cuenta y administra tus
				<span className='text-slate-700'> proyectos</span>
			</h1>

			{msg && <Alerta alerta={alerta} />}
			<form onSubmit={handleSubmit} className='my-10 bg-white shadow rounded-lg p-10'>
				<div className='my-5'>
					<label htmlFor='nombre' className='text-gray-600 uppercase block text-base font-bold'>
						Nombre
					</label>
					<input
						id='nombre'
						type='text'
						placeholder='¿Cual es tu nombre?'
						className='w-full mt-3 p-3 border focus:outline-none focus:border-sky-700 rounded-xl bg-gray-50'
						value={nombre}
						onChange={(e) => setNombre(e.target.value)}
					/>
				</div>
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
				<div className='my-5'>
					<label htmlFor='password2' className='text-gray-600 uppercase block text-base font-bold'>
						Repite el Password
					</label>
					<input
						id='password2'
						type='password'
						placeholder='Repetir el password'
						className='w-full mt-3 p-3 border focus:outline-none focus:border-sky-700 rounded-xl bg-gray-50'
						value={repetirPassword}
						onChange={(e) => setRepetirPassword(e.target.value)}
					/>
				</div>
				<input
					type='submit'
					value='Crear cuenta'
					className='bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors'
				/>
			</form>
			<nav className='lg:flex lg:justify-between'>
				<Link to='/' className='block text-center my-5 text-slate-500 uppercase text-sm'>
					¿Ya tienes una cuenta? <span className='font-bold text-sky-600'>Inicia Sesion</span>
				</Link>
				<Link to='/olvide-password' className='block text-center my-5 text-slate-500 uppercase text-sm'>
					<span className='font-bold text-sky-600'>Olvide </span> mi password
				</Link>
			</nav>
		</>
	);
}

/* if ([nombre, email, password, repetirPassword].includes("")) {
    //* si alguno de los campos esta vacio
    setAlerta({
      msg: "Todos los campos son obligatorios",
      error: true,
    });
    return; //* no se sigue ejecutando el codigo
  }

  if (password !== repetirPassword) {
    //* si los passwords no son iguales
    setAlerta({
      msg: "Los passwords no son iguales",
      error: true,
    });
    return;
  }

  if (password.length < 6) {
    //* si el password tiene menos de 6 caracteres
    setAlerta({
      msg: "El password es muy corto , tiene que ser minimo de 6 caracteres",
      error: true,
    });
    return;
  }
 */
