import { useState, useEffect, useCallback } from 'react';

interface UseNotificationReturn {
  permission: NotificationPermission;
  requestPermission: () => Promise<boolean>;
  showNotification: (title: string, body: string) => void;
  isSupported: boolean;
}

export function useNotification(): UseNotificationReturn {
  const [permission, setPermission] = useState<NotificationPermission>(
    'Notification' in window ? Notification.permission : 'denied'
  );

  const isSupported = 'Notification' in window;

  useEffect(() => {
    if (isSupported) {
      setPermission(Notification.permission);
    }
  }, [isSupported]);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (!isSupported) {
      console.warn('Notifications are not supported in this browser');
      return false;
    }

    if (permission === 'granted') {
      return true;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result === 'granted';
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  }, [isSupported, permission]);

  const showNotification = useCallback(
    (title: string, body: string) => {
      if (!isSupported) {
        console.warn('Notifications are not supported in this browser');
        return;
      }

      if (permission !== 'granted') {
        console.warn('Notification permission not granted');
        return;
      }

      try {
        new Notification(title, {
          body,
          icon: '/vite.svg',
          badge: '/vite.svg',
          tag: 'fittrack-timer',
          requireInteraction: false,
        });
      } catch (error) {
        console.error('Error showing notification:', error);
      }
    },
    [isSupported, permission]
  );

  return {
    permission,
    requestPermission,
    showNotification,
    isSupported,
  };
}
