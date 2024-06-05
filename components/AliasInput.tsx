import { forwardRef, useEffect, useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import { aliasValidForUpdate } from '../utils/aliasValidForUpdate';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Slide, Typography } from '@mui/material';
import { useAnnotation } from '../hooks/useAnnotation';
import LockIcon from '@mui/icons-material/Lock';

export interface AliasInput {
  id: string | string[] | undefined;
  trueId: string;
  setSnackPack: any;
}

// import { TransitionProps } from '@mui/material/transitions';

// const Transition = forwardRef(function Transition(
//   props: TransitionProps & {
//     children: React.ReactElement<any, any>;
//   },
//   ref: React.Ref<unknown>,
// ) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

export const AliasInput = ({ id, trueId, setSnackPack }: AliasInput) => {
  const [alias, setAlias] = useState(id);
  const [inputState, setInputState] = useState(false);
  const [doneButtonLoading, setDoneButtonLoading] = useState(false);
  // const [senha, setSenha] = useState(``);
  // const [confirmSenha, setConfirmSenha] = useState('');
  // const [erroSenha, setErroSenha] = useState('');
  // const [open, setOpen] = useState(false);
  const { update } = useAnnotation()

  const inputRef = useRef<HTMLInputElement>();


  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };


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
      await update(trueId, trimmedAlias as string).then((response) => {
        if (response) {
          setSnackPack((prev: any) => [
            ...prev,
            {
              message: 'Apelido alterado com sucesso',
              severity: 'success',
              key: new Date().getTime(),
            },
          ]);
          setInputState(false);
        }
      }).catch((error: Error) => {
        setSnackPack((prev: any) => [
          ...prev,
          { message: error.message, severity: 'error', key: new Date().getTime() },
        ]);
      }).finally(() => {
        setDoneButtonLoading(false);
      })
    }
  }

  // const handleAddPassword = () => {
  //   if (senha == confirmSenha) {

  //   } else {
  //     setErroSenha('Senha divergentes!')
  //   }
  // }

  const handleCancelClick = () => {
    setAlias(id);
    setDoneButtonLoading(false);
    setInputState(false);
  };

  return (
    <Grid container>
      <Grid item xs={10} md={10}>
        <TextField
          fullWidth
          value={alias}
          disabled={!inputState}
          inputRef={inputRef}
          id='standard-basic'
          variant='standard'
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={2} md={2}>
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
        {/* <Button variant='contained' color='error' key='password' onClick={handleClickOpen}>
          <LockIcon />
        </Button> */}
      </Grid>



      {/* <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Deseja adicionar senha?"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="password"
            name="password"
            label="Senha"
            type="password"
            fullWidth
            variant="standard"
            onChange={(e) => setSenha(e.target.value)}
          />

          <TextField
            autoFocus
            required
            margin="dense"
            id="confirmPass"
            name="confirmPass"
            label="Confirme a senha"
            type="password"
            fullWidth
            variant="standard"
            onChange={(e) => setConfirmSenha(e.target.value)}
          />
          {erroSenha && (
            <Typography color={'red'}>
              {erroSenha}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fechar</Button>
          <Button onClick={handleAddPassword}>Adicionar senha</Button>
        </DialogActions>
      </Dialog> */}
    </Grid>
  );
};
