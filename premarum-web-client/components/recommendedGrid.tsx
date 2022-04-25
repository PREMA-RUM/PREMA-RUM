import {
    Box,
    Button,
    CircularProgress,
    Grid,
    Paper,
    styled,
    Tooltip,
    tooltipClasses,
    TooltipProps,
    Typography,
    useMediaQuery
} from "@mui/material";
import {
    DataGrid,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarFilterButton
} from "@mui/x-data-grid";
import React, {useEffect, useState} from "react";
import {useSemesterOfferings} from "../utility/hooks/useSemesterOfferings";
import {AddRounded} from "@mui/icons-material";
import {usePreEnrollment} from "../utility/hooks/usePreEnrollments";
import {GetRows} from "../utility/helpers/selectionToRow";
import { GetColumnFormat } from "../utility/helpers/ColumnFormat";
import {useRecommendations} from "../utility/hooks/useRecommendations";
import QuickSearchToolbar, {QuickSearchToolbarProps, requestSearch} from "./DataGridAddOns/QuickSearchToolbar";
import {useTheme} from "@mui/material/styles";

function CustomToolbar() {
    return(
        <Box sx={classes.toolbarBox}>
            <GridToolbarContainer>
                <GridToolbarFilterButton  />
                <GridToolbarDensitySelector />
            </GridToolbarContainer>
        </Box>
    )
}

function WrapToolBars(props: QuickSearchToolbarProps) {
    const theme = useTheme()
    const match = useMediaQuery(theme.breakpoints.down("sm"))

    return <>
        <QuickSearchToolbar {...props} />
        {!match? <CustomToolbar /> : null}
    </>
}

type RecommendedGridProps = {
    preEnrollmentId: number,
    selectionsRef: any// Ids to exclude
}

export default function RecommendedGrid({preEnrollmentId, selectionsRef}: RecommendedGridProps) {
    const {recommendations, isLoading, isError} = useRecommendations(preEnrollmentId);
    const [rows, setRows] = useState<any[]>([])
    const [quickSearchState, setQuickSearchState] = useState("")
    
    useEffect(() => {
        selectionsRef.current = []
    }, [selectionsRef])
    
    useEffect(() => {
        if (!isLoading)  {
            GetRows(recommendations!)
                .then(res => {setRows(res as any)})   
        }
    }, [recommendations, isLoading])
    
    
    if (!rows || isLoading) {
        return(
            <Grid container direction="column" justifyContent="center" alignContent="center">
                <CircularProgress />
            </Grid>
        )
    }
    
    return(
        <Paper elevation={0} sx={classes.containerBox}>
            <DataGrid
                onSelectionModelChange={async (selectionModel) => {
                    selectionsRef.current = selectionModel.map(
                        sel =>  (rows[sel as number] as any).entryId )
                }}
                checkboxSelection
                pageSize={25}
                rowHeight={75}
                rows={rows}
                columns={GetColumnFormat({creditSum: null})}
                autoHeight
                components={{
                    Toolbar: WrapToolBars
                }}
                componentsProps={{
                    toolbar: {
                        value: quickSearchState,
                        onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
                            requestSearch({
                                searchValue: event.target.value,
                                setSearchText: setQuickSearchState,
                                rowSetter: (rec: any[]) => GetRows(rec).then(res => setRows(res)),
                                rows: recommendations!
                            }),
                        clearSearch: () => {
                            setQuickSearchState("")
                            GetRows(recommendations!)
                                .then(res => setRows(res))
                        }
                    }
                }}
            />
        </Paper>
    )
}

const useStyles = {
    toolbarBox: {
        marginLeft: 1,
    },
    containerBox: {

    },
    addSelectionButton: {
        backgroundColor: 'secondary.main',
    },
};
  
const classes = useStyles;