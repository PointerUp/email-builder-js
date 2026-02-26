import React, { useState } from 'react';

import { CloseOutlined } from '@mui/icons-material';
import { Box, ButtonBase, InputLabel, Stack } from '@mui/material';

type Props =
  | {
    nullable: true;
    label: string;
    onChange: (value: string | null) => void;
    defaultValue: string | null;
  }
  | {
    nullable: false;
    label: string;
    onChange: (value: string) => void;
    defaultValue: string;
  };
export default function ColorInput({ label, defaultValue, onChange, nullable }: Props) {
  const [value, setValue] = useState(defaultValue || '#000000');

  const handleColorChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const v = ev.target.value;
    setValue(v);
    onChange(v);
  };

  const renderResetButton = () => {
    if (!nullable || !defaultValue) {
      return null;
    }
    return (
      <ButtonBase
        onClick={() => {
          setValue('#000000');
          onChange(null);
        }}
      >
        <CloseOutlined fontSize="small" sx={{ color: 'grey.600' }} />
      </ButtonBase>
    );
  };

  return (
    <Stack alignItems="flex-start">
      <InputLabel sx={{ mb: 0.5 }}>{label}</InputLabel>
      <Stack direction="row" spacing={1} alignItems="center">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid',
            borderColor: 'divider',
            width: 32,
            height: 32,
            borderRadius: 1,
            overflow: 'hidden',
            p: 0,
            position: 'relative'
          }}
        >
          <input
            type="color"
            value={value}
            onChange={handleColorChange}
            style={{
              opacity: defaultValue === null && nullable ? 0 : 1,
              width: '150%',
              height: '150%',
              border: 'none',
              padding: 0,
              margin: '-25%',
              cursor: 'pointer'
            }}
          />
        </Box>
        {renderResetButton()}
      </Stack>
    </Stack>
  );
}
