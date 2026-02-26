import React from 'react';

import { EditOutlined, VisibilityOutlined } from '@mui/icons-material';
import { ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';

import { setSelectedMainTab, useSelectedMainTab } from '../../documents/editor/EditorContext';

export default function MainTabsGroup() {
  const selectedMainTab = useSelectedMainTab();
  const handleChange = (_: React.MouseEvent<HTMLElement>, v: string | null) => {
    if (v === 'preview' || v === 'editor') {
      setSelectedMainTab(v);
    }
  };

  return (
    <ToggleButtonGroup value={selectedMainTab} exclusive size="small" onChange={handleChange}>
      <ToggleButton value="editor">
        <Tooltip title="Edit">
          <EditOutlined fontSize="small" />
        </Tooltip>
      </ToggleButton>
      <ToggleButton value="preview">
        <Tooltip title="Preview">
          <VisibilityOutlined fontSize="small" />
        </Tooltip>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
