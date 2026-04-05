import { useState } from "react";
import useNotification from "./useNotification";
import { NotificationProps } from "../NotificationToast";

const useNotify = () => {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);

  return useNotification(notifications, setNotifications);

};

export default useNotify;