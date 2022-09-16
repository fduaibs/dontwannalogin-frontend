import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CircularProgress from '@mui/material/CircularProgress'
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';

const fetcher = async (input: RequestInfo | URL, init?: RequestInit | undefined) => await fetch(input, init).then(res => res.json())

const useAnnotation = (id: string | string[] | undefined) => {
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_BASEURL}/annotations/${id}`, fetcher);

  return {
    fetchedAnnotation: data,
    isAnnotationLoading: !error && !data,
    isAnnotationError: error,
  }
}

const updateAnnotationData = async (annotation: string, id: string | string[] | undefined) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BASEURL}/annotations/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ data: annotation }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
}

const updateAlias = async (id: string | string[] | undefined, alias: string | string[] | undefined) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BASEURL}/annotations/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ alias: alias }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
}

const TextBoxOptionBar = ({ id, handleClearClick, handleResetClick, handleSaveClick }: { id: string | string[] | undefined, handleClearClick: any, handleResetClick: any, handleSaveClick: any }) => {
  const [inputState, setInputState] = useState(true);
  const [alias, setAlias] = useState(id);
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAlias(event.target.value)
  }

  const handleEditClick = () => {
    setInputState(false);
  }

  const handleCancelClick = () => {
    setInputState(true);
  }

  const handleDoneClick = async () => {
    await updateAlias(id, alias);
    setInputState(true);
    router.push(`/${alias}`);
  }

  return (
    <>
      <Grid xs={6} display='flex' justifyContent="flex-start" alignItems="center">
        <TextField value={alias} disabled={inputState} id="standard-basic" variant="standard" onChange={handleChange} />
        {!inputState ? (
          <>
            <Button key="done" onClick={handleDoneClick}>Done</Button>
            <Button key="cancel" onClick={handleCancelClick}>Cancel</Button>
          </>
        ) : (
          <Button key="edit" onClick={handleEditClick}>Edit</Button>
        )}
      </Grid>
      <Grid xs={6} display='flex' justifyContent="flex-end" alignItems="center">
        <ButtonGroup aria-label="medium secondary button group">
          {[
            <Button key="save" onClick={handleSaveClick}>Save</Button>,
            <Button key="reset" onClick={handleResetClick}>Reset</Button>,
            <Button key="clear" onClick={handleClearClick}>Clear</Button>,
          ]}
        </ButtonGroup>
      </Grid>
    </>
  );
}

const TextBox = ({ annotation, handleChange }: { annotation: string, handleChange: any }) => {
  return (
    <Grid xs={12} display='flex' justifyContent="center" alignItems="stretch">
      <TextField id="outlined-multiline-static" multiline fullWidth rows={25} value={annotation} onChange={handleChange} />
    </Grid>
  );
}

const Content = ({ id }: { id: string | string[] | undefined }) => {
  const [annotation, setAnnotation] = useState('');
  const { fetchedAnnotation, isAnnotationLoading, isAnnotationError } = useAnnotation(id);
  const { mutate } = useSWRConfig()

  useEffect(() => {
    if (!isAnnotationLoading) setAnnotation(fetchedAnnotation?.data || '');
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

  const handleSaveClick = async () => {
    await updateAnnotationData(annotation, id);
    await mutate(`${process.env.NEXT_PUBLIC_API_BASEURL}/annotations/${id}`, annotation);
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
      <TextBoxOptionBar id={id} handleClearClick={handleClearClick} handleResetClick={handleResetClick} handleSaveClick={handleSaveClick} />
      <TextBox annotation={annotation} handleChange={handleChange} />
    </Grid >
  )
}

const MyAppBar = () => {
  return (
    <>
      <AppBar position="static">
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          NaoQueroLogar
        </Typography>
      </AppBar>
    </>
  );
}

const Annotations: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <MyAppBar />
      <Container fixed>
        {id ? (
          <Content id={id} />
        ) : (
          <CircularProgress />
        )}
      </Container >
    </>
  );
}

export default Annotations