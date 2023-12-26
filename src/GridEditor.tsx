import { ReactNode, useState } from 'react';
import { PaginatedResult } from './PaginatedResult';
import { Button, Container, Slider } from '@mui/material';
import { PagingProps } from './renderers/PagingProps';
import { TableRenderer } from './renderers/TableRenderer';
import { PaperList } from './renderers/CardRenderer';
import { SliderPaging } from "./pagers/SliderPaging";
import { LinearButtonPaging } from './pagers/LinearButtonPaging';
import { ActionProps } from './ActionProps';

export type RendererType<TProps> = (props: TProps) => ReactNode


export type GridProps<T> = {
    pageSize: number,
    items?: PaginatedResult<T>
    ItemsRenderer: RendererType<RendererProps<T>>
    pageChanged: (page: number) => void
    PageRenderer: RendererType<PagingProps>
} & ActionProps<T>;

export type RendererProps<T> = {
    pageChanged: (page: number) => void
    currentPage: number
    items?: PaginatedResult<T>
    pageSize: number,
} & ActionProps<T>

export const Pagers = { SliderPaging, LinearButtonPaging }

export const ItemsRenderer = { Table: TableRenderer, Card: PaperList }

export const GridEditor = <TObject,>({ PageRenderer, ItemsRenderer, items, pageSize, pageChanged, ...props }: GridProps<TObject>) => {
    const [page, setPage] = useState(0);
    const onPageChanged = (p: number) => {
        setPage(p)
        pageChanged(p)
    }
    if (items === undefined) {
        return <></>
    }
    const totalPages = Math.ceil(items.count / pageSize)

    return <>
        <ItemsRenderer currentPage={page} pageChanged={onPageChanged}
            items={items} {...props} pageSize={pageSize}
        />
        {totalPages > 1 &&
            <Container sx={{ p: 10 }} maxWidth="lg">
                <PageRenderer pageCount={totalPages} currentPage={page} onPageChanged={onPageChanged} />
            </Container>
        }
    </>
}