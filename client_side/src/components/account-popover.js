import PropTypes from 'prop-types';
import { MenuItem, MenuList, Popover, ListItemIcon, Typography } from '@mui/material';
import { SettingsOutlined, LogoutOutlined } from '@mui/icons-material';
import axios from 'axios';
import { useRouter } from 'next/router';

export const AccountPopover = (props) => {
  const router = useRouter();
  const { anchorEl, onClose, open, ...other } = props;

  const handleLogout = async () => {
    onClose?.();
    try {
      const res = await axios.get('http://localhost:8000/logout');
      router.push('/');
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
        <MenuItem>
          <ListItemIcon>
            <SettingsOutlined fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
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
