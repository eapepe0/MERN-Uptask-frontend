import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Alerta from '../components/Alerta.jsx';
import clienteAxios from '../config/clienteAxios.js';

export default function ConfirmarCuenta() {
	const [alerta, setAlerta] = useState({}); //* guardamos el estado de la alerta
	const [cuentaConfirmada, setCuentaConfirmada] = useState(false); //* guardamos si la cuenta esta confirmada
	const params = useParams(); //* aca tenemos los parametros pasados por la url
	const { token } = params; //* extraemos el token de la url

	useEffect(() => {
		const confirmarCuenta = async () => {
			try {
				const { data } = await clienteAxios.get(`/usuarios/confirmar/${token}`); //* hacemos un get a la url y la respuesta se almacena en data
				//* ponemos el estado alerta, con el mensaje que nos da data , y ponemos error en falso asi tenemos el estilo azul
				setAlerta({
					msg: data.msg,
					error: false,
				});

				setCuentaConfirmada(true); //* ponemos el estado en true
			} catch (error) {
				//* si hay algun error
				setAlerta({
					msg: error.response.data.msg,
					error: true,
				});
				setCuentaConfirmada(false);
			}
		};
		confirmarCuenta(); //* llamamos a la funcion , al no tener una dependencia , se disparara cuando se cargue el componente 1 sola vez al sacar el <StrictMode> de main.jsx
	}, []);

	const { msg } = alerta; //* extraemos del estado alerta , el mensaje
	return (
		<>
			<h1 className='text-sky-600 font-black text-6xl capitalize'>
				Confirma tu cuenta, asi puedes crear y administrar tus
				<span className='text-slate-700'> proyectos</span>
			</h1>

			<div className='mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white'>
				{msg && <Alerta alerta={alerta} />}

				{cuentaConfirmada && (
					<Link to='/' className='block text-center my-5 text-slate-500 uppercase text-sm'>
						Iniciar Sesion
					</Link>
				)}
			</div>
		</>
	);
}
