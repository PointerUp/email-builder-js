import React from 'react';

import { Box, Button, SxProps, Typography } from '@mui/material';

type BlockMenuButtonProps = {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
};

const BUTTON_SX: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  p: 2,
  width: 90,
  height: 90,
  border: '1px solid',
  borderColor: 'grey.300',
  borderRadius: 2,
  backgroundColor: 'background.paper',
  color: 'text.secondary',
  textTransform: 'none',
  transition: 'all 0.2s',
  '&:hover': {
    borderColor: 'primary.main',
    backgroundColor: 'primary.50',
    color: 'primary.main',
  },
};

const ICON_SX: SxProps = {
  mb: 1,
  display: 'flex',
  justifyContent: 'center',
  color: 'inherit',
};

export default function BlockTypeButton({ label, icon, onClick }: BlockMenuButtonProps) {
  return (
    <Button
      sx={BUTTON_SX}
      onClick={(ev) => {
        ev.stopPropagation();
        onClick();
      }}
    >
      <Box sx={ICON_SX}>{icon}</Box>
      <Typography variant="body2">{label}</Typography>
    </Button>
  );
}
