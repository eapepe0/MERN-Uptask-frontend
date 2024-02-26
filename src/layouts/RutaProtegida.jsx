import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function RutaProtegida() {
	const { auth, cargando } = useAuth(); //* extraemos auth y cargado del AuthProvider

	if (cargando) return 'Cargando'; //* si cargando existe , significa que todavia estamos viendo si existe el token o si nos logueamos

	/*  si auth no esta vacio significa que hay un token , mostramos el <Outlet/> , sino redirigimos al <Login/> */

	return (
		<>
			{Object.keys(auth).length > 0 ? (
				<div className='bg-gray-100'>
					<Header />
					<div className='md:flex md:min-h-screen'>
						<Sidebar />
						<main className='flex-1 p-10'>
							<Outlet />
						</main>
					</div>
				</div>
			) : (
				<Navigate to='/' />
			)}
		</>
	);
}
