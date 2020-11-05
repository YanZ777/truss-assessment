import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#cd6149',
    },
    secondary: {
      main: green[500],
    },
  },
  overrides: {
   'MuiDataGrid': {
      cell: {
         borderRight: 'solid 1px grey'
      },
   },
}
});

export default theme;