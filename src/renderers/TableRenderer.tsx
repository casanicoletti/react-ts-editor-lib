import React, { ReactNode } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ActionProps } from '../ActionProps';

export type ColumnRenderer<T> = { [k: string]: (item: T) => string | ReactNode | React.JSX.Element }
type TableRendererProps<T> = {
    columns: string[]
    columnRender: ColumnRenderer<T>,
    idRender: (item: T) => string,
    items: T[]
} & ActionProps<T>
export const TableRenderer = <T,>({ items, columns, columnRender, idRender, onAction }: TableRendererProps<T>) => {
    if (items == null) {
        return <></>;
    }
    const headers = columns.map(a => (<TableCell key={`header${a.toString()}`}>{a.toString()}</TableCell>));
    const RenderCols = (r: T) => {
        return columns.map(a => (<TableCell key={`col${a.toString()}`}>{columnRender[a.toString()](r)}</TableCell>));
    };
    const RenderRow = (r: T) => {
        const id = idRender(r);
        return (
            <TableRow onClick={(ev) => { onAction("select", r); }} key={`row${id}`}>
                {RenderCols(r)}
            </TableRow>
        );
    };
    const rows = items.map(RenderRow);

    return <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    {headers}
                </TableRow>
            </TableHead>
            <TableBody>
                {rows}

            </TableBody>
        </Table>
    </TableContainer>;
};
