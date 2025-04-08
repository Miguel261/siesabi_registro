<template>
    <div class="container col-11 position-relative container-carrucel crrcel">
        <!-- Contenedor principal flexible -->
        <div class="d-flex align-items-stretch">
            <!-- Contenedor de Logos Institucionales -->
            <div class="logos-container">
                <img src="/public/images/Logo_Blanco_IMSSB.png" alt="Logo Institucional 1">
                <img src="/public/images/Logo SiESABI Blanco.png" alt="Logo Institucional 2">
            </div>
            <!-- Carrusel de Noticias -->
            <div id="carouselNoticias" class="carousel slide flex-grow-1" data-bs-ride="carousel">
                <!-- Contenedor de las imágenes del carrusel -->
                <div class="carousel-inner btn-c">
                    <!-- Itera sobre las imágenes en imagesBanner -->
                    <div v-for="(image, index) in imagesBanner" :key="index" :class="['carousel-item', {
                        'active': index === currentIndex, 'slide-left':
                            index === currentIndex
                    }]">
                        <a :href="`${image.link}`" target="_blank">
                            <img :src="`${image.image_name}`" class="d-block w-100 img-carrucel"
                                :alt="`Noticia ${index + 1}`">
                        </a>
                    </div>
                </div>

                <button class="carousel-control-next btn-c col-1" type="button" @click="handleNext">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                </button>
            </div>
        </div>
    </div>

    <br><br><br>

    <div class="row cuadros col-12">
        <div class="cuadro col-12 col-md-10 col-lg-2" v-on:click="getPrivateNotice">
            <img src="/public/images/icons/Aviso.png" alt="">
            <label class="fuente-cuadros">Aviso de privacidad</label>
        </div>
        <div class="cuadro col-12 col-md-10 col-lg-2" v-on:click="getEducationalOffer">
            <img src="/public/images/icons/Catalogo.png" alt="">
            <label class="fuente-cuadros">Catálogo de Educación Continua y Permanente</label>
        </div>
        <div class="cuadro col-12 col-md-10 col-lg-2" v-on:click="pushDirectory">
            <img class="img-icons" src="/public/images/icons/Directorio.png" alt="">
            <label class="fuente-cuadros">Directorio</label>
        </div>
        <div class="cuadro col-12 col-md-10 col-lg-2" v-on:click="pushQuestions">
            <img src="/public/images/icons/Preg Frec.png" alt="">
            <label class="fuente-cuadros">Preguntas frecuentes</label>
        </div>
    </div>

    <div class="container-btn col-12">
        <button class="button-green col-12 col-md-12 col-lg-2 fuente-cuadros" icon="pi pi-search">
            Buscar cursos
        </button>
    </div>

    <br><br>

    <hr style="height: 1px; background-color: black;">

    <div class="container-btn">
        <div class="col-12">
            <button class="button-green col-md-12 col-sm-12 fuente-cuadros" icon="pi pi-search">
                Seminarios Permanentes de Educación Continua
            </button>
        </div>
    </div>

    <br><br>

    <div class="row container-circulos col-12">
        <div class="container-circulo">
            <div class="circulo">
                <img style="margin-bottom: 4px; margin-left: 3px;" class="img-semi"
                    src="/public/images/seminarios/APS y MASB.svg" alt="">
            </div>
            <label class="fuente-seminarios">APS y MAS-Bienestar</label>
        </div>

        <div class="container-circulo">
            <div class="circulo">
                <img style="margin-top: 6px; margin-right: 10px;" class="img-semi"
                    src="/public/images/seminarios/Medicina y Salud.svg" alt="">
            </div>
            <label class="fuente-seminarios ">Medicina y Salud</label>
        </div>

        <div class="container-circulo">
            <div class="circulo">
                <img style="margin-top: 5px; margin-right: 12px;" class="img-semi"
                    src="/public/images/seminarios/Salud Mental.svg" alt="">
            </div>
            <label class="fuente-seminarios ">Salud Mental</label>
        </div>

        <div class="container-circulo">
            <div class="circulo">
                <img style="margin-top: 6px; margin-right: 15px;" class="img-semi"
                    src="/public/images/seminarios/Envejecimiento.svg" alt="">
            </div>
            <label class="fuente-seminarios ">Envejecimiento Saludable</label>
        </div>

        <div class="container-circulo">
            <div class="circulo">
                <img style="margin-top: 5px; margin-right: 14px;" class="img-semi"
                    src="/public/images/seminarios/Enfermeria.svg" alt="">
            </div>
            <label class="fuente-seminarios ">Enfermería</label>
        </div>

        <div class="container-circulo">
            <div class="circulo">
                <img style="margin-bottom: 10px; margin-right: 8px;" class="img-semi"
                    src="/public/images/seminarios/Docencia en Salud.svg" alt="">
            </div>
            <label class="fuente-seminarios ">Docencia en Salud</label>
        </div>

        <div class="container-circulo">
            <div class="circulo">
                <img style="margin-top: 6px; margin-left: 6px;" class="img-semi"
                    src="/public/images/seminarios/Investigacion.svg" alt="">
            </div>
            <label class="fuente-seminarios ">Investigación en Salud</label>
        </div>

        <div class="container-circulo">
            <div class="circulo">
                <img style="margin-top: 11px; margin-right: 7px;" class="img-semi"
                    src="/public/images/seminarios/Alimentacion.svg" alt="">
            </div>
            <label class="fuente-seminarios">Alimentación y Nutrición</label>
        </div>

        <div class="container-circulo">
            <div class="circulo">
                <img style="margin-bottom: 10px; margin-right: 22px;" class="img-semi"
                    src="/public/images/seminarios/Calidad y Seguridad.svg" alt="">
            </div>
            <label class="fuente-seminarios">Calidad y Seguridad del Paciente</label>
        </div>


        <div class="container-circulo">
            <div class="circulo">
                <img style="margin-top: 8px; margin-right: 10px;" class="img-semi"
                    src="/public/images/seminarios/Promocion.svg" alt="">
            </div>
            <label class="fuente-seminarios ">Promoción de la Salud</label>
        </div>

        <div class="container-circulo">
            <div class="circulo">
                <img style="margin-top: 17px; margin-left: 4px;" class="img-semi"
                    src="/public/images/seminarios/logoACS.svg" alt="">
            </div>
            <label class="fuente-seminarios ">Acción Comunitaria</label>
        </div>

        <div class="container-circulo">
            <div class="circulo">
                <img style="margin-bottom: 10px; margin-right: 15px;" class="img-semi"
                    src="/public/images/seminarios/Salud Bucal.svg" alt="">
            </div>
            <label class="fuente-seminarios ">Salud Bucal</label>
        </div>


        <div class="container-circulo">
            <div class="circulo">
                <img style="margin-top: 12px; margin-right: 15px;" class="img-semi"
                    src="/public/images/seminarios/Trabajo Social.svg" alt="">
            </div>
            <label class="fuente-seminarios ">Trabajo Social en Salud</label>
        </div>


        <div class="container-circulo">
            <div class="circulo">
                <img style="margin-top: 6px; margin-right: 10px;" class="img-semi"
                    src="/public/images/seminarios/Gestion.svg" alt="">
            </div>
            <label class="fuente-seminarios ">Gestión Directiva y Economía de la Salud</label>
        </div>

        <div v-if="videoData" class="video-container">
            <div class="video-close"></div>
            <iframe width="300" height="169" :src="videoData.src" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
            </iframe>
            <div class="video-title">{{ videoData.title }}</div>
        </div>

    </div>

    <br><br>

    <Social className="social-component"></Social>

