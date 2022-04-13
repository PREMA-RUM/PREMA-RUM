import {Box, Button, CircularProgress, Grid, Paper, styled, Tooltip, tooltipClasses, TooltipProps, Typography} from "@mui/material";
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

function CustomToolbar() {
    return(
        <Box sx={classes.toolbarBox}>
            <GridToolbarContainer>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
            </GridToolbarContainer>
        </Box>
    )
}

type AddSelectionProps = {
    preEnrollmentId: number,
    changeTab: () => void,
    selectionsRef: any
}

export function AddSelectionButton({preEnrollmentId, selectionsRef, changeTab}: AddSelectionProps) {
    const { addSelectionFn } = usePreEnrollment(preEnrollmentId)
    const [isLoading, setIsLoading] = useState(false)
    // const [selected, setSelected] = useState(false)

    // useEffect(() => {
    //     selectionsRef.current.length === 0? setSelected(false) : setSelected(true)
    //     console.log(selectionsRef.current.length)
    // })
    
    return(
        <Button
            startIcon={<AddRounded/>}
            variant="contained"
            sx={classes.addSelectionButton}
            onClick={async () => {
                setIsLoading(true)
                if (selectionsRef.current.length === 0) {
                    setIsLoading(false)
                    return
                }
                try {
                    await addSelectionFn(selectionsRef.current)
                } catch (err) {
                    alert(err)
                    selectionsRef.current = []
                    changeTab()
                    return
                }
                selectionsRef.current = []
                changeTab()
            }}
            disabled={isLoading}
        >
            Add Selection
        </Button>
    )
}

type CatalogGridProps = {
    semesterId: number,
    exclude: number[],
    selectionsRef: any// Ids to exclude
}

export default function CatalogGrid({semesterId, exclude, selectionsRef}: CatalogGridProps) {
    const {courseOfferings, isLoading, isError} = useSemesterOfferings(semesterId);
    const [rows, setRows] = useState([])
    
    useEffect(() => {
        if (!isLoading)  {
            console.log(courseOfferings)
            GetRows(courseOfferings.filter(co => !exclude.includes(co.id)))
                .then(res => {setRows(res as any)})   
        }
    }, [courseOfferings])
    
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
                rows={rows}
                columns={GetColumnFormat({creditSum: null})}
                autoHeight
                components={{
                    Toolbar: CustomToolbar,
                }}
            />
        </Paper>
    )
}

const useStyles = {
    toolbarBox: {
        marginTop: 1,
        marginLeft: 1,
    },
    containerBox: {

    },
    addSelectionButton: {
        backgroundColor: 'secondary.main',
    },
};
  
const classes = useStyles;