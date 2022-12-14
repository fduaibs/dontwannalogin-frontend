import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import LoadingButton from '@mui/lab/LoadingButton';
import AdbIcon from '@mui/icons-material/Adb';
import Divider from '@mui/material/Divider';
import ConsecutiveSnackbar, {
  SnackbarMessage,
} from '../components/ConsecutiveSnackbar';
import { createAnnotation } from '../services/dontWannaLogin';

const Home: NextPage = () => {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [snackPack, setSnackPack] = useState<readonly SnackbarMessage[]>([]);

  const router = useRouter();

  const handleCreateClick = async () => {
    setButtonLoading(true);
    const { statusCode, data } = await createAnnotation();

    if (statusCode === 201 && data?.alias) router.push(`/${data?.alias}`);
    else {
      setSnackPack((prev: any) => [
        ...prev,
        {
          message: 'Não foi possível criar uma nova anotação',
          severity: 'error',
          key: new Date().getTime(),
        },
      ]);
      setButtonLoading(false);
    }
  };

  return (
    <Container fixed>
      <Head>
        <title>NãoQueroLogar!</title>
        <meta name='description' content='Bloco de notas persistente online.' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Grid container spacing={0}>
        <ConsecutiveSnackbar
          snackPack={snackPack}
          setSnackPack={setSnackPack}
        />
        <Grid
          xs={12}
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <Typography
            variant='h1'
            component='div'
            sx={{
              fontSize: { xs: '2rem', sm: '3.5rem', md: '6rem' },
              mt: 8,
              display: { xs: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            NãoQueroLogar!
          </Typography>
          <AdbIcon
            sx={{
              display: { xs: 'flex' },
              mt: 4,
              fontSize: { sx: '2.5rem', sm: '4rem', md: '6rem' },
            }}
          />
        </Grid>
        <Grid
          xs={12}
          sx={{ mt: '2rem' }}
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <Grid xs={4}>
            <Divider variant='middle' />
          </Grid>
        </Grid>
        <Grid
          xs={12}
          display='flex'
          justifyContent='center'
          alignItems='center'
          sx={{ mt: '10rem' }}
        >
          <LoadingButton
            loading={buttonLoading}
            variant='contained'
            size='large'
            onClick={handleCreateClick}
            sx={{ fontSize: { sx: '0.5rem', sm: '1.5rem' } }}
          >
            Criar uma nova anotação
          </LoadingButton>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
