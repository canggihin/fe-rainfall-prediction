import PropTypes from 'prop-types';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

import Label from 'src/components/label';

// ----------------------------------------------------------------------

export default function UserTableRow({
  temperature,
  pressure,
  humidity,
  rainfall,
  dateTime,
}) {

  return (
      <TableRow>

        <TableCell align="center">
          <Typography variant="subtitle2">
            {dateTime}
          </Typography>
        </TableCell>

        <TableCell>
            <Typography variant="subtitle2">
              {temperature} °C
            </Typography>
        </TableCell>

        <TableCell>{pressure} hPa</TableCell>

        <TableCell>{humidity} %</TableCell>

        <TableCell align="center">
          <Label color={rainfall === 1 ? 'success' : 'error' }>{rainfall === 0 ? 'Terjadi Hujan' : 'Tidak Hujan'}</Label>
        </TableCell>
      </TableRow>
  );
}

UserTableRow.propTypes = {
  pressure: PropTypes.any,
  temperature: PropTypes.any,
  humidity: PropTypes.any,
  rainfall: PropTypes.number,
  dateTime: PropTypes.any,
};
