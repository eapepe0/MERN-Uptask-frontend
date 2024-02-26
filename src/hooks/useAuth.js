import { useContext } from 'react'
import AuthContext
    from '../context/AuthProvider.jsx'

const useAuth = () => {
    return useContext(AuthContext)
}

export default useAuth

//* lo usamos importando primero donde lo vayamos a usar :
//*
//* import useauth from 'ruta del hook'
//*
//* const { datos que vayamos a sacar del Provider } = useAuth()
//* crear el useAuth en la carpeta /hooks/