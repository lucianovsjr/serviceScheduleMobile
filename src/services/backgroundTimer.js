import BackgroundTimer from 'react-native-background-timer';

import { localNotification } from './notification';
import api from './api';

const timer = 1 * (60 * 1000); // 15 minutes
const NOTIF_TITLE = 'Agenda';

BackgroundTimer.runBackgroundTimer(async () => {
  const res = await api.get('notification-busy/');

  if (res.status === 200)
    res.data.forEach((notification) => {
      const { message } = notification;

      localNotification({
        title: NOTIF_TITLE,
        message,
      });
    });
}, timer);
