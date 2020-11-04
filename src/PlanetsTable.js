
import React from 'react';
import ReactDOM from 'react-dom';

import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
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

const columns = [
   { field: 'name', headerName: 'Name', width: 100 },
   { field: 'climate', headerName: 'Climate', width: 100 },
   { field: 'residents', headerName: 'Residents', width: 100 },
   { field: 'terrain', headerName: 'Terrain', width: 150 },
   { field: 'population', headerName: 'Population', width: 150 },
   { field: 'surfaceArea', headerName: 'Surface Area', width: 50 },
];

function PlanetsTable() {
   const classes = useStyles();
   const [allPlanetDataRows, setAllPlanetDataRows] = React.useState([]);
   
   React.useEffect(
      () => {
         Axios.get("https://swapi.dev/api/planets/")
         .then((response) => {
            const results = response.data.results;
            console.log(results);
            const rows = results.map((planet, index) => {
               return {
                  id: index,
                  name: planet.name,
                  climate: planet.climate !== 'unknown' ? planet.climate : '?',
                  residents: 0,
                  terrain: planet.terrain !== 'unknown' ? planet.terrain : '?',
                  population: planet.population !== 'unknown' ? planet.population : '?',
                  surfaceArea: 0,
               };
            });
            setAllPlanetDataRows(rows);
         });
      },
      []
   );

    return (
      <div style={{ height: 400, width: '100%' }}>
         <DataGrid rows={allPlanetDataRows} columns={columns} pageSize={10} />
      </div>
    );
};

export default PlanetsTable;