import { useState } from 'react';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useAnnotation } from '../hooks/useAnnotation';

export interface TextBoxController {
  trueId: string;
  annotation: string;
  setSnackPack: any;
  setAnnotation: any;
  data: string;
}

export const AnnotationBoxController = ({
  trueId,
  annotation,
  setAnnotation,
  setSnackPack,
  data,
}: TextBoxController) => {
  const [saveButtonLoading, setSaveButtonLoading] = useState(false);
  const { updateAnnotation } = useAnnotation()

  const handleSaveClick = async () => {
    setSaveButtonLoading(true);
    const response = await updateAnnotation(annotation, trueId);
    if (response) {
      if (response.status === 204) {
        setSnackPack((prev: any) => [
          ...prev,
          {
            message: 'Conteúdo salvo com sucesso',
            severity: 'success',
            key: new Date().getTime(),
          },
        ]);
        setSaveButtonLoading(false);
      }
      else {
        setSnackPack((prev: any) => [
          ...prev,
          {
            message: 'Não foi possível salvar o conteúdo',
            severity: 'error',
            key: new Date().getTime(),
          },
        ]);
        setSaveButtonLoading(false);
      }
    }
};

const handleResetClick = () => {
  setAnnotation(data);
};

const handleClearClick = () => {
  setAnnotation('');
};

return (
  <ButtonGroup aria-label='medium secondary button group'>
    {[
      <LoadingButton
        variant='outlined'
        loading={saveButtonLoading}
        disabled={annotation === data}
        key='save'
        onClick={handleSaveClick}
      >
        Save
      </LoadingButton>,
      <Button
        key='reset'
        onClick={handleResetClick}
        disabled={annotation === data}
      >
        Reset
      </Button>,
      <Button key='clear' onClick={handleClearClick} disabled={!annotation}>
        Clear
      </Button>,
    ]}
  </ButtonGroup>
);
};
