import { INotification } from "@models/INotification";
import { useStores } from "@stores/useStores";
import { autorun } from "mobx";
import { useSnackbar } from "notistack";
import { ReactElement, useEffect, useState } from "react";

interface INotifierProps {
  children: ReactElement;
}

const Notifier = ({ children }: INotifierProps) => {
  const [ displayed, setDisplayed ] = useState<INotification[]>([]);
  const { notification } = useStores();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const dispose = autorun(() => notification!.notifications.forEach((n) => {
      if (displayed.map(n => n.id).includes(n.id)) {
        return;
      }

      enqueueSnackbar(n.message, n.options);
      setDisplayed([
        ...displayed,
        n
      ]);
    }));

    return () => {
      dispose();
    };
  }, []);

  return children;
};

export { Notifier };