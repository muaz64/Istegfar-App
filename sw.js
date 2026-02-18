importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

const CACHE_NAME = 'istegfar-firebase-v1';
const assets = ['./', './index.html', './manifest.json', './icon.png'];

firebase.initializeApp({
  apiKey: "AIzaSyDI8m_KnE0LZqDq7VNshwFRvsVLWyqtnhk",
  authDomain: "istighfar-reminder.firebaseapp.com",
  projectId: "istighfar-reminder",
  storageBucket: "istighfar-reminder.firebasestorage.app",
  messagingSenderId: "677440645870",
  appId: "1:677440645870:web:4a80d72d3784f9445e61ff"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const options = {
    body: payload.notification.body,
    icon: './icon.png',
    badge: './icon.png',
  };
  self.registration.showNotification(payload.notification.title, options);
});

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(assets)));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(
    keys.map(key => key !== CACHE_NAME ? caches.delete(key) : null)
  )));
  return self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow('/'));
});