import {Box, TextField, IconButton} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import {IPreEnrollmentSelectionResponse} from "../../utility/requests/responseTypes";

export 
function escapeRegExp(value: string): string {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

type RequestSearchArgs = {
    setSearchText: (searchValue: string) => void,
    searchValue: string,
    rows: IPreEnrollmentSelectionResponse[],
    rowSetter: (newRows:any[]) => void
}

export
async function requestSearch(args: RequestSearchArgs) {
    args.setSearchText(args.searchValue);
    const searchRegex = new RegExp(escapeRegExp(args.searchValue), "i");
    const filteredRows = args.rows.filter((row:IPreEnrollmentSelectionResponse) => {
        return searchRegex.test(row.course.courseName) || searchRegex.test(row.course.courseCode)
    });
    args.rowSetter(filteredRows);
}

export type QuickSearchToolbarProps = {
    clearSearch: () => void;
    onChange: () => void;
    value: string;
}

function QuickSearchToolbar(props: QuickSearchToolbarProps) {
    return <Box
            sx={{
                p: 0.5,
                pb: 0
            }}
            >
            <TextField
                variant="standard"
                value={props.value}
                onChange={props.onChange}
                placeholder="Quick Search..."
                InputProps={{
                    startAdornment: <SearchIcon fontSize="small" />,
                    endAdornment: (
                        <IconButton
                            title="Clear"
                            aria-label="Clear"
                            size="small"
                            style={{ visibility: props.value ? "visible" : "hidden" }}
                            onClick={props.clearSearch}
                        >
                            <ClearIcon fontSize="small" />
                        </IconButton>
                    )
                }}
                sx={{
                    width: {
                        xs: 0.8,
                        sm: "auto"
                    },
                    m: (theme) => theme.spacing(1, 0.5, 1.5),
                    "& .MuiSvgIcon-root": {
                        mr: 0.5
                    },
                    "& .MuiInput-underline:before": {
                        borderBottom: 1,
                        borderColor: "divider"
                    }
                }}
            />
        </Box>
}

export default QuickSearchToolbar