import { useState, useEffect } from 'react';
import useProyectos from '../hooks/useProyectos.js';
import Alerta from './Alerta';
import { useParams } from 'react-router-dom';

export default function FormularioProyecto() {
	const [nombre, setNombre] = useState('');
	const [descripcion, setDescripcion] = useState('');
	const [fechaEntrega, setFechaEntrega] = useState('');
	const [cliente, setCliente] = useState('');

	const [idProyectoEditando, setIdProyectoEditando] = useState(null); //* cuando carga este estado se pone null y si lo editamos le cargamos el id que mandamos por la url

	const { id } = useParams(); //* si estamos editando , extrae el id , si estamos creando un  proyecto se pone en undefined

	const { mostrarAlerta, alerta, submitProyecto, proyecto } = useProyectos();

	//* este useEffect se ejecuta cuando hay un id
	useEffect(() => {
		//* si el id existe y no es undefined
		if (id) {
			setIdProyectoEditando(proyecto._id); //* cargamos un id en este estado nos sirve para cambiar el texto del boton
			setNombre(proyecto.nombre);
			setDescripcion(proyecto.descripcion);
			setFechaEntrega(proyecto.fechaEntrega?.split('T')[0]); //* el formato de la fecha es "2024-02-03T00:30:35.464Z" pero el formulario usa DD/MM/AAAA hacemos un split entre la T y tomamos la 1era parte
			setCliente(proyecto.cliente);
		}
	}, [id]);

	const resetearFormulario = () => {
		setIdProyectoEditando(null);
		setNombre('');
		setDescripcion('');
		setFechaEntrega('');
		setCliente('');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if ([nombre, descripcion, fechaEntrega, cliente].includes('')) {
			mostrarAlerta({
				msg: 'Todos los campos son obligatorios',
				error: true,
			});
			return;
		}
		//* si el formulario es para crear , el id pasado es null , si es para editar el id pasado sera el pasado por la url
		await submitProyecto({ id, nombre, descripcion, fechaEntrega, cliente });
		resetearFormulario(); //* vaciamos el formulario
	};

	const { msg } = alerta;
	return (
		<form action='' className='bg-white py-10 px-5 md:w-1/2 rounded-lg' onSubmit={handleSubmit}>
			{msg && <Alerta alerta={alerta} />}
			<div className='mb-5'>
				<label htmlFor='nombre' className='text-gray-700 uppercase font-bold text-sm'>
					Nombre Proyecto
				</label>
				<input
					type='text'
					id='nombre'
					className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
					placeholder='Nombre del Proyecto'
					value={nombre}
					onChange={(e) => setNombre(e.target.value)}
				/>
			</div>

			<div className='mb-5'>
				<label htmlFor='descripcion' className='text-gray-700 uppercase font-bold text-sm'>
					Descripcion
				</label>
				<textarea
					type='text'
					id='descripcion'
					className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
					placeholder='Descripcion del Proyecto'
					value={descripcion}
					onChange={(e) => setDescripcion(e.target.value)}
				/>
			</div>

			<div className='mb-5'>
				<label htmlFor='fechaEntrega' className='text-gray-700 uppercase font-bold text-sm'>
					Fecha de Entrega
				</label>
				<input
					type='date'
					id='fechaEntrega'
					className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
					placeholder='Fecha de entrega del Proyecto'
					value={fechaEntrega}
					onChange={(e) => setFechaEntrega(e.target.value)}
				/>
			</div>
			<div className='mb-5'>
				<label htmlFor='cliente' className='text-gray-700 uppercase font-bold text-sm'>
					Cliente
				</label>
				<input
					type='text'
					id='cliente'
					className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
					placeholder='Cliente del Proyecto'
					value={cliente}
					onChange={(e) => setCliente(e.target.value)}
				/>
			</div>

			<input
				type='submit'
				value={idProyectoEditando ? 'Actualizar Proyecto' : 'Crear Proyecto'}
				className='bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors'
			/>
		</form>
	);
}
