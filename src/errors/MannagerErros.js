
export const MannagerError = (error, router, authStore, toast) => {
    
    if (error) {
        const status = error.status;
        console.error(error.response);

        if(status == 401){
            authStore.clearTokens();
            router.push('/login');
        }
        else{
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: `Error al hacer la petición al servidor Código: ${error.status}`,
                life: 2000
            });
            console.log(error);
        }
    } 
};