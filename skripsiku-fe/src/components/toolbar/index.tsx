import React from "react";
import {
    Box,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon,
    Typography,
} from "@mui/material";
import Spacer from "../spacer";
import { Search as SearchIcon } from "../../icons/search";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from "@mui/material/Autocomplete";
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import Helpers from "../../helpers";

interface ToolbarInterface {
    title?: string,
    customRender?: any,
    isActiveFilter?: boolean,
    onFilter?: any,
    forms?: any,
    useLabel?: boolean
}

export const ToolbarComponent = (props: ToolbarInterface) => {
    const { title, customRender, isActiveFilter, onFilter, forms = [], useLabel = true } = props;


    const handleSearch = (event: any, name: string) => {
        if (onFilter) {
            onFilter(event, name);
        }
    };


    const renderFilter = (form: any) => {

        const type = {
            dropdown: "dropdown",
            text: "text",
            date: "date",
            range: "range",
            reset: "reset",
        };
        const { filter } = form
        switch (filter.type) {
            case type.text:
                return (
                    <>
                        <Box sx={{ width: 280 }}>
                            {useLabel && <p style={{ marginBottom: "8px", fontSize: '14px' }}>{form.label}</p>}

                            <TextField
                                fullWidth
                                onKeyPress={(event: any) => {
                                    if (event.key === "Enter") {
                                        event.preventDefault();
                                        handleSearch(event.target.value, form.name);
                                    }
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SvgIcon color="action" fontSize="small">
                                                <SearchIcon />
                                            </SvgIcon>
                                        </InputAdornment>
                                    ),
                                }}
                                size="small"
                                placeholder={form.label}
                                variant="outlined"
                            />
                        </Box>
                        <Spacer />
                    </>
                )
            case type.dropdown:
                return (
                    <>
                        <Box sx={{ width: 280 }}>
                            {useLabel && <p style={{ marginBottom: "8px", fontSize: '14px' }}>{form.label}</p>}
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={filter.dataSource}
                                onChange={(event, values: any) => {

                                    if (values && values.value) {
                                        handleSearch(values.value, form.name);
                                    }
                                    else {
                                        handleSearch(null, form.name);
                                    }

                                }}
                                sx={{ width: '100%' }}
                                renderInput={(params) => <TextField {...params} size="small" placeholder={form.label} />}
                            />

                        </Box>
                        <Spacer />
                    </>
                )
            case type.date:


                return (
                    <>
                        <Box sx={{ width: 280 }}>
                            {useLabel && <p style={{ marginBottom: "8px", fontSize: '14px' }}>{form.label}</p>}
                            <DesktopDatePicker
                                inputFormat="MM/dd/yyyy"
                                value={form.initialValue}
                                onChange={(newValue) => {
                                    handleSearch(newValue, form.name);
                                }}
                                renderInput={(params) => {
                                    return (
                                        <TextField
                                            {...params}
                                            style={{ width: '100%' }}
                                            placeholder={form.label}
                                            size="small"
                                        />
                                    )
                                }}
                            />
                        </Box>
                        <Spacer />
                    </>
                )
            default:
                return null
        }
    }
    return (
        <Box {...props}>
            <Box
                sx={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    // m: -1,
                }}
            >
                <Typography sx={{ m: 1 }} variant="h5">
                    {title}
                </Typography>
                {customRender ? <Box sx={{ m: 1 }}>{customRender()} </Box> : null}
            </Box>
            {isActiveFilter && <Box sx={{ mt: 3 }}>
                <Card style={{ padding: '20px' }}>
                    <div style={{ display: "flex" }}>
                        {forms.map((type: any, index: any) => {
                            return (
                                <React.Fragment key={index}>
                                    {renderFilter(type)}
                                </React.Fragment>
                            )
                        })}
                    </div>
                </Card>
            </Box>}
        </Box>
    );
};
