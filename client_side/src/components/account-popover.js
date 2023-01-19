import PropTypes from 'prop-types';
import { MenuItem, MenuList, Popover, ListItemIcon, Typography } from '@mui/material';
import { SettingsOutlined, LogoutOutlined } from '@mui/icons-material';

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open, ...other } = props;

  const handleLogout = async () => {
    onClose?.();
    try {
      await axios.get('http://localhost:8000/logout');
      // clear the user data from the client
      // redirect to login page
      router.push('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: { width: '280px' }
      }}
      {...other}
    >
      <MenuList
        sx={{
          '& > *': {
            padding: '15px 16px'
          }
        }}
      >
        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <SettingsOutlined fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <LogoutOutlined fontSize="small" />
          </ListItemIcon>
          Sign out
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};
