import { useState, useEffect, useRef } from "react";
import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import {
  NotificationObjType,
  notificationProps,
} from "../types/Notification.types";

const PushNotification = ({ date, notiTitle, notiBody }: notificationProps) => {
  const [expoPushToken, setExpoPushToken] = useState<String | undefined>("");
  const [notification, setNotification] = useState<Boolean>(false);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  const notificationDate = new Date(`${date}T14:26:00`);

  const startTimer = (
    countDownDate: Date,
    notificationObj: NotificationObjType
  ) => {
    let x = setInterval(function () {
      let now = new Date().getTime();
      let timeUntilNotification = countDownDate.getTime() - now;
      if (timeUntilNotification < 1000 && timeUntilNotification > -500) {
        clearInterval(x);
        NotificationTime(notificationObj);
      }
    }, 1000);
  };

  startTimer(notificationDate, {
    content: {
      title: notiTitle,
      body: notiBody,
      data: { data: "goes here" },
    },
    trigger: { seconds: 2 },
  });

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => setExpoPushToken(token))
      .catch((err) => {
        console.log(err);
      });
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(true);
      });
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });
    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);
  return <></>;
};

// actual notifications that we will see
async function NotificationTime(NotifiObj: NotificationObjType) {
  await Notifications.scheduleNotificationAsync(NotifiObj);
}

async function registerForPushNotificationsAsync() {
  let token;
  // if android set notifications to max priority, only needed for android
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
    // if the device is a device, must be a device and not an emulator
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }
    return token;
  }
}
export default PushNotification;
