import { useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import { HomeOutlined, AddCard, CreditCard, PeopleAltOutlined, SettingsOutlined, LogoutOutlined } from '@mui/icons-material';
import { Logo } from './logo';
import { NavItem } from './nav-item';

const items = [
  {
    collapse: false,
    href: '/dashboard',
    icon: (<HomeOutlined />),
    title: 'Dashboard'
  },
  {
    collapse: false,
    href: '/generate-card',
    icon: (<AddCard />),
    title: 'Generate Card'
  },
  {
    collapse: true,
    icon: (<CreditCard />),
    title: 'Manage Cards',
    links: [
      {
        title: 'Active Cards',
        href: '/active-cards'
      },
      {
        title: 'Inactive Cards',
        href: '/inactive-cards'
      }
  ]
  },
  {
    collapse: false,
    href: '/products',
    icon: (<PeopleAltOutlined />),
    title: 'Manage Customers'
  },
  {
    collapse: false,
    href: '/settings',
    icon: (<SettingsOutlined />),
    title: 'Account Settings'
  },
  {
    collapse: false,
    href: '/',
    icon: (<LogoutOutlined />),
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
          {
            items.map((item) => {
              if(item.collapse) {
                return (
                  <NavItem
                    key={item.title}
                    icon={item.icon}
                    href={item.href}
                    title={item.title}
                    collapse={item.collapse}
                    links={item.links}
                  />
                )
              }
              else {
                return (
                  <NavItem
                    key={item.title}
                    icon={item.icon}
                    href={item.href}
                    title={item.title}
                  />
                )
              }
            })
          }
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
