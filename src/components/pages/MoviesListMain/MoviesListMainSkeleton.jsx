import { Skeleton, Stack, useMediaQuery } from '@mui/material';
import React from 'react';

export default function MoviesListMainSkeleton() {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <>
      <Skeleton
        animation="wave"
        variant="rectangular"
        height="32px"
        width="200px"
        sx={{ mt: 2, mb: 2 }}
      />

      <Stack
        mt={2}
        mb={2}
        sx={{ flexDirection: { sm: 'columm', md: 'row' }, gap: 1 }}
        direction="flex"
        justifyContent="center"
      >
        <Skeleton
          animation="wave"
          variant="rounded"
          width={isMobile ? '100%' : '35%'}
          height={40}
        />
        <Skeleton
          animation="wave"
          variant="rounded"
          width={isMobile ? '100%' : '35%'}
          height={40}
        />
        <Skeleton animation="wave" variant="rounded" width={200} height={40} />
      </Stack>

      <Stack direction="row" justifyContent="center" flexWrap="wrap">
        {Array(15)
          .fill(null)
          .map((_, index) => (
            <React.Fragment key={index}>
              <Stack flexDirection="column">
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width="322px"
                  height="215px"
                />
                <Skeleton animation="wave" variant="text" width="120px" />
                <Skeleton animation="wave" variant="text" width="120px" />
              </Stack>
            </React.Fragment>
          ))}
      </Stack>
    </>
  );
}
