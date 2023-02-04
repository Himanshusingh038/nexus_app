import { useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import { ChevronRight, ExpandMore, Remove } from '@mui/icons-material';

export const NavItem = (props) => {
  const { href, icon, title, ...others } = props;
  const router = useRouter();
  const active = href ? (router.pathname === href) : false;
  const [open, setOpen] = useState(false);

  const handleClick = (e) => {
    setOpen(!open);
  };

  if (props.collapse) {
    const subnav = props.links;
    return (
      <ListItem
        sx={{
          display: 'block',
          mb: 0.5
        }}
      >
        <ListItemButton
          sx={{
            borderRadius: 1,
            color: open ? 'secondary.main' : 'neutral.300',
            justifyContent: 'flex-start',
            px: 2,
            width: '100%',
            '&:hover': {
              backgroundColor: active ? 'rgba(255,255,255, 0.08)' : 'rgba(255,255,255, 0.04)'
            }
          }}
          onClick={handleClick}
        >
          <ListItemIcon
            sx={{
              color: open ? 'secondary.main' : 'neutral.400'
            }}
          >
            {icon}
          </ListItemIcon>
          <ListItemText primary={title} />
          {open ? <ExpandMore /> : <ChevronRight />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List
            disablePadding
            sx={{
              mt: 0.5
            }}
          >
            {
              subnav.map((link) => (
                <NavItem
                  key={link.title}
                  icon={(<Remove />)}
                  href={`/${href}/${link.href}`}
                  title={link.title}
                />
              ))
            }
          </List>
        </Collapse>
      </ListItem>
    )
  }
  else {
    return (
      <ListItem
        disableGutters
        sx={{
          display: 'flex',
          mb: 0.5,
          py: 0,
          px: 2
        }}
        {...others}
      >
        <NextLink
          href={href}
          passHref
        >
          <ListItemButton
            sx={{
              backgroundColor: active && 'rgba(255,255,255, 0.08)',
              borderRadius: 1,
              color: active ? 'secondary.main' : 'neutral.300',
              justifyContent: 'flex-start',
              px: 2,
              width: '100%',
              '& .MuiButton-startIcon': {
                color: active ? 'secondary.main' : 'neutral.400'
              },
              '&:hover': {
                backgroundColor: active ? 'rgba(255,255,255, 0.08)' : 'rgba(255,255,255, 0.04)'
              }
            }}
          >
            <ListItemIcon
              sx={{
                color: active ? 'secondary.main' : 'neutral.400'
              }}
            >
              {icon}
            </ListItemIcon>
            <ListItemText primary={title} />
          </ListItemButton>
        </NextLink>
      </ListItem>
    )
  }
};

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string,
  collapse: PropTypes.bool
};
