import { useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import { useAnnotation } from '../hooks/useAnnotation';
import ConsecutiveSnackbar, {
  SnackbarMessage,
} from '../components/ConsecutiveSnackbar';
import { MyAppBar } from '../components/MyAppBar';
import { ControlledAnnotationBox } from '../components/ControlledAnnotationBox';

const Annotations: NextPage = () => {
  const [snackPack, setSnackPack] = useState<readonly SnackbarMessage[]>([]);
  const router = useRouter();
  const { id } = router.query;
  const { fetchedAnnotation, isAnnotationLoading, mutate } = useAnnotation(id);

  const trueId = fetchedAnnotation?._id;

  // se não tiver id, ou fetch inicial da annotation ainda tá acontecendo, retorna loading
  if (!id || isAnnotationLoading)
    return (
      <Grid xs={12} display='flex' justifyContent='center' alignItems='stretch'>
        <CircularProgress />
      </Grid>
    );

  // se entrar com id e tiver alias, redireciona a url pro alias
  if (fetchedAnnotation?.alias && id != fetchedAnnotation.alias) {
    router.push(`${fetchedAnnotation.alias}`);
  }

  // se já tem id, não tá dando loading e trueId não foi encontrado, redireciona pra notfound
  if (id && !isAnnotationLoading && !trueId)
    return (
      <Grid xs={12} display='flex' justifyContent='center' alignItems='stretch'>
        NOT FOUND
      </Grid>
    );

  return (
    <>
      <ConsecutiveSnackbar snackPack={snackPack} setSnackPack={setSnackPack} />
      <MyAppBar />
      <Container fixed>
        <Grid
          container
          spacing={2}
          sx={{ marginTop: { xs: '1rem' } }}
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <ControlledAnnotationBox
            id={id}
            trueId={trueId}
            fetchedAnnotation={fetchedAnnotation}
            isAnnotationLoading={isAnnotationLoading}
            mutate={mutate}
            setSnackPack={setSnackPack}
          />
        </Grid>
      </Container>
    </>
  );
};

export default Annotations;
