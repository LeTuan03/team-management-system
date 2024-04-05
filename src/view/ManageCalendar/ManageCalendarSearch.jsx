import React from 'react'
import { Autocomplete, Card, Grid } from '@mui/material';
import { filterOptions } from 'src/AppFunction';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { POSITION, STATUS_MATCH } from 'src/AppConst';

function ManageCalendarSearch(props) {
    let {
        dataState,
        handleChangeData
    } = props;
    return (
        <Card sx={{ p: 2, mt: 2 }}>
            <ValidatorForm onSubmit={() => { }}>
                <Grid container spacing={2}>
                    <Grid item md={3} sm={6} xs={12}>
                        <Autocomplete
                            className="mt-3"
                            id="combo-box"
                            fullWidth
                            options={STATUS_MATCH}
                            onChange={(event, value) => handleChangeData(value, "status")}
                            value={dataState?.status || null}
                            getOptionLabel={(option) => option.name || ""}
                            filterOptions={filterOptions}
                            renderInput={(params) => (
                                <TextValidator
                                    {...params}
                                    placeholder='Fillter by status'
                                    variant="standard"
                                    value={dataState?.status || ""}
                                />
                            )}
                        />
                    </Grid>
                </Grid>
            </ValidatorForm>
        </Card>
    )
}

export default ManageCalendarSearch
