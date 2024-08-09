import axios from 'axios';
import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Skeleton from '@mui/material/Skeleton';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { users } from 'src/_mock/user';

import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserModelRow from '../user-model-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import { BaseURL, BaseURLws } from '../../../config/configVars';
import { emptyRows, applyFilter, getComparator } from '../utils';



// ----------------------------------------------------------------------

export default function UserPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [rainfallData, setRainfallData] = useState([]);

  const [loading, setLoading] = useState(true);

  const [modelData, setModelData] = useState([
    {
      temperature: 0,
      pressure: 0,
      humidity: 0,
      class_result: 0,
      rainfall: 0,
    }
  ]);

  useEffect(() => {
    handleFetchDataRainfall();
    const websocket = new WebSocket(`${BaseURLws}/ws/sensor`);
    websocket.onopen = () => {
      console.log('Websocket is open');
    };
    websocket.onmessage = (event) => {
      console.log('Websocket : ', JSON.parse(event.data));
      const response = JSON.parse(event.data);
      if (
        Object.prototype.hasOwnProperty.call(response, 'temperature') &&
        Object.prototype.hasOwnProperty.call(response, 'pressure') &&
        Object.prototype.hasOwnProperty.call(response, 'humidity') &&
        Object.prototype.hasOwnProperty.call(response, 'rainfall') &&
        Object.prototype.hasOwnProperty.call(response, 'class_result')
      ) {
        console.log('Response : masuk ke if');
          setModelData([
              {
                  temperature: response.temperature,
                  pressure: response.pressure,
                  humidity: response.humidity,
                  class_result: response.class_result,
                  rainfall: response.rainfall,
              }
          ]);
      }
      handleFetchDataRainfall();
    };
    websocket.onclose = () => {
      console.log('Websocket is closed');
    };
    return () => {
      websocket.close();
    };
  }, []);

  const handleFetchDataRainfall = async () => {
    try {
      const response = await axios.get(`${BaseURL}/data`);

      setRainfallData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };
  
  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const dataFiltered = applyFilter({
    inputData: rainfallData,
    comparator: getComparator(order, orderBy),
  });

  const notFound = !rainfallData.length && !!rainfallData.length;

  return (
    loading ? (
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">Data Table of Rainfall</Typography>
        </Stack>
        <Card>
          <Scrollbar>
            <TableContainer sx={{ overflow: 'unset' }}>
              <Skeleton variant="rectangular" width={1800} height={60} />
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    ) : (
      <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">Data Table of Rainfall</Typography>
        </Stack>
        <Card>
          <Scrollbar>
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 800 }}>
                <UserTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={users.length}
                  numSelected={selected.length}
                  onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: 'time', label: 'DateTime', align: 'center' },
                    { id: 'temperature', label: 'Temperature' },
                    { id: 'pressure', label: 'Air Pressure' },
                    { id: 'humidity', label: 'Air Humidity' },
                    { id: 'rain_was_fall', label: 'Rainfall', align: 'center' },
                  ]}
                />
                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <UserTableRow
                        key={row.formattedTime}
                        temperature={row.temperature}
                        pressure={row.pressure}
                        rainfall={row.rain_was_fall}
                        humidity={row.humidity}
                        dateTime={row.formattedTime}
                      />
                    ))}

                  <TableEmptyRows
                    height={77}
                    emptyRows={emptyRows(page, rowsPerPage, rainfallData.length)}
                  />

                  {notFound && <TableNoData />}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            page={page}
            component="div"
            count={rainfallData.length}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} mt={10}>
          <Typography variant="h4">Result Model Machine Learning</Typography>
        </Stack>
        <Card>
          <Scrollbar>
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 800 }}>
                <UserTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={users.length}
                  numSelected={selected.length}
                  onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: 'current_time', label: 'Current Time', align: 'center' },
                    { id: 'prediction_time', label: 'Prediction Time', align: 'center' },
                    { id: 'temperature', label: 'Current Temperature' },
                    { id: 'pressure', label: 'Current Air Pressure' },
                    { id: 'humidity', label: 'Current Air Humidity' },
                    { id: 'class_result', label: 'Classification Result', align: 'center' },
                    { id: 'rain_was_fall', label: 'Prediction Rainfall', align: 'center' },
                  ]}
                />
                <TableBody>
                    {modelData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <UserModelRow
                        key={row.formattedTime}
                        temperature={row.temperature}
                        pressure={row.pressure}
                        humidity={row.humidity}
                        classResult={row.class_result}
                        rainfall={row.rainfall}
                      />
                    ))}

                  <TableEmptyRows
                    height={77}
                    emptyRows={emptyRows(page, rowsPerPage, rainfallData.length)}
                  />

                  {notFound && <TableNoData />}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            page={page}
            component="div"
            count={rainfallData.length}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      </>
    )
  );
}
