<template>
    <footer class="main-footer">
        <br><br>
        <div class="list-info">
            <div class="container">
                <div class="row">
                    <div class="col-sm-3"><img data-v-9e928f9a=""
                            src="https://framework-gb.cdn.gob.mx/gobmx/img/logo_blanco.svg" href="/"
                            alt="logo gobierno de mÃƒÂ©xico" class="logo_footer" style="max-width: 90%;"></div>
                    <div class="col-sm-3">
                        <h5 class="letra">Enlaces</h5>
                        <ul>
                            <li><a class="letra" href="https://participa.gob.mx" target="_blank" rel="noopener"
                                    title="Enlace abre en ventana nueva">Participa</a></li>
                            <li><a class="letra" href="https://www.gob.mx/publicaciones" target="_blank" rel="noopener"
                                    title="Enlace abre en ventana nueva">Publicaciones Oficiales</a></li>
                            <li><a class="letra" href="http://www.ordenjuridico.gob.mx" target="_blank" rel="noopener"
                                    title="Enlace abre en ventana nueva">Marco Jurídico</a></li>
                            <li><a class="letra" href="https://consultapublicamx.inai.org.mx/vut-web/" target="_blank"
                                    rel="noopener" title="Enlace abre en ventana nueva">Plataforma Nacional de
                                    Transparencia</a></li>
                            <li><a class="letra" href="https://alertadores.funcionpublica.gob.mx/" target="_blank"
                                    rel="noopener" title="Enlace abre en ventana nueva">Alerta</a></li>
                            <li><a class="letra" href="https://sidec.funcionpublica.gob.mx" target="_blank"
                                    rel="noopener" title="Enlace abre en ventana nueva">Denuncia</a></li>
                        </ul>
                    </div>
                    <div class="col-sm-3">
                        <h5 class="letra">¿Qué es gob.mx?</h5>
                        <p class="letra">Es el portal único de trámites, información y participación ciudadana. <a
                                class="letra" href="https://www.gob.mx/que-es-gobmx">Leer más</a></p>
                        <ul>
                            <li><a class="letra" href="https://datos.gob.mx">Portal de datos abiertos</a></li>
                            <li><a class="letra" href="https://www.gob.mx/accesibilidad">Declaración de
                                    accesibilidad</a></li>
                            <li><a class="letra" href="https://www.gob.mx/privacidadintegral">Aviso de privacidad
                                    integral</a></li>
                            <li><a class="letra" href="https://www.gob.mx/privacidadsimplificado">Aviso de privacidad
                                    simplificado</a>
                            </li>
                            <li><a class="letra" href="https://www.gob.mx/terminos">Términos y Condiciones</a></li>
                            <li><a class="letra"
                                    href="https://www.gob.mx/terminos#medidas-seguridad-informacion">Política de
                                    seguridad</a></li>
                            <li><a class="letra" href="https://www.gob.mx/sitemap">Mapa de sitio</a></li>
                        </ul>
                    </div>
                    <div class="col-sm-3">
                        <h5><a class="letra"
                                href="https://www.gob.mx/tramites/ficha/presentacion-de-quejas-y-denuncias-en-la-sfp/SFP54">Denuncia
                                contra servidores públicos</a></h5>
                        <h5 class="letra">Síguenos en</h5>
                        <ul class="list-inline">
                            <li><a class="social-icon facebook letra" target="_blank" rel="noopener"
                                    title="Enlace abre en ventana nueva" href="https://www.facebook.com/gobmexico"
                                    aria-label="Facebook de presidencia"></a></li>
                            <li><a class="social-icon twitter letra" target="_blank" rel="noopener"
                                    title="Enlace abre en ventana nueva" href="https://twitter.com/GobiernoMX"
                                    aria-label="Twitter de presidencia"></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid footer-pleca">
            <div class="row">
                <div class="col"><br><br></div>
            </div>
        </div>
    </footer>
</template>


<script>
export default {
    name: 'Footer'
};
</script>


<style>
@media (min-width: 768px) {
    .main-footer {
        text-align: left;
    }
}

.main-footer {
    background-color: #611232;
    min-height: 300px;
    color: #FFF;
    padding: 0px 0 0px;
    text-align: left;
    font-weight: 300;
    position: relative;
}

article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
main,
menu,
nav,
section,
summary {
    display: block;
}

*,
:after,
:before {
    box-sizing: border-box;
}

body {
    word-wrap: break-word;
    padding-top: 46px;
    font-weight: 300;
    --font-family: 'Montserrat';
    font-size: 18px;
    line-height: 1.428571429;
}

html {
    font-size: 10px;
    -webkit-tap-highlight-color: transparent;
    --font-family: 'Montserrat';
    color: white;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
}

.letra {
    color: white;
    font-size: 14px;
}

.footer-pleca {
    background-color: #fff;
    background-image: url(https://framework-gb.cdn.gob.mx/gobmx/img/pleca.svg);
    background-repeat: repeat-x;
}

@media (max-width: 768px) {
    .list-info{
        background-color: #611232;
    }
}

@media (max-width: 1000px) {
    .list-info {
        background-color: #611232;
    }
}
</style>