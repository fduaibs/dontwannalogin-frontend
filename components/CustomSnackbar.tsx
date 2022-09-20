import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref,) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomSnackbar({ severity, message, isSnackbarOpen, handleSnackBarClose }: { severity: AlertColor | undefined, message: string, isSnackbarOpen: boolean, handleSnackBarClose: any }) {
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={isSnackbarOpen} autoHideDuration={5000} onClose={handleSnackBarClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={handleSnackBarClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}