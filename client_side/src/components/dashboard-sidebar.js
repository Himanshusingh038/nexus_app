import { useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import { Home as HomeIcon } from '../icons/home';
import { Card as CardIcon } from '../icons/card';
import { Users as CustomersIcon } from '../icons/users';;
import { Cog as CogIcon } from '../icons/cog';
import { Logout as LogoutIcon } from '../icons/logout';
import { Logo } from './logo';
import { NavItem } from './nav-item';

const items = [
  {
    href: '/dashboard',
    icon: (<HomeIcon />),
    title: 'Dashboard'
  },
  {
    href: '/customers',
    icon: (<CardIcon />),
    title: 'Generate Card'
  },
  {
    href: '/customers',
    icon: (<CardIcon />),
    title: 'Manage Cards'
  },
  {
    href: '/products',
    icon: (<CustomersIcon />),
    title: 'Manage Customers'
  },
  {
    href: '/settings',
    icon: (<CogIcon />),
    title: 'Change Password'
  },
  {
    href: '/settings',
    icon: (<LogoutIcon />),
    title: 'Logout'
  }
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <NextLink
              href="/"
              passHref
            >
              <a
                sx={{
                  display: 'block'
                }}
              >
                <Logo
                  variant='light'
                  sx={{
                    height: 45
                  }}
                />
              </a>
            </NextLink>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: '#2D3748',
            mb: 5
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            color: '#FFFFFF',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
