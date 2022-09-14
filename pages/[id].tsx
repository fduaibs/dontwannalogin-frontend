import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const Annotations: NextPage = () => {
  const [annotations, setAnnotations] = useState('');
  const router = useRouter();
  const { id } = router.query;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnnotations(event.target.value);
  };

  const handleClearClick = () => {
    setAnnotations('');
  }

  return (
    <Container fixed>
      <p>Id: {id}</p>
      <p>Value: {annotations}</p>
      <Grid container spacing={0}>
        <Grid xs={12} display='flex' justifyContent="flex-end" alignItems="center">
          <ButtonGroup aria-label="medium secondary button group">
            {[
              <Button key="save">Save</Button>,
              <Button key="reset">Reset</Button>,
              <Button key="clear" onClick={handleClearClick}>Clear</Button>
            ]}
          </ButtonGroup>
        </Grid>
        <Grid xs={12} display='flex' justifyContent="center" alignItems="stretch">
          <TextField id="outlined-multiline-static" multiline fullWidth rows={25} value={annotations} onChange={handleChange} defaultValue="" />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Annotations