import React, { useState } from 'react';

import { TextField } from '@mui/material';

import { FONT_FAMILIES } from '../../../../../../documents/blocks/helpers/fontFamily';

const OPTIONS = FONT_FAMILIES.map((option) => (
  <option key={option.key} value={option.key} style={{ fontFamily: option.value }}>
    {option.label}
  </option>
));

type NullableProps = {
  label: string;
  onChange: (value: null | string) => void;
  defaultValue: null | string;
};
export function NullableFontFamily({ label, onChange, defaultValue }: NullableProps) {
  const [value, setValue] = useState(defaultValue ?? 'inherit');
  return (
    <TextField
      select
      variant="outlined"
      size="small"
      label={label}
      value={value}
      SelectProps={{ native: true }}
      onChange={(ev) => {
        const v = ev.target.value;
        setValue(v);
        onChange(v === 'inherit' ? null : v);
      }}
    >
      <option value="inherit">Match email settings</option>
      {OPTIONS}
    </TextField>
  );
}
