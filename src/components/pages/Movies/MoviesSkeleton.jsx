import { Box, Skeleton, Stack, useMediaQuery } from '@mui/material';
import React from 'react';

export default function MoviesSkeleton() {
  const isMobile = useMediaQuery('(max-width:600px');

  return (
    <Box mt={2} mb={2}>
      {new Array(5).fill(null).map((_, index) => (
        <React.Fragment key={index}>
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="200"
            height="32"
          />
          <Stack direction="row" justifyContent="center" flexWrap="wrap">
            {new Array(5).fill(null).map((_, index) => (
              <Skeleton
                key={index}
                animation="wave"
                variant="rectangular"
                width={isMobile ? '100%' : '230px'}
                height={isMobile ? '520px' : '352px'}
              />
            ))}
          </Stack>
        </React.Fragment>
      ))}
    </Box>
  );
}
