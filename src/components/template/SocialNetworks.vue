<template>
    <div class="container-btn col-12">
        <img class="img-final col-12" src="/images/carrucel/Imagen final de SiESABI.png" alt="">
        <div class="contenedor">
            <div class="container-redes">
                <a href="https://x.com/SIESABI_/" target="_blank" rel="noopener noreferrer">
                    <img class="img-redes" src="/images/redes/twitter.png" alt="Twitter">
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                    <img class="img-redes" src="/images/redes/tiktok.png" alt="TikTok">
                </a>
                <a href="https://www.youtube.com/@SIESABI" target="_blank" rel="noopener noreferrer">
                    <img class="img-redes" src="/images/redes/youtube.png" alt="YouTube">
                </a>
            </div>
            <br>
            <div class="container-redes">
                <a href="https://www.facebook.com/SiESABI/?locale=es_LA" target="_blank" rel="noopener noreferrer">
                    <img class="img-redes" src="/images/redes/facebook.png" alt="Facebook">
                </a>
                <a href="https://www.instagram.com/plataformasiesabi?igsh=MTgwbTVtMzYwMHRneA==" target="_blank"
                    rel="noopener noreferrer">
                    <img class="img-redes" src="/images/redes/instagram.png" alt="Instagram">
                </a>
                <a href="https://wa.me/7442284487?text=Hola" target="_blank" rel="noopener noreferrer">
                    <img class="img-redes" src="/images/redes/whatsapp.png" alt="WhatsApp">
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Social'
};
</script>

<style>
.container-btn {
    margin-top: 40px;
    text-align: center;
    position: relative;
}

.img-final {
    opacity: 0.5;
    filter: grayscale(30%);
    width: 100%;
}

.contenedor {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -220%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.container-redes {
    display: flex;
    gap: 10px;
}

.img-redes {
    height: 70px;
    cursor: pointer;
    background-color: white;
    border-radius: 50%;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.img-redes:hover {
    transform: scale(1.17);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

@media (max-width: 1500px) {
    .img-final {
        display: none;
    }

    .contenedor {
        display: none;
    }
}


</style>