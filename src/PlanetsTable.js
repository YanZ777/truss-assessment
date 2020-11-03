
import React from 'react';
import ReactDOM from 'react-dom';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Axios from 'axios';

const useStyles = makeStyles((theme) => ({
   root: {
     flexGrow: 1,
   },
   menuButton: {
     marginRight: theme.spacing(2),
   },
   title: {
     flexGrow: 1,
   },
 }));

function PlanetsTable() {
   const classes = useStyles();
   const [allPlanetData, setAllPlanetData] = React.useState({});

   const createPlanetRow  = (planetData) => {

   } 

   const handleClick = (event) => {
      Axios.get("https://swapi.dev/api/planets/")
         .then((response) => {
            console.log(response);
         });
   }

    return (
      <IconButton 
         edge="start"
         className={classes.menuButton}
         color="inherit"
         aria-label="menu"
         onClick={handleClick}>
         <MenuIcon />
      </IconButton>
    );
};

export default PlanetsTable;