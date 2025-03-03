export const pdfView = (url) => {
    const newWindow = window.open('', '_blank');
    if (newWindow) {
        // Crear un iframe dentro de la nueva pestaña
        newWindow.document.write(`
                    <!DOCTYPE html>
                    <html lang="es">
                    <head>
                        <title>PDF Viewer</title>
                        <style>
                            body, html { margin: 0; padding: 0; height: 100%; }
                            iframe { width: 100%; height: 100%; border: none; }
                        </style>
                    </head>
                    <body>
                        <iframe src="https://docs.google.com/viewer?url=${url}&embedded=true" 
                        // width="900px"
                        style="border: none;"></iframe>
                    </body>
                    </html>
                `);
        newWindow.document.close(); 
    } else {
        alert('No se pudo abrir la nueva pestaña. Asegúrate de permitir ventanas emergentes.');
    }
};