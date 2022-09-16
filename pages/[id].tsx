import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CircularProgress from '@mui/material/CircularProgress'
import useSWR from 'swr';

const fetcher = (input: RequestInfo | URL, init?: RequestInit | undefined) => fetch(input, init).then(res => res.json())

const Annotations: NextPage = () => {
  return (
    <Container fixed>
      <Content />
    </Container >
  );
}

const useAnnotation = (id: string | string[] | undefined) => {
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_BASEURL}/annotations/${id}`, fetcher)

  return {
    fetchedAnnotation: data,
    isAnnotationLoading: !error && !data,
    isAnnotationError: error,
  }
}

const TextBoxOptionBar = ({ handleClearClick, handleResetClick }: { handleClearClick: any, handleResetClick: any }) => {
  return (
    <Grid xs={12} display='flex' justifyContent="flex-end" alignItems="center">
      <ButtonGroup aria-label="medium secondary button group">
        {[
          <Button key="save">Save</Button>,
          <Button key="reset" onClick={handleResetClick}>Reset</Button>,
          <Button key="clear" onClick={handleClearClick}>Clear</Button>
        ]}
      </ButtonGroup>
    </Grid>
  );
}

const TextBox = ({ annotation, handleChange }: { annotation: string, handleChange: any }) => {
  return (
    <Grid xs={12} display='flex' justifyContent="center" alignItems="stretch">
      <TextField id="outlined-multiline-static" multiline fullWidth rows={25} value={annotation} onChange={handleChange} />
    </Grid>
  );
}

const Content = () => {
  const [annotation, setAnnotation] = useState('');

  const router = useRouter();
  const { id } = router.query;
  const { fetchedAnnotation, isAnnotationLoading, isAnnotationError } = useAnnotation(id);

  useEffect(() => {
    if (!isAnnotationLoading) setAnnotation(fetchedAnnotation?.data);
  }, [isAnnotationLoading])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnnotation(event.target.value);
  };

  const handleClearClick = () => {
    setAnnotation('');
  }

  const handleResetClick = () => {
    setAnnotation(fetchedAnnotation?.data);
  }

  const handleSaveClick = () => {

  }

  if (isAnnotationLoading) return (
    <Grid container spacing={0}>
      <Grid xs={12} display='flex' justifyContent="center" alignItems="stretch">
        <CircularProgress />
      </Grid>
    </Grid >
  )

  return (
    <Grid container spacing={0}>
      <TextBoxOptionBar handleClearClick={handleClearClick} handleResetClick={handleResetClick} />
      <TextBox annotation={annotation} handleChange={handleChange} />
    </Grid >
  )
}

export default Annotations