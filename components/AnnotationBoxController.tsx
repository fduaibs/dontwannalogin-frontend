import { useState } from 'react';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import ButtonGroup from '@mui/material/ButtonGroup';
import { updateAnnotationData } from '../services/dontWannaLogin';

export interface TextBoxController {
  trueId: string;
  annotation: string;
  setSnackPack: any;
  setAnnotation: any;
  data: string;
  mutate: any;
}

export const AnnotationBoxController = ({ trueId, annotation, setAnnotation, setSnackPack, data, mutate }: TextBoxController) => {
  const [saveButtonLoading, setSaveButtonLoading] = useState(false);

  const handleSaveClick = async () => {
    setSaveButtonLoading(true);
    const { statusCode } = await updateAnnotationData(annotation, trueId);

    if (statusCode === 204) {
      setSnackPack((prev: any) => [...prev, { message: 'Conteúdo salvo com sucesso', severity: 'success', key: new Date().getTime() }]);
      mutate();
      setSaveButtonLoading(false);
    } else {
      setSnackPack((prev: any) => [...prev, { message: 'Não foi possível salvar o conteúdo', severity: 'error', key: new Date().getTime() }]);
      setSaveButtonLoading(false);
    }
  }

  const handleResetClick = () => {
    setAnnotation(data);
  }

  const handleClearClick = () => {
    setAnnotation('');
  }

  return (
    <ButtonGroup aria-label="medium secondary button group">
      {[
        <LoadingButton variant="outlined" loading={saveButtonLoading} key="save" onClick={handleSaveClick}>Save</LoadingButton>,
        <Button key="reset" onClick={handleResetClick}>Reset</Button>,
        <Button key="clear" onClick={handleClearClick}>Clear</Button>,
      ]}
    </ButtonGroup>
  );
}
