import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Autocomplete, Grid } from '@mui/material';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import AsynchronousAutocomplete from 'src/utils/AsynchronousAutocomplete';
import { filterOptions } from 'src/AppFunction';

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

    const handleSubmit = async () => {

    }

    const handleSetData = (value, name) => {
        setDataState((pre) => ({...pre, [name]: value}));
    }

    React.useEffect(() => {
        setDataState({...item});
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
                    <Grid container spacing={3}>
                        <Grid item md={3} sm={6} xs={12}>
                            <TextValidator
                                className='w-100'
                                label={'sssss'}
                                type="text"
                                name="name"
                                validators={['required']}
                                errorMessages={['general.required']}
                            />
                        </Grid>
                        <Grid item md={3} sm={6} xs={12}>
                            <Autocomplete
                                className="mt-3"
                                id="combo-box"
                                size="small"
                                fullWidth
                                options= {[
                                    { name: 'The Shawshank Redemption', year: 1994 },
                                    { name: 'The Godfather', year: 1972 },
                                    { name: 'The Godfather: Part II', year: 1974 }
                                ]}
                                onChange={(event, value) => handleSetData( value, "type" )}
                                value={item?.type || null}
                                getOptionLabel={(option) => option.name || ""}
                                filterOptions={filterOptions}
                                renderInput={(params) => (
                                <TextValidator
                                    {...params}
                                    label="Type of competition"
                                    variant="standard"
                                    value={item?.type || ""}
                                />
                                )}
                                // noOptionsText={t("general.noOption")}
                                validators={["required"]}
                                errorMessages={["general.required"]}
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