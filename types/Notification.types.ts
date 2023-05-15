export type notificationProps = {
  date: string;
  notiTitle: string;
  notiBody: string;
};

export type NotificationObjType = {
  content: {
    title: string;
    body: string;
    data: { data: "goes here" };
  };
  trigger: { seconds: 2 };
};
