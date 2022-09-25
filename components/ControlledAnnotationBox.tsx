import { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { AliasInput } from './AliasInput';
import { AnnotationBoxController } from './AnnotationBoxController';
import { AnnotationBox } from './AnnotationBox';

export interface ControlledAnnotationBox {
  id: string | string[] | undefined;
  trueId: string;
  setSnackPack: any;
  fetchedAnnotation: any;
  isAnnotationLoading: boolean;
  mutate: any;
}

export const ControlledAnnotationBox = ({
  id,
  trueId,
  setSnackPack,
  fetchedAnnotation,
  isAnnotationLoading,
  mutate,
}: ControlledAnnotationBox) => {
  const [annotation, setAnnotation] = useState('');

  useEffect(() => {
    if (!isAnnotationLoading) setAnnotation(fetchedAnnotation?.data || '');
  }, [isAnnotationLoading]);

  return (
    <>
      <Grid
        xs={12}
        sm={7}
        md={5}
        lg={4}
        display='flex'
        justifyContent={{ xs: 'center', sm: 'flex-end' }}
        alignItems='center'
      >
        <AliasInput
          id={id}
          trueId={trueId}
          setSnackPack={setSnackPack}
        />
      </Grid>
      <Grid
        xs={12}
        sm
        display='flex'
        justifyContent={{ xs: 'center', sm: 'flex-end' }}
        alignItems='center'
      >
        <AnnotationBoxController
          trueId={trueId}
          annotation={annotation}
          setAnnotation={setAnnotation}
          data={fetchedAnnotation?.data}
          mutate={mutate}
          setSnackPack={setSnackPack}
        />
      </Grid>
      <Grid
        xs={12}
        display='flex'
        justifyContent='center'
        alignItems='stretch'
      >
        <AnnotationBox
          annotation={annotation}
          setAnnotation={setAnnotation}
        />
      </Grid>
    </>
  );
};
