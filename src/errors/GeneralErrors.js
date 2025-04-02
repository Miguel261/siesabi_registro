import swal from 'sweetalert';

export const handleGeneralError = (error, router, authStore) => {
    
    if (error) {
        const status = error.status;
        console.error(error.response);

        switch (status) {
            case 401:
                authStore.clearTokens();
                router.push('/login');
                break;
            case 409:
                 swal("Error!", "El correo electrónico proporcionado ya existe!.", "error");
                 break;
            case 500:
                swal("Error!", "Error del servidor! Intenta nuevamente más tarde.", "error");
                break;
            default:
                swal("Error!", "Ocurrió un error inesperado.", "error");
        }
    } 
};