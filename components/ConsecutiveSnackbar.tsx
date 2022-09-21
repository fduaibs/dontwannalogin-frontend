import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

export interface SnackbarMessage {
  severity: 'error' | 'warning' | 'info' | 'success';
  message: string;
  key: number;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref,) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ConsecutiveSnackbar({ snackPack, setSnackPack, snackBarState, setSnackBarState, errorMessage, setErrorMessage }: { snackPack: readonly SnackbarMessage[], setSnackPack: any, snackBarState: boolean, setSnackBarState: any, errorMessage: SnackbarMessage | undefined, setErrorMessage: any }) {
  React.useEffect(() => {
    if (snackPack.length && !errorMessage) {
      setErrorMessage({ ...snackPack[0] });
      setSnackPack((prev: any) => prev.slice(1));
      setSnackBarState(true);
    } else if (snackPack.length && errorMessage && snackBarState) {
      setSnackBarState(false);
    }
  }, [snackPack, errorMessage, snackBarState]);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBarState(false);
  };

  const handleExited = () => {
    setErrorMessage(undefined);
  };

  return (
    <div>
      <Snackbar
        key={errorMessage ? errorMessage.key : undefined}
        open={snackBarState}
        autoHideDuration={5000}
        onClose={handleClose}
        TransitionProps={{ onExited: handleExited }}
        message={errorMessage ? errorMessage.message : undefined}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity={errorMessage?.severity} sx={{ width: '100%' }}>
          {errorMessage?.message}
        </Alert>
      </Snackbar>
    </div>
  );
}