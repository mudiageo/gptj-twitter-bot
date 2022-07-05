import ioClient from 'socket.io-client';
import { browser } from '$app/env';
const ENDPOINT = '/';
const socket = ioClient(ENDPOINT);
export const io = socket;
function askNotificationPermission() {
	// function to actually ask the permissions
	function handlePermission(permission) {
		// set the button to shown or hidden, depending on what the user answers
		//  if(Notification.permission === 'denied' || Notification.permission === 'default') { notificationBtn.style.display = 'block'; } else { notificationBtn.style.display = 'none'; }
	} // Let's check if the browser supports notifications
	if (!('Notification' in window)) {
		console.log('This browser does not support notifications.');
	} else {
		if (Notification.permission === 'granted') {
			Notification.requestPermission().then((permission) => {
				handlePermission(permission);
			});
		} else {
			Notification.requestPermission(function (permission) {
				handlePermission(permission);
			});
		}
	}
}

if (browser) {
	askNotificationPermission();
	socket.on('message', async (message) => {
		window.Notification = window.Notification || window.webkitNotification;
		const registration = await navigator.serviceWorker.getRegistration();

		if ('showNotification' in registration) {
			registration.showNotification(message.sender, { body: message.message });
		} else {
			const notification = new Notification(message.sender, { body: message.message });
		}

		//const notification = new Notification(message.sender, { body: message.message});
	});
}
