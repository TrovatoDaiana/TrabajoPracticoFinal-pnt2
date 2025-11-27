<template>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-3">
        <div class="container-fluid justify-content-center">
            <RouterLink class="navbar-brand" to="/">Inicio</RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/grillaPeliculas"> Lista de Peliculas</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/favoritas">Tus Favoritas</RouterLink>
                    </li>
					<li class="nav-item">
                        <RouterLink class="nav-link" to="/ranking">Ranking Peliculas</RouterLink>
                    </li>
					<li class="nav-item">
 						<RouterLink class="nav-link" to="/randomMovie">Random Movie</RouterLink>
					</li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
    name: 'Navbar',
    components: {
        RouterLink
    }
};
</script>

<style scoped>
.navbar {
    background-color: #141414; 
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
}

.navbar-brand {
    font-size: 1.5rem;
    color: #e50914;
    font-weight: bold;
    text-transform: uppercase;
}

.navbar-brand:hover {
    color: #f40612; 
}

.nav-link {
    color: #ffffff; 
    font-size: 1.2rem;
    margin: 0 15px;
    transition: color 0.3s ease;
}

.nav-link:hover {
    color: #e50914; 
}

.nav-item {
    text-align: center;
}

.container-fluid {
    display: flex;
    justify-content: center;
    align-items: center;
}

.navbar-toggler {
    border-color: #e50914; 
}

.navbar-toggler-icon {
    background-color: #e50914; 
}
</style>