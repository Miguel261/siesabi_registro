import swal from 'sweetalert';

export const handleGeneralError = (error, router, authStore) => {
    
    if (error.response) {
        const statusCode = error.response.data.statusCode;
        console.error(error);

        switch (statusCode) {
            case 401:
                swal("No autorizado!", "Inicia sesión nuevamente.", "error");
                authStore.clearTokens();
                router.push('/login');
                break;
            case 500:
                swal("Error!", "Error del servidor! Intenta nuevamente más tarde.", "error");
                break;
            default:
                swal("Error!", "Ocurrió un error inesperado.", "error");
        }
    } else if (error.request) {
        swal("Error!", "No se recibió respuesta del servidor. Verifica tu conexión!", "error");
    } else {
        swal("Error!", `Error al realizar la solicitud: ${error.message}`, "error");
    }
};