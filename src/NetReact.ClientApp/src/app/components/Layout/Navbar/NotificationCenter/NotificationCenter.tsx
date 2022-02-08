import { Notifications } from "@mui/icons-material";
import { Badge, IconButton, Menu, MenuItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useStores } from "@stores/useStores";
import { observer } from "mobx-react";
import { useState } from "react";

const NotificationCenter = observer(() => {
  const { notification } = useStores();
  const [ anchorEl, setAnchorEl ] = useState<null | HTMLElement>(null);


  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = (id: string) => {
    notification!.removeSnackbar(id);

    if (notification!.notifications?.length === 0) {
      setAnchorEl(null);
    }
  };

  return (
    <div>
      <IconButton
        size="large"
        onClick={handleMenu}
        color="inherit"
      >
        <Badge badgeContent={notification!.notifications?.length} color="info">
          <Notifications />
        </Badge>
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {notification!.notifications.length > 0
          ? notification!.notifications.map(n => (
            <MenuItem key={n.id}
                      onClick={() => handleDelete(n.id)}>{n.message}</MenuItem>
          ))
          : (
            <Typography variant="body2" sx={{ fontStyle: "italic", padding: 4 }}>
              There are no notifications yet.
            </Typography>
          )
        }
      </Menu>
    </div>
  );
});

export { NotificationCenter };