import { useState } from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import LoadingButton from '@mui/lab/LoadingButton';
import AdbIcon from '@mui/icons-material/Adb';
import Divider from '@mui/material/Divider';
import CustomSnackbar from '../components/CustomSnackbar';

const createAnnotation = async () => {
  const createdAnnotation = await fetch(`${process.env.NEXT_PUBLIC_API_BASEURL}/annotations/`, {
    method: 'POST',
    body: JSON.stringify({ alias: '', password: '', data: '' }),
  });

  return { statusCode: createdAnnotation.status, data: await createdAnnotation.json(), message: createdAnnotation.statusText };
}

const Home: NextPage = () => {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  const handleCreateClick = async () => {
    setButtonLoading(true);
    const { statusCode, message, data } = await createAnnotation();
    if (statusCode === 201 && data?.alias) router.push(`/${data?.alias}`)
    else {
      setIsSnackbarOpen(true);
      setErrorMessage(message);
      setButtonLoading(false);
    };
  }

  return (
    <Container fixed>
      <Head>
        <title>NãoQueroLogar!</title>
        <meta name="description" content="Bloco de notas persistente online." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid container spacing={0}>
        <CustomSnackbar severity="error" message={errorMessage} snackBarState={isSnackbarOpen} snackbarStateSetter={setIsSnackbarOpen} />
        <Grid xs={12} display="flex" justifyContent="center" alignItems="center">
          <Typography variant="h1" component="div" sx={{
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '6rem' },
            mt: 8,
            display: { xs: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }} >
            NãoQueroLogar!
          </Typography>
          <AdbIcon sx={{ display: { xs: 'flex' }, mt: 4, fontSize: { sx: '2.5rem', sm: '4rem', md: '6rem' } }} />
        </Grid>
        <Grid xs={12} sx={{ mt: '2rem' }} display="flex" justifyContent="center" alignItems="center">
          <Grid xs={4}>
            <Divider variant="middle" />
          </Grid>
        </Grid>
        <Grid xs={12} display="flex" justifyContent="center" alignItems="center" sx={{ mt: '10rem' }}>
          <LoadingButton loading={buttonLoading} variant="contained" size="large" onClick={handleCreateClick} sx={{ fontSize: { sx: '0.5rem', sm: '1.5rem' } }}>Criar uma nova anotação</LoadingButton >
        </Grid>
      </Grid>
    </Container >
  )
}

export default Home;
