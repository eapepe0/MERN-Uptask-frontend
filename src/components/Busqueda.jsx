import { Fragment, useState } from 'react';
import { Combobox, Dialog, Transition } from '@headlessui/react';
import useProyectos from '../hooks/useProyectos';
import { useNavigate } from 'react-router-dom';

/**
|--------------------------------------------------
| toma una o más cadenas de clases CSS como argumentos y devuelve una cadena de clases limpia y concatenada, 
| eliminando las clases vacías o falsy y uniendo las clases restantes con un espacio.
|--------------------------------------------------
*/
function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

const Busqueda = () => {
	const [busqueda, setBusqueda] = useState(''); //* estado donde guardamos la busqueda
	const { handleBuscador, buscador, proyectos } = useProyectos();
	const navigate = useNavigate(); //* nos permite movernos por las paginas

	//* proyectosFiltrados es si busqueda es '' (nada un string vacio) es un array vacio o es un filtro donde el nombre de cada proyecto incluya los caracteres ingresados en busqueda
	const proyectosFiltrados =
		busqueda === ''
			? []
			: proyectos.filter((proyecto) => proyecto.nombre.toLowerCase().includes(busqueda.toLowerCase()));

	return (
		<Transition.Root show={buscador} as={Fragment} afterLeave={() => setBusqueda('')}>
			<Dialog
				as='div'
				className='fixed inset-0 z-10 overflow-y-auto mt-20 p-4 sm:p-20 md:p-20'
				onClose={handleBuscador}
			>
				<Transition.Child
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity' />
				</Transition.Child>

				<Transition.Child
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0 scale-95'
					enterTo='opacity-100 scale-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100 scale-100'
					leaveTo='opacity-0 scale-95'
				>
					<Combobox
						as='div'
						className='mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all'
						onChange={(proyecto) => {
							navigate(`/proyectos/${proyecto._id}`);
							location.reload();
							handleBuscador();
						}}
					>
						<div className='relative'>
							<Combobox.Input
								className='h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm'
								placeholder='Buscar...'
								onChange={(e) => setBusqueda(e.target.value)}
							/>
						</div>
						{/*  si proyectosFiltrados tiene algo ??? no es un array vacio []*/}
						{proyectosFiltrados.length > 0 && (
							<Combobox.Options static className='max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800'>
								{proyectosFiltrados.map((proyecto) => (
									/* por cada proyecto hacemos una option */
									<Combobox.Option
										key={proyecto._id}
										value={proyecto}
										/* al className le pasamos una estado active disparamos la funcion classNames la 1era parte son las clases de CSS por defecto y si tenemos active concatenamos bg-sky y el text-white*/
										className={({ active }) =>
											classNames('cursor-default select-none px-4 py-2', active && 'bg-sky-600 text-white')
										}
									>
										{proyecto.nombre}
									</Combobox.Option>
								))}
							</Combobox.Options>
						)}
					</Combobox>
				</Transition.Child>
			</Dialog>
		</Transition.Root>
	);
};

export default Busqueda;
