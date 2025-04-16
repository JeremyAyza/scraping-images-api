const config = {
    apps: [
        {
            name: 'express-app',
            script: 'index.js', // El nombre de tu archivo principal de la aplicación
            instances: 3, // Número de instancias
            exec_mode: 'cluster', // Modo de ejecución: cluster
            watch: true, // Si quieres que PM2 reinicie automáticamente si los archivos cambian
        },
    ],
};

module.exports = config;
