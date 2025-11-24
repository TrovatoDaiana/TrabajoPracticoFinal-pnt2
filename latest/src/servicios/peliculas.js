import axios from 'axios';

class ServicioPeliculas {
    #url = ''

    constructor(){
        // base URL del recurso (sin slash final para concatenar claramente)
        this.#url = 'https://69151a9d84e8bd126af89e10.mockapi.io/api/usuarios'
    }

    getAll = async () => {
        try {
            const { data : peliculas} = await axios.get(this.#url)
            return peliculas
        }
        catch(error) {
            console.error('Error productos GET', error.message)
        }
    }

    post = async pelicula=> {
        try {
            const { data:peliculaGuardada } = await axios.post(this.#url, pelicula)
            return peliculaGuardada
        }
        catch(error) {
            console.error('Error productos POST', error.message)
        }
    }


    put = async (id,pelicula) => {
        try {
            const { data:peliculaActualizada } = await axios.put(`${this.#url}/${id}`, pelicula)
            return peliculaActualizada
        }
        catch(error) {
            console.error('Error productos PUT', error.message)
        }
    }

    delete = async id => {
        try {
            const { data : peliculaEliminada } = await axios.delete(`${this.#url}/${id}`)
            return peliculaEliminada 
        }
        catch(error) {
            console.error('Error productos DELETE', error.message)
        }
    }
}

export default ServicioPeliculas
