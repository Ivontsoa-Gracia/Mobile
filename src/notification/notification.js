import PushNotification from 'react-native-push-notification';

// Configuration initiale
PushNotification.configure({
  onNotification: function (notification) {
    console.log('Notification reçue:', notification);
  },
  requestPermissions: true,
});

// Créer un canal (Android seulement)
PushNotification.createChannel(
  {
    channelId: "default-channel-id", // Identifiant unique du canal
    channelName: "Canal par défaut", // Nom visible pour l'utilisateur
    channelDescription: "Canal utilisé pour les notifications par défaut", // Optionnel
    importance: 4, // Importance: 1 (min) à 5 (max)
    vibrate: true, // Activer la vibration
  },
  (created) => console.log(`Canal créé: ${created}`) // Vérifie si le canal a été créé
);

// Fonction pour émettre une notification locale
export const sendLocalNotification = () => {
  PushNotification.localNotification({
    channelId: "default-channel-id", // Utiliser le canal configuré
    title: "Bonjour !", // Titre de la notification
    message: "Ceci est une notification locale.", // Message
    playSound: true, // Activer le son
    soundName: "default", // Son par défaut
    importance: "high", // Priorité
  });
};
