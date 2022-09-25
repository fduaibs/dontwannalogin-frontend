import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import { updateAlias } from '../services/dontWannaLogin';
import { aliasValidForUpdate } from '../utils/aliasValidForUpdate';

export interface AliasInput {
  id: string | string[] | undefined;
  trueId: string;
  setSnackPack: any;
}

export const AliasInput = ({ id, trueId, setSnackPack }: AliasInput) => {
  const [alias, setAlias] = useState(id);
  const [inputState, setInputState] = useState(false);
  const [doneButtonLoading, setDoneButtonLoading] = useState(false);

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    if (inputState) inputRef.current?.focus();
  }, [inputState]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAlias(event.target.value);
  };

  const handleEditClick = () => {
    setInputState(true);
  };

  const handleDoneClick = async () => {
    setDoneButtonLoading(true);
    const trimmedAlias = alias?.toString().trim();
    const { valid, message, severity } = aliasValidForUpdate(trimmedAlias, id);

    if (!valid) {
      setSnackPack((prev: any) => [
        ...prev,
        {
          message,
          severity,
          key: new Date().getTime(),
        },
      ]);
    } else {
      const { statusCode, message } = await updateAlias(trueId, trimmedAlias);

      if (statusCode === 204) {
        setSnackPack((prev: any) => [
          ...prev,
          {
            message: 'Apelido alterado com sucesso',
            severity: 'success',
            key: new Date().getTime(),
          },
        ]);
        setInputState(false);
        setDoneButtonLoading(false);
        router.push(`/${trimmedAlias}`);
      } else {
        setSnackPack((prev: any) => [
          ...prev,
          { message, severity: 'error', key: new Date().getTime() },
        ]);
      }
    }
    setDoneButtonLoading(false);
  };

  const handleCancelClick = () => {
    setAlias(id);
    setDoneButtonLoading(false);
    setInputState(false);
  };

  return (
    <>
      <TextField
        value={alias}
        fullWidth
        disabled={!inputState}
        inputRef={inputRef}
        id='standard-basic'
        variant='standard'
        onChange={handleChange}
      />
      {inputState ? (
        <>
          <LoadingButton
            loading={doneButtonLoading}
            key='done'
            onClick={handleDoneClick}
          >
            Done
          </LoadingButton>
          <Button key='cancel' onClick={handleCancelClick}>
            Cancel
          </Button>
        </>
      ) : (
        <Button key='edit' onClick={handleEditClick}>
          Edit
        </Button>
      )}
    </>
  );
};
