<template>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

    <nav class="navbar navbar-expand-lg navbar-dark navbar-secondary fixed-top" role="navigation" style="top: 56px;">
        <div class="container">
            <span class="navbar-brand text-white">
                <img src="/images/Logo_Blanco_IMSSB.png" alt="Logo IMSS-Bienestar" width="155">
            </span>
            <div class="collapse navbar-collapse justify-content-end" id="navbar_2">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <a href="/#/home" class="nav-link text-white hover-list letra">Inicio</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a href="#" class="nav-link text-white dropdown-toggle letra" id="scroll1" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            SiHABI
                        </a>
                        <ul class="dropdown-menu navbar-secondary" aria-labelledby="scroll1">
                            <li>
                                <a class="dropdown-item text hover-list" href="https://www.gob.mx/cms/uploads/attachment/file/
                  718646/AVISO_PRIVACIDAD_INTEGRAL._CAPACITACI_N_CFCPS-ABRIL2022.pdf" target="_blank"
                                    rel="noopener noreferrer">
                                    <i class="bi bi-lock-fill"></i> Aviso de privacidad
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item text hover-list" href="https://capacitacion.insabi.gob.mx/blog/"
                                    target="_blank" rel="noopener noreferrer">
                                    <i class="bi bi-blockquote-left"></i> Blog
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item text hover-list"
                                    href="https://capacitacion.insabi.gob.mx/directory" target="_blank"
                                    rel="noopener noreferrer">
                                    <i class="bi bi-folder-fill"></i> Directorio
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item text hover-list"
                                    href="https://capacitacion.insabi.gob.mx/personal-info">
                                    <i class="bi bi-book-fill" rel="noopener noreferrer"></i> Ir a los cursos
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item text hover-list"
                                    href="https://capacitacion.insabi.gob.mx/oferta-educativa" target="_blank"
                                    rel="noopener noreferrer">
                                    <i class="bi bi-bookmark-check-fill"></i> Oferta educativa
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item text hover-list" href="https://capacitacion.insabi.gob.mx/faq"
                                    target="_blank" rel="noopener noreferrer">
                                    <i class="bi bi-question-circle-fill"></i> Preguntas frecuentes
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>


</script>

<style>
.navbar-secondary {
    z-index: 100;
    margin-top: 8px;
}

.navbar-main .bg-verde-claro,
.navbar-secondary {
    background-color: #a57f2c;
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

.navbar-toggler-icon {
    display: block;
    /* Asegúrate de que el icono se muestre como un bloque */
    width: 24px;
    /* Ancho del icono */
    height: 24px;
    /* Alto del icono */
    background-color: #fff;
    /* Color de fondo del icono */
}

#contenedorButtonActivate {
    position: relative;
    top: 4px;
    color: white;
    transition: transform 0.3s ease;
}


#contenedorButtonActivate:hover {
    text-decoration: none;
    background-color: transparent;
    transform: scale(1.2);
}
</style>
