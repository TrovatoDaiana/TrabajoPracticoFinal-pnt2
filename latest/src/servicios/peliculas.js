import axios from 'axios';

class ServicioPeliculas {
    #url = ''

    constructor(){
        // base URL del recurso (sin slash final para concatenar claramente)
        this.#url = 'https://69151a9d84e8bd126af89e10.mockapi.io/api/usuarios'
    }

    async getAll(){
        try{
            const { data: peliculas } = await axios.get(this.#url);
            return peliculas;
        } catch(error){
            console.error('Error en getAll:', error.message);
            throw error;
        }
    }

    // Usar sólo `post` como API pública 
    async post(pelicula){
        try{
            const { data: creada } = await axios.post(this.#url, pelicula);
            return creada;
        } catch(error){
            console.error('Error en post:', error.message);
        }
    }

    async put(id, pelicula){
        try{
            const { data: actualizada } = await axios.put(`${this.#url}/${id}`, pelicula);
            return actualizada;
        } catch(error){
            console.error('Error en put:', error.message);
            throw error;
        }
    }

    async delete(id){
        try{
            const { data } = await axios.delete(`${this.#url}/${id}`);
            return data;
        } catch(error){
            console.error('Error en delete:', error.message);
            throw error;
        }
    }
}

export default ServicioPeliculas