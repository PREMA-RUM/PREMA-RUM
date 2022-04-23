import {
    Autocomplete,
    Box,
    Card,
    Divider,
    Grid,
    Paper,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material'
import React, { useEffect, useState } from 'react';
import { grey } from '@mui/material/colors';
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from '@mui/x-data-grid';
import getAllSemesters from '../../utility/requests/getAllSemesters';
import { ISemesterResponse } from '../../utility/requests/responseTypes';
import { useSemesterOfferings } from '../../utility/hooks/useSemesterOfferings';
import { GetRows } from '../../utility/helpers/selectionToRow';
import { GetColumnFormat } from '../../utility/helpers/ColumnFormat';
import QuickSearchToolbar, {
    QuickSearchToolbarProps,
    requestSearch
} from "../../components/DataGridAddOns/QuickSearchToolbar";
import {Theme, useTheme} from "@mui/material/styles";
import {CatalogMobileTopArea, CatalogWideScreenTopArea} from "../../components/Catalog/TopCard";


function CustomToolbar() {
    const theme = useTheme();
    const classes = useStyles(theme)
    
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

function WrapToolBars(props: QuickSearchToolbarProps) {
    const theme = useTheme()
    const match = useMediaQuery(theme.breakpoints.down("sm"))

    return <>
        <QuickSearchToolbar {...props} />
        {!match? <CustomToolbar /> : null}
    </>
}

type SemesterProps = {
    semesters: ISemesterResponse[]
}

export default function Catalog({semesters}: SemesterProps) {
    const [semesterID, setSemesterID] = useState(0)
    const {courseOfferings, isLoading, isError} = useSemesterOfferings(semesterID);
    const [rows, setRows] = useState([])
    const [quickSearchState, setQuickSearchState] = useState("")
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("sm"))
    const classes = useStyles(theme)
    
    const handleSemesterID = (id: number) => {
        setSemesterID(id);
    };

    useEffect(() => {
        if (!isLoading)  {
            GetRows(courseOfferings).then(res => {setRows(res as any)})
        }
    }, [courseOfferings])

    return (
        <>
        <Grid container direction="column">

            <Grid item>
                {matches? 
                    <CatalogMobileTopArea semesters={semesters} handleSelect={setSemesterID} />: 
                    <CatalogWideScreenTopArea semesters={semesters} handleSelect={setSemesterID} />
                }
            </Grid>
            
            <Grid item>
                <Card sx={classes.contentCard} >
                    <Paper elevation={0} sx={classes.dataContainer}>
                        <DataGrid
                            autoHeight
                            disableSelectionOnClick
                            pageSize={25}
                            rowHeight={75}
                            rows={rows}
                            columns={GetColumnFormat({creditSum: null})}
                            components={{
                                Toolbar: WrapToolBars,
                            }}
                            loading={isLoading}
                            componentsProps={{
                                toolbar: {
                                    value: quickSearchState,
                                    onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
                                        requestSearch({
                                            searchValue: event.target.value,
                                            setSearchText: setQuickSearchState,
                                            rowSetter: (rec: any[]) => GetRows(rec).then(res => setRows(res as any)),
                                            rows: courseOfferings!
                                        }),
                                    clearSearch: () => {
                                        setQuickSearchState("")
                                        GetRows(courseOfferings?.length >= 0? courseOfferings: [])
                                            .then(res => setRows(res as any))
                                    }
                                }
                            }}
                        />
                    </Paper>
                </Card>
            </Grid>
          
        </Grid>
        </>
    )
}

const useStyles = (theme: Theme) => ({
    toolbarBox: {
        marginTop: 1,
        marginLeft: 1,
    },
    topCard: {
        padding: '5px 25px',
        backgroundColor: 'primary.light',
        marginBottom: 1.5
    },
    title: {
        padding: '8px 0',
    },
    dividerItem: {
        marginLeft: 2,
        marginRight: 2,
    },
    semesterSelect: {
        backgroundColor: 'white',
        minWidth: '300px'
    },
    addCoursesButton: {
        backgroundColor: 'primary.dark'
    },
    contentCard: {
        [theme.breakpoints.down("sm")]: {
          p:1,
          minHeight: '70vh'  
        },
        backgroundColor: grey[100],
        padding: '15px',
        minHeight: '80vh',
        overflow: 'auto',
    },
    dataContainer: {

    },
});

export async function getStaticProps() {
    return {
        props: {
            semesters: await getAllSemesters()
        }, // will be passed to the page component as props
        revalidate: 3600*2 // revalidate every 2 hour
    }
}