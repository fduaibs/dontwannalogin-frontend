import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';

const createAnnotation = async () => {
  const createdAnnotation = await fetch(`${process.env.NEXT_PUBLIC_API_BASEURL}/annotations/`, {
    method: 'POST',
    body: JSON.stringify({
      alias: '',
      password: '',
      data: '',
    }),
  });

  return createdAnnotation.json();
}

const Home: NextPage = () => {
  const router = useRouter();

  const handleCreateClick = async () => {
    const createdAnnotation = await createAnnotation();

    if (createdAnnotation?.alias) router.push(`/${createdAnnotation?.alias}`)
  }

  return (
    <Container fixed>
      <Head>
        <title>DontWannaLogin</title>
        <meta name="description" content="A Description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <Grid container spacing={0}>

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
            NaoQueroLogar!
          </Typography>
          <AdbIcon sx={{ display: { xs: 'flex' }, mt: 4, fontSize: { sx: '2.5rem', sm: '4rem', md: '6rem' } }} />
        </Grid>

        <Grid xs={12} sx={{ mt: '2rem' }} display="flex" justifyContent="center" alignItems="center">
          <Grid xs={4}>
            <Divider variant="middle" />
          </Grid>
        </Grid>

        <Grid xs={12} display="flex" justifyContent="center" alignItems="center" sx={{ mt: '10rem' }}>
          <Button variant="contained" size="large" onClick={handleCreateClick} sx={{ fontSize: { sx: '0.5rem', sm: '1.5rem' } }}>Criar uma nova anotação</Button>
        </Grid>
        {/* 
        <Grid xs={12} display="flex" justifyContent="center" alignItems="center" sx={{ fontSize: { sx: '0.5rem', sm: '1.5rem' }, mt: '1rem' }}>
          <Grid xs={5}>
            <TextField id="standard-basic" variant="standard" sx={{ width: '250px', ml: '100px' }} />
            <Button key="edit" sx={{ ml: '3px' }}>IR</Button>
          </Grid>
        </Grid> */}
      </Grid>
    </Container >
  )
}

export default Home
