import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Grid from '@mui/material/Unstable_Grid2';
import { Container, CircularProgress } from '@mui/material';
import { useAnnotation } from '../hooks/useAnnotation';
import ConsecutiveSnackbar, {
  SnackbarMessage,
} from '../components/ConsecutiveSnackbar';
import { MyAppBar } from '../components/MyAppBar';
import { ControlledAnnotationBox } from '../components/ControlledAnnotationBox';
import { Box, Tab, Tabs } from '@mui/material';
import ControlledImagesBox from '../components/ControlledImagesBox';

const Annotations: NextPage = () => {
  const [snackPack, setSnackPack] = useState<readonly SnackbarMessage[]>([]);
  const [tabs, setTabs] = useState<number>(0);
  const router = useRouter();

  const { id } = router.query;

  const { fetchedAnnotation, getAnnotation, isAnnotationLoading } = useAnnotation()

  useEffect(() => {
    if (id) {
      const annotationId = Array.isArray(id) ? id[0] : id;
      getAnnotation(annotationId)
    }
  }, [id])

  // se não tiver id, ou fetch inicial da annotation ainda tá acontecendo, retorna loading
  if ((!id || isAnnotationLoading) && tabs == 0)
    return (
      <>
        <ConsecutiveSnackbar
          snackPack={snackPack}
          setSnackPack={setSnackPack}
        />
        <MyAppBar />
        <Container fixed>
          <Grid
            item
            xs={12}
            display='flex'
            justifyContent='center'
            alignItems='stretch'
          >
            <CircularProgress />
          </Grid>
        </Container>
      </>
    );

  // se entrar com id e tiver alias, redireciona a url pro alias
  if (fetchedAnnotation?.alias && id != fetchedAnnotation.alias) {
    router.push(`${fetchedAnnotation.alias}`);
  }

  // se já tem id, não tá dando loading e trueId não foi encontrado, redireciona pra notfound
  if (id && !isAnnotationLoading && !fetchedAnnotation?._id)
    return (
      <>
        <ConsecutiveSnackbar
          snackPack={snackPack}
          setSnackPack={setSnackPack}
        />
        <MyAppBar />
        <Container fixed>
          <Grid
            item
            xs={12}
            display='flex'
            justifyContent='center'
            alignItems='stretch'
          >
            NOT FOUND
          </Grid>
        </Container>
      </>
    );

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabs(newValue);
  };

  return (
    <>
      <ConsecutiveSnackbar snackPack={snackPack} setSnackPack={setSnackPack} />
      <MyAppBar />
      <Container maxWidth="xl">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabs} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Anotações" />
            <Tab label="Images" />
          </Tabs>
          <div
            role="tabpanel"
            hidden={tabs !== 0}
            id={`simple-tabpanel-${0}`}
            aria-labelledby={`simple-tab-${0}`}
          >
            {tabs === 0 && (
              <Grid item p={5}>
                <ControlledAnnotationBox
                  id={id}
                  setSnackPack={setSnackPack}
                />
              </Grid>
            )}
          </div>

          <div
            role="tabpanel"
            hidden={tabs !== 1}
            id={`simple-tabpanel-${1}`}
            aria-labelledby={`simple-tab-${1}`}
          >
            {tabs === 1 && (
              <Grid item p={5}>
                <ControlledImagesBox/>
              </Grid>
            )}
          </div>
        </Box>

      </Container>
    </>
  );
};

export default Annotations;
