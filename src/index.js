
import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProider from '@material-ui/core/styles/MuiThemeProvider'

import theme from './ThemeProvider.js';

import PlanetsTable from './PlanetsTable.js';

function App() {
   return (
      <MuiThemeProider theme={theme} >
         <PlanetsTable />
      </MuiThemeProider>
   );
};

ReactDOM.render(<App />, document.getElementById("root"));