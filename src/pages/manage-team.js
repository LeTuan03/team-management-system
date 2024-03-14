import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PencilIcon from '@heroicons/react/24/solid/PencilIcon';
import TrashIcon from '@heroicons/react/24/solid/TrashIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Icon, IconButton, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import { ManagePlayerTable } from 'src/view/ManagePlayer/ManagePlayerTable';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import { deleteTeam, getAllTeam } from 'src/view/ManageTeam/ManageTeamServices';
import { CODE } from 'src/AppConst';
import ManageTeamDialog from 'src/view/ManageTeam/ManageTeamDialog';
import ConfirmDialog from 'src/view/Dialog/ConfirmDialog';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const Page = () => {

  const [listItem, setListItem] = useState([]);
  const [item, setItem] = useState(null);

  const [open, setOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenDeleteDialog(false);
    setItem(null);
  };

  const handleEdit = (data) => {
    setOpen(true);
    setItem(data)
  }

  const handleDelete = (id) => {
    setItem(id);
    setOpenDeleteDialog(true);
  }

  const handleYesDelete = async () => {
    try {
      const data = await deleteTeam(item);
      toast.success("Delete team success");
      updatePageData();
    } catch (error) {
      console.error(error);
    }
  }

  const updatePageData = async () => {
    try {
      const data = await getAllTeam();
      if(data.status === CODE.SUCCESS) {
        setListItem(data?.data);
      }
    } catch (error){
      console.error(error);
    }
  }

  useEffect(() => {
    updatePageData();
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
      title: 'Team name', 
      field: 'teamName',
    },
    { 
      title: 'Country', 
      field: 'country' },
    { 
      title: 'CoachName', 
      field: 'coachName',
    }
  ];

  return (
    <>
      <Head>
        <title>
          Team management | Team management system
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
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
                  List teams
                </Typography>
              </Stack>
              <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  onClick={handleClickOpen}
                  variant="contained"
                >
                  Add
                </Button>
              </div>
            </Stack>
            {/* <CustomersSearch /> */}
            <ManagePlayerTable
              columns={columns}
              listItem={listItem}
            />
          </Stack>
        </Container>
      </Box>
      <div>
        {open && <ManageTeamDialog
          open={open}
          item={item}
          handleClose={handleClose}
          updatePageData={updatePageData}
        />}
        {openDeleteDialog && <ConfirmDialog
          open={openDeleteDialog}
          text={"Confirm delete this team"}
          handleClose={handleClose}
          handleOk={handleYesDelete}
        />}
      </div>
      <ToastContainer autoClose={1000}/>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
