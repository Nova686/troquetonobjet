import Cookies from 'js-cookie';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

declare global {
    interface Window {
        Pusher: typeof Pusher;
        Echo: Echo<'reverb'>; 
    }
}

window.Pusher = Pusher;
const token = Cookies.get('auth_token');

const echo = new Echo({
    broadcaster: 'reverb',
    key: 'o3bzov3fzsxoqsb83rtv',
    wsHost: 'localhost',
    wsPort: 8008,
    wssPort: 8008,
    forceTLS: false,
    enabledTransports: ['ws', 'wss'],
    authEndpoint: 'http://localhost:8000/broadcasting/auth',
    auth: {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    },
});

export default echo;