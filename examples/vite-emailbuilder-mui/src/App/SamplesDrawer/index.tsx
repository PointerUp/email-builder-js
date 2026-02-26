import React from 'react';

import { Box, Drawer, Stack, Typography } from '@mui/material';

import {
  setDocument,
  setSelectedBlockId,
  useDocument,
  useSamplesDrawerOpen,
} from '../../documents/editor/EditorContext';
import { BUTTONS } from '../../documents/blocks/helpers/EditorChildrenIds/AddBlockMenu/buttons';
import { TEditorBlock } from '../../documents/editor/core';

import logo from './logo.png';

export const SAMPLES_DRAWER_WIDTH = 240;

function generateId() {
  return `block-${Date.now()}`;
}

export default function SamplesDrawer() {
  const samplesDrawerOpen = useSamplesDrawerOpen();
  const document = useDocument();

  const handleAddBlock = (block: TEditorBlock) => {
    const blockId = generateId();
    const rootBlock = document['root'];

    // Safety check - make sure root exists and has childrenIds
    if (!rootBlock || rootBlock.type !== 'EmailLayout') {
      return;
    }

    const currentChildrenIds = rootBlock.data.childrenIds || [];

    setDocument({
      [blockId]: block,
      root: {
        ...rootBlock,
        data: {
          ...rootBlock.data,
          childrenIds: [...currentChildrenIds, blockId],
        },
      },
    });
    setSelectedBlockId(blockId);
  };

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={samplesDrawerOpen}
      sx={{
        width: samplesDrawerOpen ? SAMPLES_DRAWER_WIDTH : 0,
      }}
    >
      <Stack spacing={3} py={2} px={2} width={SAMPLES_DRAWER_WIDTH} height="100%">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            mb: 2,
            textDecoration: 'none',
            color: 'inherit',
          }}
          component="a"
          href="/"
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 32,
              height: 32,
              borderRadius: 1,
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            <Box component="img" src={logo} alt="PointerUp" sx={{ width: 32, height: 32 }} />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 600, lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              PointerUp
            </Typography>
            <Typography
              variant="caption"
              sx={{ lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              Grow
            </Typography>
          </Box>
        </Box>

        <Stack spacing={2}>
          <Typography variant="overline" color="text.secondary">
            CONTENT BLOCKS
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 2,
            }}
          >
            {BUTTONS.map((button, index) => (
              <Box
                key={index}
                component="button"
                onClick={() => handleAddBlock(button.block())}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                  p: 2,
                  height: 84,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  backgroundColor: 'background.paper',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  color: 'text.secondary',
                  '&:hover': {
                    borderColor: 'primary.main',
                    backgroundColor: 'primary.50', // light primary background on hover
                    color: 'primary.main',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  },
                }}
              >
                {React.cloneElement(button.icon as React.ReactElement, {
                  fontSize: 'medium',
                })}
                <Typography variant="caption" sx={{ fontWeight: 500 }}>
                  {button.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Stack>
      </Stack>
    </Drawer>
  );
}

