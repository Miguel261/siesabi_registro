export const pdfView = (url) => {
    const newWindow = window.open('', '_blank');
    if (newWindow) {
        newWindow.document.write(`
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <title>Visor de PDF</title>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.min.js"></script>
                <style>
                    body, html {
                        margin: 0;
                        padding: 0;
                        height: 100%;
                        background-color: #000;
                        overflow: hidden;
                    }
                    .pdf-container {
                        width: 80%;
                        height: 100vh;
                        margin: 0 auto;
                        background: white;
                        box-shadow: 0 0 15px rgba(0, 0, 0, 0.7);
                        overflow-y: auto;
                        overflow-x: hidden;
                    }
                    .pdf-page {
                        width: 100%;
                        padding: 20px;
                        box-sizing: border-box;
                        page-break-after: always; /* Para separación entre páginas */
                    }
                    canvas {
                        display: block;
                        margin: 0 auto;
                        max-width: 100%;
                    }
                </style>
            </head>
            <body>
                <div class="pdf-container" id="pdf-container"></div>
                <script>
                    pdfjsLib.getDocument("${url}").promise.then(pdf => {
                        const container = document.getElementById('pdf-container');
                        
                        // Renderizar páginas en orden (1, 2, 3...)
                        const renderPages = async () => {
                            for (let i = 1; i <= pdf.numPages; i++) {
                                const page = await pdf.getPage(i);
                                const viewport = page.getViewport({ scale: 1.0 });
                                
                                const canvas = document.createElement('canvas');
                                const context = canvas.getContext('2d');
                                
                                // Ajustar al ancho del contenedor
                                const containerWidth = container.clientWidth - 40; // Restar padding
                                const scale = containerWidth / viewport.width;
                                const scaledViewport = page.getViewport({ scale: scale });
                                
                                canvas.width = scaledViewport.width;
                                canvas.height = scaledViewport.height;
                                
                                // Crear contenedor de página
                                const pageDiv = document.createElement('div');
                                pageDiv.className = 'pdf-page';
                                pageDiv.appendChild(canvas);
                                container.appendChild(pageDiv);
                                
                                // Renderizar
                                page.render({
                                    canvasContext: context,
                                    viewport: scaledViewport
                                });
                            }
                        };
                        
                        renderPages();
                    });
                </script>
            </body>
            </html>
        `);
        newWindow.document.close();
    }
};