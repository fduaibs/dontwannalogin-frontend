import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import { updateAlias } from '../services/dontWannaLogin';

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
    if (alias === id) {
      setDoneButtonLoading(true);
      setSnackPack((prev: any) => [
        ...prev,
        {
          message: 'O apelido precisa ser diferente do atual',
          severity: 'error',
          key: new Date().getTime(),
        },
      ]);
      setDoneButtonLoading(false);
    } else {
      setDoneButtonLoading(true);
      const { statusCode, message } = await updateAlias(trueId, alias);
      if (statusCode === 204) {
        setInputState(false);
        setDoneButtonLoading(false);
        router.push(`/${alias}`);
      } else {
        setSnackPack((prev: any) => [
          ...prev,
          { message, severity: 'error', key: new Date().getTime() },
        ]);
        setDoneButtonLoading(false);
      }
    }
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
