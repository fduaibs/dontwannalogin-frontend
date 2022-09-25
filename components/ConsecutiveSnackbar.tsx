import { useState, useEffect, forwardRef, SyntheticEvent } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

export interface SnackbarMessage {
  severity: 'error' | 'warning' | 'info' | 'success';
  message: string;
  key: number;
}

export interface ConsecutiveSnackbar {
  snackPack: readonly SnackbarMessage[];
  setSnackPack: any;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return (
    <MuiAlert
      elevation={6}
      ref={ref}
      variant='filled'
      {...props}
    />
  );
});

export default function ConsecutiveSnackbar({
  snackPack,
  setSnackPack,
}: ConsecutiveSnackbar) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<SnackbarMessage | undefined>(
    undefined
  );

  useEffect(() => {
    if (snackPack.length && !errorMessage) {
      setErrorMessage({ ...snackPack[0] });
      setSnackPack((prev: any) => prev.slice(1));
      setSnackbarOpen(true);
    } else if (snackPack.length && errorMessage && snackbarOpen) {
      setSnackbarOpen(false);
    }
  }, [snackPack, errorMessage, snackbarOpen]);

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleExited = () => {
    setErrorMessage(undefined);
  };

  return (
    <div>
      <Snackbar
        key={errorMessage ? errorMessage.key : undefined}
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleClose}
        TransitionProps={{ onExited: handleExited }}
        message={errorMessage ? errorMessage.message : undefined}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleClose}
          severity={errorMessage?.severity}
          sx={{ width: '100%' }}
        >
          {errorMessage?.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