</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import Social from '@/components/template/SocialNetworks.vue';
import { pdfView } from '@/components/resources/pdfView';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const imagesBanner = ref([]);
let interval;
const currentIndex = ref(0);
const router = useRouter();
const url = import.meta.env.VITE_URL_HOST;
const authStore = useAuthStore();
const videoData = ref(null);

onMounted(async () => {
    await getBanner();
    await getVideo();
    startInterval();
    setupScrollAnimation();
    await comfirmationLogin();
});

// Limpiar el intervalo cuando el componente se desmonta
onUnmounted(() => {
    clearInterval(interval);
});

const getVideo = async () => {
    try {
        const response = await axios.get(`${url}/api/live`);

        if (response.status === 200 && response.data.is_enabled) {
            videoData.value = response.data;
        }
    } catch (error) {
        if (error.response?.status !== 404) {
            console.log(error);
        }
    }
};

const getBannerStatic = () => {
    imagesBanner.value = [
        {
            "image_name": '/public/images/carrucel/1.png',
            "link": 'https://www.google.com.mx/?hl=es-419'
        },
        {
            "image_name": '/public/images/carrucel/2.png',
            "link": 'https://www.google.com.mx/?hl=es-419'
        },
        {
            "image_name": '/public/images/carrucel/3.png',
            "link": 'https://www.google.com.mx/?hl=es-419'
        },
        {
            "image_name": '/public/images/carrucel/4.png',
            "link": 'https://www.google.com.mx/?hl=es-419'
        },
        {
            "image_name": '/public/images/carrucel/5.png',
            "link": 'https://www.google.com.mx/?hl=es-419'
        }
    ];
};

