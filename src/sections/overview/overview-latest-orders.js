import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';
import { useEffect, useState } from 'react';
import { getAllTournaments, thongKeByTour } from 'src/view/Tournaments/TournamentsServices';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { filterOptions } from 'src/AppFunction';

const statusMap = {
  pending: 'warning',
  delivered: 'success',
  refunded: 'error'
};

export const OverviewLatestOrders = (props) => {
  const { orders = [], sx } = props;
  const [dataState, setDataState] = useState({});
  const [listItems, setlistItems] = useState([]);
  const [listItemsReport, setlistItemsReport] = useState([]);

  const getAllTournament = async () => {
    try {
      const data = await getAllTournaments();
      setlistItems(data?.data)
    } catch (error) {
      
    }
  }
  const handleChangeData = (value) => {
    setDataState(value)
  }

  const updatePageData = async () => {
    try {
      if(dataState?.IDTournaments) {
        const data = await thongKeByTour(dataState?.IDTournaments);
        setlistItemsReport(data?.data)
      }
    } catch (error) {
      
    }
  }

  useEffect(() => {
    getAllTournament();
  },[])

  useEffect(() => {
    updatePageData();
  },[dataState?.IDTournaments])
  return (
    <Card sx={sx}>
      <Box sx={{display: "flex", justifyContent: "space-between", paddingTop: 3}}>
        <CardHeader title="Match statistics" />
         <ValidatorForm onSubmit={() => { }}>
          <Autocomplete
            className="mt-3"
            style={{
              minWidth: 300,
              // paddingRight: 10
            }}
            id="combo-box"
            fullWidth
            options={listItems}
            onChange={(event, value) => handleChangeData(value)}
            value={dataState || null}
            getOptionLabel={(option) => option.tournamentsName || ""}
            filterOptions={filterOptions}
            renderInput={(params) => (
                <TextValidator
                    {...params}
                    label="Tourments"
                    variant="standard"
                    value={dataState || ""}
                />
            )}
          />
        </ValidatorForm>
      </Box>
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align='center'>
                  Team Name
                </TableCell>
                <TableCell align='center'>
                  Number of matches
                </TableCell>
                <TableCell align='center'>
                  Total wins
                </TableCell>
                <TableCell align='center'>
                  Total losses
                </TableCell>
                <TableCell align='center'>
                  Total number of draws
                </TableCell>
                <TableCell align='center'>
                  Number of goals
                </TableCell>
                <TableCell align='center'>
                  Number of goals lost
                </TableCell>
                <TableCell align='center'>
                  Point
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listItemsReport.length <= 0 ? <div style={{minHeight: 100}}></div> : listItemsReport?.map((order) => {
                return (
                  <TableRow
                    hover
                    key={order.id}
                  >
                    <TableCell align='center'>
                      <SeverityPill color={'success'}>
                        {order.teamName}
                      </SeverityPill>
                    </TableCell>
                    <TableCell align='center'>
                      {order.soTranDaDau}
                    </TableCell>
                    <TableCell align='center'>
                      {order.tongSoTranThang}
                    </TableCell>
                    <TableCell align='center'>
                      {order.tongSoTranThua}
                    </TableCell>
                    <TableCell align='center'>
                      {order.tongSoTranHoa}
                    </TableCell>
                    <TableCell align='center'>
                      {order.soBanThang}
                    </TableCell>
                    <TableCell align='center'>
                      {order.soBanThua}
                    </TableCell>
                    <TableCell align='center'>
                      <SeverityPill color={'error'}>
                        {order.point}
                      </SeverityPill>
                    </TableCell>
                  </TableRow>
                );
              })
            }
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
    </Card>
  );
};

OverviewLatestOrders.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object
};
