<template>
    <nav class="navbar navbar-expand-lg navbar-main navbar-dark fixed-top">
        <div class="container">
            <a class="navbar-brand" href="https://www.gob.mx/" rel="noopener noreferrer">
                <img src="https://framework-gb.cdn.gob.mx/gobmx/img/logo_blanco.svg" width="128" height="48"
                    alt="Página de inicio, Gobierno de México">
            </a>
            <button class="navbar-toggler" type="button" @click="toggleMenu" aria-controls="navbar_1"
                aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbar_1">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item px-2">
                        <a class="nav-link text-white hover-list letra" aria-current="page"
                            href="https://www.gob.mx/tramites" target="_blank" rel="noopener noreferrer">Trámites</a>
                    </li>
                    <li class="nav-item px-2">
                        <a class="nav-link text-white hover-list letra" href="https://www.gob.mx/gobierno"
                            target="_blank" rel="noopener noreferrer">Gobierno</a>
                    </li>
                    <li class="nav-item px-2">
                        <a class="nav-link text-white hover-list" href="https://www.gob.mx/busqueda" target="_blank"
                            rel="noopener noreferrer">
                            <img src="https://educacion.imssbienestar.gob.mx/images/icons/scout.svg" alt="">
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <AppMenu :visible="showMenu" />
</template>

<script setup>


</script>

<style lang="scss" scoped>
.navbar-main {
    background-color: #611232;
    z-index: 1031;
}

.fixed-bottom,
.fixed-top {
    left: 0;
    position: fixed;
    right: 0;
    z-index: 1030;
}

.fixed-top {
    top: 0;
}

.letra {
    color: white;
    font-size: 14px;
    font-family: 'Patria';
}

@media (min-width: 992px) {
    .navbar-expand-lg {
        flex-flow: row nowrap;
        justify-content: flex-start;
    }
}
</style>
