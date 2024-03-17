import React from 'react'
import { Autocomplete, Card, Grid } from '@mui/material';
import { filterOptions } from 'src/AppFunction';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { POSITION } from 'src/AppConst';

function ManagePlayerSearch(props) {
    let {
        listTeam,
        team,
        dataState,
        handleChangeData
    } = props;
    return (
        <Card sx={{ p: 2 }}>
            <ValidatorForm onSubmit={() => { }}>
                <Grid container spacing={2}>
                    <Grid item md={3} sm={6} xs={12}>
                        <Autocomplete
                            className="mt-3"
                            id="combo-box"
                            fullWidth
                            options={listTeam}
                            onChange={(event, value) => handleChangeData(value, "team")}
                            value={dataState?.team || null}
                            getOptionLabel={(option) => option.teamName || ""}
                            filterOptions={filterOptions}
                            renderInput={(params) => (
                                <TextValidator
                                    {...params}
                                    label="Team"
                                    variant="standard"
                                    value={dataState?.team || ""}
                                />
                            )}
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                        />
                    </Grid>
                    <Grid item md={3} sm={6} xs={12}>
                        <Autocomplete
                            className="mt-3"
                            id="combo-box"
                            fullWidth
                            options={POSITION}
                            onChange={(event, value) => handleChangeData(value, "position")}
                            value={dataState?.position || null}
                            getOptionLabel={(option) => option.name || ""}
                            filterOptions={filterOptions}
                            renderInput={(params) => (
                                <TextValidator
                                    {...params}
                                    label="Position"
                                    variant="standard"
                                    value={dataState?.position || ""}
                                />
                            )}
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                        />
                    </Grid>
                </Grid>
            </ValidatorForm>
        </Card>
    )
}

export default ManagePlayerSearch
