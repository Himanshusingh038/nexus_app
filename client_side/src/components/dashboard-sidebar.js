import { useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Divider, Drawer, useMediaQuery } from '@mui/material';
import { HomeOutlined, AddCard, CreditCard, PeopleAltOutlined, SettingsOutlined } from '@mui/icons-material';
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
    href: 'cards',
    icon: (<CreditCard />),
    title: 'Manage Cards',
    links: [
      {
        href: 'active-cards',
        title: 'Active'
      },
      {
        href: 'unassigned-cards',
        title: 'Unassigned'
      },
      {
        href: 'inactive-cards',
        title: 'Inactive'
      }
    ]
  },
  {
    collapse: false,
    href: '/customers',
    icon: (<PeopleAltOutlined />),
    title: 'Manage Customers'
  },
  {
    collapse: false,
    href: '/settings',
    icon: (<SettingsOutlined />),
    title: 'Account Settings'
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
            <Logo
              variant='light'
              sx={{
                height: 45
              }}
            />
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
              if (item.collapse) {
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