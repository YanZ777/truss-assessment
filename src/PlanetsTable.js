
import React from 'react';

import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';

import Axios from 'axios';

const useStyles = makeStyles((theme) => ({
   root: {
     flexGrow: 1,
   },
 }));

 /**
  * Render function for how the name cell for the planet will be rendered.
  * Renders the cell as a clickable link that will open in a new tab.
  * Returns a Link component.
  * 
  * @param {object} cell
  * {
  *   value: {
  *      planetName: string,
  *      link: string
  *   }
  * }
  */
const renderNameCell = (cell) => {
   return (
      <Link href={cell.value.link} target="_blank">
         {cell.value.planetName}
      </Link>
   );
};

/**
 * Formatter to be used for any cells that contain numbers.
 * Formats numbers by grouping digits into groups of 3 with spaces in between
 * each group.
 * 
 * @param {object} cell
 * {
 *    value: string
 * }
 */
const formatNumberCell = (cell) => {
   if (cell.value !== '?') {
      const number = parseInt(cell.value);
      const formattedNumber =
         number.toLocaleString('en-US').replaceAll(',', ' ');
      return formattedNumber;
   }
   return cell.value;
};

/**
 * Calculates the amount of surface area that a planet is covered in by water.
 * Assumes that the planet is a perfect sphere.
 * 
 * @param {string} diameterStr
 * Diameter of the planet as a string.
 * 
 * @param {string} surfaceWaterStr
 * Percentage of the planet that is covered by water as a string.
 */
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

/**
 * Column headers to use for the table.
 */
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
   // Error to show if retreiving the data fails.
   const [showError, setShowError] = React.useState("");
   
   React.useEffect(
      () => {
         Axios.get("https://swapi.dev/api/planets/")
         .then((response) => {
            const results = response.data.results;
            // Create the rows for the table and have them be sorted by name.
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