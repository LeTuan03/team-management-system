import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Autocomplete, Grid } from '@mui/material';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { filterOptions } from 'src/AppFunction';
import { STATUS_MATCH, TYPE_MATCH } from 'src/AppConst';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function ManageCalendarDialog(props) {
    let {
        open, 
        handleClose,
        item
    } = props;
    const [dataState, setDataState] = React.useState({});

    const validateSubmit = () => {
        return true;
    }

    const handleSubmit = async () => {
        if(!validateSubmit()) return;
    }

    const handleSetData = (value, name) => {
        console.log(value)
        setDataState((pre) => ({...pre, [name]: value}));
    }

    React.useEffect(() => {
        setDataState({...item});
        console.log(item)
    }, [])
    return (
        <BootstrapDialog
            maxWidth="lg"
            minWidth="lg"
            width="lg" 
            onClose={handleClose}
            fullWidth
            open={open}
        >
            <ValidatorForm onSubmit={handleSubmit}>
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Add new/update match schedule
                </DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={2}>
                        <Grid item md={3} sm={6} xs={12}>                            
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    className='w-100'
                                    label="Time start"
                                    format='dd/mm/yyyy'
                                    value={dataState?.date}
                                    onChange={(value) => handleSetData( value, "date" )}
                                    // variant="standard" 
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item md={3} sm={6} xs={12}>
                            <Autocomplete
                                className="mt-3"
                                id="combo-box"
                                size="small"
                                fullWidth
                                options= {TYPE_MATCH}
                                onChange={(event, value) => handleSetData( value, "type" )}
                                value={dataState?.type || null}
                                getOptionLabel={(option) => option.name || ""}
                                filterOptions={filterOptions}
                                renderInput={(params) => (
                                <TextValidator
                                    {...params}
                                    label="Type of competition"
                                    // variant="standard"
                                    value={dataState?.type || ""}
                                />
                                )}
                                validators={["required"]}
                                errorMessages={["general.required"]}
                            />
                        </Grid>
                        <Grid item md={3} sm={6} xs={12}>
                            <Autocomplete
                                className="mt-3"
                                id="combo-box"
                                size="small"
                                fullWidth
                                options= {STATUS_MATCH}
                                onChange={(event, value) => handleSetData( value, "status" )}
                                value={dataState?.status || null}
                                getOptionLabel={(option) => option.name || ""}
                                filterOptions={filterOptions}
                                renderInput={(params) => (
                                <TextValidator
                                    {...params}
                                    label="Status"
                                    // variant="standard"
                                    value={dataState?.status || ""}
                                />
                                )}
                                validators={["required"]}
                                errorMessages={["general.required"]}
                            />
                        </Grid>
                        <Grid item md={3} sm={6} xs={12}>
                            <Autocomplete
                                className="mt-3"
                                id="combo-box"
                                size="small"
                                fullWidth
                                options= {STATUS_MATCH}
                                onChange={(event, value) => handleSetData( value, "team1" )}
                                value={dataState?.team1 || null}
                                getOptionLabel={(option) => option.name || ""}
                                filterOptions={filterOptions}
                                renderInput={(params) => (
                                <TextValidator
                                    {...params}
                                    label="Team 2"
                                    // variant="standard"
                                    value={dataState?.team1 || ""}
                                />
                                )}
                                validators={["required"]}
                                errorMessages={["general.required"]}
                            />
                        </Grid>
                        <Grid item md={3} sm={6} xs={12}>
                            <Autocomplete
                                className="mt-3"
                                id="combo-box"
                                size="small"
                                fullWidth
                                options= {STATUS_MATCH}
                                onChange={(event, value) => handleSetData( value, "team2" )}
                                value={dataState?.team2 || null}
                                getOptionLabel={(option) => option.name || ""}
                                filterOptions={filterOptions}
                                renderInput={(params) => (
                                <TextValidator
                                    {...params}
                                    label="Team 2"
                                    // variant="standard"
                                    value={dataState?.team2 || ""}
                                />
                                )}
                                validators={["required"]}
                                errorMessages={["general.required"]}
                            />
                        </Grid>
                        <Grid item md={6} sm={6} xs={12}>
                            <TextValidator
                                className='w-100'
                                // variant="standard" 
                                label='Location'
                                name="Location"
                                value={dataState?.Location}
                                onChange={(event) => handleSetData( event.target.value, "Location" )}
                                validators={['required']}
                                errorMessages={['general.required']}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                <Button  variant="contained" onClick={handleClose} color="error">
                    Cancel
                </Button>
                <Button  variant="contained" type="submit">
                    Save
                </Button>
                </DialogActions>
            </ValidatorForm>
        </BootstrapDialog>
    );
}