const getBanner = async () => {
    try {
        // Configura el timeout para la solicitud (por ejemplo, 5000 ms)
        const response = await axios.get(`${url}/api/banner`);

        if (response.status === 200 || response.status === 202) {
            return imagesBanner.value = response.data.results;
        }

        getBannerStatic();

    } catch (error) {
        console.error(error);
        getBannerStatic();
    }
};

const startInterval = () => {
    interval = setInterval(nextSlide, 4000); // Cambia cada 2 segundos
};

// Función para cambiar a la siguiente imagen
const nextSlide = () => {
    currentIndex.value = (currentIndex.value + 1) % imagesBanner.value.length;
};


const handleNext = () => {
    nextSlide(); // Cambia a la siguiente imagen
    resetInterval(); // Reinicia el intervalo
};

const resetInterval = () => {
    stopInterval();
    startInterval();
};

const stopInterval = () => {
    clearInterval(interval);
};

const setupScrollAnimation = () => {
    const elementos = document.querySelectorAll('.container-circulo');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    elementos.forEach((elemento, index) => {
        elemento.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(elemento);
    });
};

const getPrivateNotice = async () => {
    try {
        const response = await axios.get(`${url}/api/private-notice`);
        if (response.data.link) {
            pdfView(response.data.link);
        }
    } catch (error) {
        console.log(error);
    }
};

const getEducationalOffer = async () => {
    try {
        const response = await axios.get(`${url}/api/educational-offer`);
        if (response.data.link) {
            pdfView(response.data.link);
        }
    } catch (error) {
        console.log(error);
    }
};

const pushDirectory = async () => {
    router.push('/directory');
};

const pushQuestions = async () => {
    router.push('/questions');
};

const comfirmationLogin = async () => {
    try {
        const response = await axios.get(`${url}/api/user`, {
            headers: {
                'Authorization': `Bearer ${authStore.getAccessToken}`
            }
        });

        if (response.status == 200) {
            router.push('/dashboard');
        }
    }
    catch (error) {
        authStore.clearTokens();
    }
};

</script>

<style>
.logos-container {
    width: 40%;
    min-width: 200px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    z-index: 10;
    border-radius: 10px 0 0 10px;
    background-image: url('/public/images/rojos pt2.svg');
    background-size: 100%;
    background-position: cover;
    background-repeat: repeat;
    animation: moverFondo 30s linear infinite;
    box-shadow: 5px 7px 6px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.08);
}

