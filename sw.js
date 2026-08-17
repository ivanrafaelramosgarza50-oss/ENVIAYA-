// Service Worker mínimo de ENGO.
// Su único propósito es habilitar notificaciones flotantes/push en Android,
// donde Chrome exige que existan a través de un Service Worker (no funcionan
// si se crean directo con "new Notification()" desde la página, como sí
// pasa en computadora). No cachea nada ni interfiere con el resto de la app.

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));

// Al tocar la notificación: enfocar la pestaña de ENGO si ya está abierta,
// o abrir una nueva si no.
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((listaClientes) => {
            for (const cliente of listaClientes) {
                if ('focus' in cliente) return cliente.focus();
            }
            if (self.clients.openWindow) return self.clients.openWindow('./');
        })
    );
});
