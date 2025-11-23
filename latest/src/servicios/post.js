import axios from "axios";  

 export const obtenerPosts = async () => { 
     try {
        // GET request — no enviar `postData` aquí (provocaba ReferenceError si no estaba definido)
        const { data: posts } = await axios.get('https://jsonplaceholder.typicode.com/posts');
        return posts;
    } catch (error) {
        console.error("Error en la peticion:", error);
        throw error;
    } 
}
