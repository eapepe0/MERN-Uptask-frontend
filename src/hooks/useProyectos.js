import { useContext } from 'react'
import { ProyectosContext } from '../context/ProyectosProvider'

const useProyectos = () => {
    return useContext(ProyectosContext)
}

export default useProyectos

//* lo usamos importando primero donde lo vayamos a usar :
//*
//* import useProyectos from 'ruta del hook'
//*
//* const { datos que vayamos a sacar del Provider } = useProyectos()
//* crear el useProyectos en la carpeta /hooks/