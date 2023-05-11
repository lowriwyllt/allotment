import { useState, useEffect, useRef } from "react";
import { Text, View, Button, Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
const PushNotification = ({ date, notiTitle, notiBody }: any) => {
  const [expoPushToken, setExpoPushToken] = useState<String | undefined>("");
  const [notification, setNotification] = useState<Boolean>(false);
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();
  const carrotDate = new Date(`${date}T11:32:30`);
  const startTimer = (countDownDate: any, notificationObj: any) => {
    //var countDownDate: any = carrotDate;
    var x = setInterval(function () {
      var now = new Date().getTime();
      var distance = countDownDate - now;
      // console.log(distance);
      if (distance < 1000 && distance > -500) {
        clearInterval(x);
        CarrotTime(notificationObj);
      }
    }, 1000);
  };
  startTimer(carrotDate, {
    content: {
      title: notiTitle,
      body: notiBody,
      data: { data: "goes here" },
    },
    trigger: { seconds: 2 },
  });
  // handles the notification
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  //useEffect to render token
  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => setExpoPushToken(token))
      .catch((err) => {
        console.log(err);
      });
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification: any) => {
        setNotification(notification);
      });
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });
    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  return <></>;
};

// actual notifications that we will see
async function CarrotTime(NotifiObj: any) {
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
