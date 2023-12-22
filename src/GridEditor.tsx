import React, { ReactNode, useState } from 'react';
import { PaginatedResult } from './PaginatedResult';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, TableFooter } from '@mui/material';

export type GridProps<T> = {
    pageSize: number,

    onSelect: (item: T) => void

    columnItems: string[]
    columnRender: ColumnRenderer<T>,
    idRender: (item: T) => string,
    pageChanged: (page: number) => void
    items?: PaginatedResult<T>
};
export type ColumnRenderer<T> = { [k: string]: (item: T) => string | ReactNode | React.JSX.Element }

export const GridEditor = <TObject,>({ items, pageSize, onSelect, columnItems, idRender, columnRender, ...props }: GridProps<TObject>) => {
    if (items === undefined) {
        return <></>
    }
    const [page, selectPage] = useState(0)
    const headers = columnItems.map(a => (<TableCell key={`header${a}`}>{a}</TableCell>));
    const RenderCols = (r: TObject) => {
        return columnItems.map(a => (<TableCell key={`col${a}`}>{columnRender[a](r)}</TableCell>))
    }
    const RenderRow = (r: TObject) => {
        const id = idRender(r);
        return (
            <TableRow onClick={(ev) => { onSelect(r) }} key={`row${id}`}>
                {RenderCols(r)}
            </TableRow>
        )
    }
    if (items == null) {
        return <></>
    }
    const totalPages = Math.ceil(items.count / pageSize)
    const rows = items.result.map(RenderRow);
    const pageLinks = [...Array(totalPages)].map((_, a) => {
        return (<Button
            variant={a == page ? "contained" : "text"}
            onClick={() => { selectPage(a); props.pageChanged(a); }} size='small' key={`link${a}`}>{(a + 1).toString()}</Button>)
    });

    return <>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {headers}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows}

                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={columnItems.length}>
                            {pageLinks}
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>

    </>

}

