import { useEffect, useState } from 'react';
import Head from 'next/head';
import PencilIcon from '@heroicons/react/24/solid/PencilIcon';
import TrashIcon from '@heroicons/react/24/solid/TrashIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Icon, IconButton, Stack, SvgIcon, Tab, Tabs, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import { ManageCalendarTable } from 'src/view/ManageCalendar/ManageCalendarTable';
import ManageCalendarDialog from 'src/view/ManageCalendar/ManageCalendarDialog';
import { StatisticsAnalysisTable } from 'src/view/StatisticsAnalysis/StatisticsAnalysisTable';
import { TabPanel } from '@mui/lab';
import PropTypes from 'prop-types';

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
    marginLeft: '-1.0em',
    }  
}))(Tooltip);

function MaterialButton(props) {
  const item = props.item;
  return <div className="none_wrap">
    <LightTooltip title={"Chỉnh sửa"} placement= "right-end" enterDelay={300} leaveDelay={200}
      PopperProps={{
        popperOptions: {modifiers: {offset: {enabled: true,offset: '10px, 0px',},},},
      }} >
      <IconButton size="small" onClick={() => props.onSelect(item, 0)}>
        <Icon fontSize="small" color="primary"><PencilIcon /></Icon>
      </IconButton>
    </LightTooltip>
    <LightTooltip title={"Xóa"} placement= "right-end" enterDelay={300} leaveDelay={200}
      PopperProps={{
        popperOptions: {modifiers: {offset: {enabled: true,offset: '10px, 0px',},},},
      }} >
      <IconButton size="small" onClick={() => props.onSelect(item, 1)}>
        <Icon fontSize="small" color="error"><TrashIcon /></Icon>
      </IconButton>
    </LightTooltip>
  </div>;
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const Page = () => {

  const [listItem, setListItem] = useState([]);
  const [item, setItem] = useState(null);

  const [open, setOpen] = useState(false);

  const [tabValue, setTabValue] = useState(0);

  const handleChangeTabValue = (event, newTabValue) => {
    setTabValue(newTabValue);
  };
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (data) => {
    setOpen(true);
    setItem(data)
  }
  const handleDelete = (id) => {

  }

  useEffect(() => {
    //fake data
    setListItem([
      { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
      { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
    ])
  }, []);


  const columns=[
    {
      title: 'Action', 
      field: '',
      maxWidth: 100,
      minWidth: 100,
      align: 'center',
      render: rowData => (
        <MaterialButton
          item={rowData}
          onSelect={(rowData, method) => {
            if (method === 0) {
              handleEdit(rowData)
            } else if (method === 1) {
              handleDelete(rowData.id);
            } else {
              alert('Call Selected Here:' + rowData.id);
            }
          }}
        />
      )
    },
    { 
      title: 'Name', 
      field: 'name',
    },
    { 
      title: 'Surname', 
      field: 'surname' },
    { 
      title: 'Birth Year', 
      field: 'birthYear',
    }, 
    {
      title: 'Birth Place',
      field: 'birthCity',
    },
  ];

  return (
    <>
      <Head>
        <title>
          Statistics and analysis | Team management system
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Statistics and analysis
                </Typography>
              </Stack>
            </Stack>
            <Tabs
              value={tabValue}
              onChange={handleChangeTabValue}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              <Tab sx={{ minWidth: 200 }} label="Performance statistics" {...a11yProps(0)} />
              <Tab sx={{ minWidth: 200 }} label="Statistics of match results" {...a11yProps(1)}/>
              <Tab sx={{ minWidth: 200 }} label="Charts rank" {...a11yProps(2)}/>
            </Tabs>
            <Box sx={{ mt: 4 }}>
              {
                tabValue === 0 && (
                  <StatisticsAnalysisTable 
                    columns={columns}
                    listItem={listItem}
                  />
                )
              }
              {
                tabValue === 1 && (
                  <StatisticsAnalysisTable 
                    columns={columns}
                    listItem={listItem}
                  />
                )
              }
              {
                tabValue === 2 && (
                  <StatisticsAnalysisTable  
                    columns={columns}
                    listItem={listItem}
                    />
                )
              }
            </Box>
          </Stack>
        </Container>
      </Box>
      <div>
        {/* <ManageCalendarDialog
          open={open}
          handleClose={handleClose}
          item={item}
        /> */}
      </div>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
