/* eslint-disable id-length */
/* eslint-disable no-mixed-operators */
/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
/* eslint-disable max-params */
import PropTypes from 'prop-types';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import { AQTABLEHEADER } from '../constants/AirQualityConstant';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        'backgroundColor': theme.palette.primary.main,
        'color': theme.palette.common.white,
        '.Mui-active': {
            'color': theme.palette.common.white
        }
    },
    [`&.${tableCellClasses.body}`]: {
        'fontSize': 14
    }
}));

const AnchorTableCell = styled(TableCell)(({ theme }) => ({
        'fontSize': 14,
        'color': 'blue',
        'textDecoration': 'underline',
        'cursor': 'pointer'
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        'backgroundColor': theme.palette.action.hover
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        'border': 0
    }
}));

const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

const getComparator = (order, orderBy) => {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// support for IE 11 instead of Array.prototype.sort()
const stableSort = (array, comparator) => {
    if (array.length === 0) {
        return array;
    }
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

const EnhancedTableHead = param => {
    const { order, orderBy, onRequestSort } = param;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };
    return (
        <TableHead>
            <TableRow>
                {AQTABLEHEADER.map(headCell => <StyledTableCell key={headCell.id}
                    align={headCell.header ? 'left' : 'right'}
                    padding={headCell.disablePadding ? 'none' : 'normal'}
                    sortDirection={orderBy === headCell.id ? order : false}
                >
                    <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        onClick={createSortHandler(headCell.id)}
                    >
                        {headCell.label}
                        {orderBy === headCell.id
                            ? <Box component="span" sx={visuallyHidden}>
                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </Box>
                            : null}
                    </TableSortLabel>
                </StyledTableCell>)}
            </TableRow>
        </TableHead>
    );
};

EnhancedTableHead.propTypes = {
    'onRequestSort': PropTypes.func.isRequired,
    'order': PropTypes.oneOf(['asc', 'desc']).isRequired,
    'orderBy': PropTypes.string.isRequired
};

export const AQTable = ({ latestAirQualityData, onSelectCity }) => {
    const [order, setOrder] = React.useState('desc');
    const [orderBy, setOrderBy] = React.useState('aqi');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const rows = latestAirQualityData;

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;


    return <Box sx={{ 'width': '100%' }}>
        <Paper sx={{
            'width': '100%',
            'mb': 2
        }}>
            <TableContainer component={Paper}>
                <Table sx={{ 'minWidth': 750 }} aria-label="Air Quality Index table" size="medium">
                    <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                        {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                        rows.slice().sort(getComparator(order, orderBy)) */}
                        {stableSort(rows, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                const labelId = `enhanced-table-${index}`;
                                return <StyledTableRow
                                    hover
                                    key={row.key}
                                    tabIndex={-1}
                                    sx={{ '&:last-child td, &:last-child th': { 'border': 0 } }}
                                >
                                    <StyledTableCell component="th" scope="row" padding="none" id={labelId}>
                                        <AnchorTableCell onClick={() => onSelectCity(row)} component="a" scope="row" padding="none" id={labelId}>
                                            {row.key}
                                        </AnchorTableCell>
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.aqi}</StyledTableCell>
                                    <StyledTableCell align="right">{row.updatedAt}</StyledTableCell>
                                </StyledTableRow>
                            })}
                        {emptyRows > 0 &&
                            <TableRow
                                style={{
                                    'height': 53 * emptyRows
                                }}
                            >
                                <TableCell colSpan={6} />
                            </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    </Box>
}
AQTable.propTypes = {
    'latestAirQualityData': PropTypes.array.isRequired,
    'onSelectCity': PropTypes.func.isRequired
}
