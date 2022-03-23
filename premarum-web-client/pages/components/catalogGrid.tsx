import { Box } from "@mui/material";
import { GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, DataGrid, GridColumns } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
]

function CustomToolbar() {
    return(
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
        </GridToolbarContainer>
    )
}

export default function CatalogGrid() {
    const { data } = useDemoData({
        dataSet: 'Commodity',
        rowLength: 30,
        maxColumns: 6,
    });

    return(
        <Box sx={classes.containerBox}>
            <DataGrid
                checkboxSelection
                rows={data.rows}
                columns={data.columns as GridColumns}
                autoHeight
                components={{
                    Toolbar: CustomToolbar,
                }}
            />
        </Box>
    )
}

const useStyles = {
    containerBox: {

    }
};
  
const classes = useStyles;