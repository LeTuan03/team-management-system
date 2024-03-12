import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function ManageTeamDialog(props) {
    let {
        open, 
        handleClose,
        item
    } = props;
    console.log(item)
    const handleSubmit = async () => {

    }

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
                    Add new/Update football team
                </DialogTitle>
                <DialogContent dividers>
                    <Grid container>
                        <Grid item>
                        <TextValidator
                            label={'sssss'}
                            type="text"
                            name="name"
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