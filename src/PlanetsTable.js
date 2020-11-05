
import React from 'react';

import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';

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

const renderNameCell = (cell) => {
   return (
      <Link href={cell.value.link} target="_blank">
         {cell.value.planetName}
      </Link>
   );
};

const formatNumberCell = (cell) => {
   if (cell.value !== '?') {
      const number = parseInt(cell.value);
      const formattedNumber =
         number.toLocaleString('en-US').replaceAll(',', ' ');
      return formattedNumber;
   }
   return cell.value;
};

const calulcateWaterSurfaceArea = (diameterStr, surfaceWaterStr) => {
   if (diameterStr === "unknown" || surfaceWaterStr === "unknown") {
      return "?";
   }
   const diameter = parseInt(diameterStr);
   const surfaceWater = parseInt(surfaceWaterStr);
   const r = diameter / 2;
   const surfaceArea = 4 * Math.PI * r ** 2;
   const areaCoveredByWater = Math.ceil(surfaceArea * (surfaceWater / 100));
   return areaCoveredByWater;
};

const columns = [
   { 
      field: 'name',
      headerName: 'Name',
      width: 100,
      renderCell: renderNameCell
   },
   {
      field: 'climate',
      headerName: 'Climate',
      width: 100 
   },
   {
      field: 'residents',
      headerName: 'Residents',
      width: 100,
      valueFormatter: formatNumberCell,
   },
   {
      field: 'terrain',
      headerName: 'Terrain',
      width: 250
   },
   {
      field: 'population',
      headerName: 'Population',
      width: 200,
      valueFormatter: formatNumberCell
   },
   {
      field: 'areaCoveredByWater',
      headerName: 'Area Covered By Water',
      width: 250,
      valueFormatter: formatNumberCell
   },
];

function PlanetsTable() {
   const classes = useStyles();
   const [allPlanetDataRows, setAllPlanetDataRows] = React.useState([]);
   const [showError, setShowError] = React.useState("");
   
   React.useEffect(
      () => {
         Axios.get("https://swapi.dev/api/planets/")
         .then((response) => {
            const results = response.data.results;
            const rows =
               results.map((planet, index) => {
                     return {
                     id: index,
                     name: { planetName: planet.name, link: planet.url },
                     climate: planet.climate !== 'unknown' ? planet.climate : '?',
                     residents: planet.residents.length,
                     terrain: planet.terrain !== 'unknown' ? planet.terrain : '?',
                     population: planet.population !== 'unknown' ? planet.population : '?',
                     areaCoveredByWater: calulcateWaterSurfaceArea(planet.diameter, planet.surface_water),
                  };
               }).sort((rowA, rowB) => {
                  if (rowA.name.planetName < rowB.name.planetName) {
                     return -1;
                  } else if (rowA.name.planetName > rowB.name.planetName) {
                     return 1;
                  } else {
                     return 0;
                  }
               });
            setAllPlanetDataRows(rows);
         })
         .catch((error) => {
            setShowError(true);
         });
      },
      []
   );

    return (
      <div style={{ height: 400, width: '100%' }}>
         <DataGrid
            columns={columns}
            error={showError ? true : null}
            rows={allPlanetDataRows}
            pageSize={10}
         />
      </div>
    );
};

export default PlanetsTable;