import { Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';

const CHANNEL_ID = 'weekcalendar';

PushNotification.configure({
  requestPermissions: Platform.OS === 'ios',
});

PushNotification.channelExists(CHANNEL_ID, (exists) => {
  if (exists) {
    PushNotification.cancelAllLocalNotifications();
    PushNotification.deleteChannel(CHANNEL_ID);
  }

  PushNotification.createChannel({
    channelId: CHANNEL_ID,
    channelName: 'Channel Week Calendar',
    importance: 4,
    vibrate: true,
  });
});

export const localNotification = (notif) =>
  PushNotification.localNotification({
    channelId: CHANNEL_ID,
    smallIcon: 'icon_week_calendar',
    largeIcon: '',
    title: notif.title,
    message: notif.message,
  });
