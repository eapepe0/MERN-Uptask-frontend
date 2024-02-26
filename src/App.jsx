import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/Login';
import Registrar from './pages/Registrar';
import OlvidePassword from './pages/OlvidePassword';
import NuevoPassword from './pages/NuevoPassword';
import ConfirmarCuenta from './pages/ConfirmarCuenta';
import RutaProtegida from './layouts/RutaProtegida';
import Proyectos from './pages/Proyectos';
import Proyecto from './pages/Proyecto';

import { AuthProvider } from './context/AuthProvider.jsx';
import NuevoProyecto from './pages/NuevoProyecto.jsx';
import NuevoColaborador from './pages/NuevoColaborador.jsx';
import { ProyectosProvider } from './context/ProyectosProvider.jsx';
import EditarProyecto from './pages/EditarProyecto.jsx';

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<ProyectosProvider>
					<Routes>
						{/* area publica */}
						<Route path='/' element={<AuthLayout />}>
							{/* todos los elementos se ejecutan dentro del Layouth Auth , donde el elemento principal es Login */}
							<Route index element={<Login />} />
							<Route path='registrar' element={<Registrar />} />
							<Route path='olvide-password' element={<OlvidePassword />} />
							<Route path='olvide-password/:token' element={<NuevoPassword />} />
							<Route path='confirmar/:token' element={<ConfirmarCuenta />} />
						</Route>
						{/* area privada */}
						<Route path='/proyectos' element={<RutaProtegida />}>
							<Route index element={<Proyectos />} />
							<Route path='crear-proyecto' element={<NuevoProyecto />} />
							<Route path='nuevo-colaborador/:id' element={<NuevoColaborador />} />

							<Route path=':id' element={<Proyecto />} />

							<Route path='editar/:id' element={<EditarProyecto />} />
						</Route>
					</Routes>
				</ProyectosProvider>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
