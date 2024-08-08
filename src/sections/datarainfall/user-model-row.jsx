import PropTypes from 'prop-types';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

import Label from 'src/components/label';

// ----------------------------------------------------------------------

export default function ModelTableRow({
  temperature,
  pressure,
  humidity,
  classResult,
  rainfall,
}) {

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toLocaleString();
  };

  const getCurrentDateTimePlus3Hours = () => {
    const now = new Date();
    now.setHours(now.getHours() + 3);
    return now.toLocaleString();
  };

  return (
      <TableRow>

        <TableCell align="center">
          <Typography variant="subtitle2">
            {getCurrentDateTime()}
          </Typography>
        </TableCell>

        <TableCell align="center">
          <Typography variant="subtitle2">
            {getCurrentDateTimePlus3Hours()}
          </Typography>
        </TableCell>

        <TableCell>
            <Typography variant="subtitle2">
              {temperature} °C
            </Typography>
        </TableCell>

        <TableCell>{pressure} hPa</TableCell>

        <TableCell>{humidity} %</TableCell>

        <TableCell>{classResult}</TableCell>

        <TableCell align="center">
          <Label color={rainfall === 1 ? 'success' : 'error' }>{rainfall === 0 ? 'Terjadi Hujan' : 'Tidak Hujan'}</Label>
        </TableCell>
      </TableRow>
  );
}

ModelTableRow.propTypes = {
  pressure: PropTypes.any,
  temperature: PropTypes.any,
  humidity: PropTypes.any,
  classResult: PropTypes.any,
  rainfall: PropTypes.number,
};
