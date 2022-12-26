import { useContext } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { MenuItem, MenuList, Popover, ListItemIcon, Typography } from '@mui/material';
import { SettingsOutlined, LogoutOutlined } from '@mui/icons-material';
import { AuthContext } from '../contexts/auth-context';
import { auth, ENABLE_AUTH } from '../lib/auth';

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open, ...other } = props;
  const authContext = useContext(AuthContext);

  const handleSignOut = async () => {
    onClose?.();

    // Check if authentication with Zalter is enabled
    // If not enabled, then redirect is not required
    if (!ENABLE_AUTH) {
      return;
    }

    // Check if auth has been skipped
    // From sign-in page we may have set "skip-auth" to "true"
    // If this has been skipped, then redirect to "sign-in" directly
    const authSkipped = globalThis.sessionStorage.getItem('skip-auth') === 'true';

    if (authSkipped) {
      // Cleanup the skip auth state
      globalThis.sessionStorage.removeItem('skip-auth');

      // Redirect to sign-in page
      Router
        .push('/sign-in')
        .catch(console.error);
      return;
    }

    try {
      // This can be call inside AuthProvider component, but we do it here for simplicity
      await auth.signOut();

      // Update Auth Context state
      authContext.signOut();

      // Redirect to sign-in page
      Router
        .push('/sign-in')
        .catch(console.error);
    } catch (err) {
      console.error(err);
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
