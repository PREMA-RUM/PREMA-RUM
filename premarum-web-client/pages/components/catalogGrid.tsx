import { Box } from "@mui/material";
import { GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, DataGrid, GridColumns } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";


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