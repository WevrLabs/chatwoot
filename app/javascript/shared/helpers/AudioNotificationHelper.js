const notificationAudio = require('shared/assets/audio/ding.mp3').default;

export const playNotificationAudio = () => {
  try {
    new Audio(notificationAudio).play();
  } catch (error) {
    console.log(error);
  }
};