@keyframes moverFondo {
    100% {
        background-position: center top;
    }

    0% {
        background-position: center bottom;
    }
}

#carouselNoticias {
    width: 100%;
    height: 500px;
    overflow: hidden;
    position: relative;
    border-radius: 0 10px 10px 0;
}

.carousel.slide {
    flex-grow: 1;
    box-shadow: 5px 5px 6px rgba(0, 0, 0, 0.6), 0 1px 3px rgba(0, 0, 0, 0.08);
    border-radius: 0 10px 10px 0;
}

.logos-container img {
    width: 90%;
    max-height: 100px;
    object-fit: contain;
}

.carousel-inner {
    width: 100%;
    height: 100%;
    position: relative;
}

.carousel-item img {
    height: 500px;
    transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
}

.carousel-item.active {
    opacity: 1;
    transform: translateX(0);
}

.carousel-item.slide-left {
    animation: slideLeft 0.5s ease-in-out;
}

@keyframes slideLeft {
    from {
        transform: translateX(100%);
        opacity: 0;
    }

    to {
        transform: translateX(0);
        opacity: 1;
    }
}

.btn-c {
    border-radius: 0 10px 10px 0;
}

.container-carrucel {
    margin-top: 90px;
    text-align: center;
    justify-content: center;
}

.cuadros {
    justify-content: center;
    gap: 100px;
}

.img-carrucel {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

.cuadro {
    background-color: #611232;
    padding: 20px;
    height: 170px;
    flex: 1;
    text-align: center;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: transform 0.3s, box-shadow 0.3s;
    box-shadow: 10px 14px 6px rgba(0, 0, 0, 0.6), 0 1px 3px rgba(0, 0, 0, 0.08);
    cursor: pointer;
}

.cuadro:hover {
    transform: translateY(-20px);
    box-shadow: 0 8px 10px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.15);
}

.cuadro img {
    max-width: 100%;
    height: auto;
    margin-bottom: 10px;
    cursor: pointer;
}

.fuente-cuadros {
    color: white;
    font-size: 20px;
    margin-top: 0;
    cursor: pointer;
    font-family: 'Noto Sans';
}

.img-icons {
    margin-bottom: 10px;
    width: 70px;
    height: 70px;
}

.button-green {
    height: 50px;
    border-radius: 15px;
    background-color: #002f2a;
    font-size: 20px;
}

.container-btn {
    margin-top: 40px;
    text-align: center;
    justify-content: center;
}

.container-circulos {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    width: 100%;
    padding: 10px;
}

.container-circulo {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    flex: 0 0 auto;
    width: 200px;
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out
}

.container-circulo.visible {
    opacity: 1;
    transform: translateY(0);
}

.circulo {
    width: 200px;
    height: 200px;
    background-color: white;
    border-radius: 50%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.circulo:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.img-semi {
    width: 220px;
    height: 260px;
}

.fuente-seminarios {
    color: black;
    margin-top: 10px;
    font-size: 15px;
    font-family: 'Noto Sans';
    font-weight: bold;
}

.video-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 321px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    padding: 10px;
}

.video-close {
    position: absolute;
    top: 5px;
    right: 10px;
    cursor: pointer;
    font-size: 20px;
    color: #666;
    z-index: 1001;
}

.video-close:hover {
    color: #000;
}

.video-title {
    margin-top: 8px;
    font-size: 14px;
    text-align: center;
    font-weight: bold;
}

@media (max-width: 768px) {
    .cuadro {
        margin-left: 36px;
        transition: transform 0.3s, box-shadow 0.3s;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
    }

    .cuadro:hover {
        transform: translateY(-8px);
        box-shadow: 0 8px 10px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.15);
    }

    .cuadros {
        margin-top: 60px;
        gap: 20px;
    }

    .social-component {
        display: none;
    }

    .crrcel {
        display: none;
    }

    .button-green {
        height: 90px;
    }
}
</style>