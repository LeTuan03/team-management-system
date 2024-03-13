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
import { updateTeam } from './ManageTeamServices';
import { CODE } from 'src/AppConst';
import { toast } from 'react-toastify';

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
        item,
        updatePageData
    } = props;

    const [dataState, setDataState] = React.useState({});
    const validateSubmit = () => {
        return true;
    }
    
    const handleSubmit = async () => {
        try {
            if(!validateSubmit()) return;
            const data = await updateTeam({ ...dataState });
            if(data?.status === CODE.SUCCESS) {
                toast.success("Update team success");
                handleClose();
                updatePageData();
            }
        } catch (error){
            console.error(error);
        }
    }

    const handleSetData = (value, name) => {
        setDataState((pre) => ({...pre, [name]: value}));
    }

    React.useEffect(() => {
        setDataState({
            ...item
        });
    }, []);

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
                    <Grid container spacing={2}>
                        <Grid item md={4} sm={6} xs={12}>
                            <TextValidator
                                label={'Team name'}
                                className='w-100'
                                type="text"
                                name="teamName"
                                value={dataState?.teamName}
                                onChange={(event) => handleSetData( event.target.value, "teamName")}
                                validators={['required']}
                                errorMessages={['general.required']}
                            />
                        </Grid>
                        <Grid item md={4} sm={6} xs={12}>
                            <TextValidator
                                label={'Coach name'}
                                className='w-100'
                                type="text"
                                name="coachName"
                                value={dataState?.coachName}
                                onChange={(event) => handleSetData( event.target.value, "coachName")}
                                validators={['required']}
                                errorMessages={['general.required']}
                            />
                        </Grid>
                        <Grid item md={4} sm={6} xs={12}>
                            <TextValidator
                                label={'Country'}
                                className='w-100'
                                type="text"
                                name="country"
                                value={dataState?.country}
                                onChange={(event) => handleSetData( event.target.value, "country")}
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