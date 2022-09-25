import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import AdbIcon from '@mui/icons-material/Adb';

export const MyAppBar = () => {
  return (
    <>
      <AppBar position='static'>
        <Toolbar disableGutters>
          <Typography
            variant='h4'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <AdbIcon sx={{ display: { xs: 'flex' }, mr: 1, mt: 0.9, ml: 1 }} />
            NãoQueroLogar!
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};
