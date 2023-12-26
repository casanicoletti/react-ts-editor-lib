import { useEffect, useState } from "react"
import { GridEditor, RendererProps, ItemsRenderer } from "../GridEditor"
import { PaginatedResult } from "../PaginatedResult"

import { ColumnRenderer } from "../renderers/TableRenderer"
import { ActionType } from "../ActionProps"
import { useGamesDatasource } from "./dataSourceFetcher"
import { WithQueryClient } from "./WithQueryClient"
import { SliderPaging } from "../pagers/SliderPaging"
import { PreviousNextPageRenderer } from "../pagers/LinearButtonPaging"
import { Rating } from "@mui/material"
import StarIcon from '@mui/icons-material/Star'
const MachineColumnRenderer: ColumnRenderer<ItemType> = {
    codigo: e => e.id.toString(),
    nome: e => e.name,
    rating: e => <Rating size="small" emptyIcon={<StarIcon style={{ opacity: 0 }} />} name="half-rating" defaultValue={e.rating} readOnly precision={0.5} aria-label={e.rating.toString()} />

}
const Table = (props: RendererProps<ItemType>) => {
    return <ItemsRenderer.Table
        columns={["codigo", "nome", "rating"]}
        idRender={a => a.id.toString()}
        onAction={props.onAction}
        items={props.items!.result}
        columnRender={MachineColumnRenderer}
    />
}

const Paper = (props: RendererProps<ItemType>) => {
    return <ItemsRenderer.Card<ItemType> onAction={props.onAction}
        HeaderColumn={e => e.item.id}
        MainText={e => e.item.name}
        idRender={e => e.id.toString()}
        items={props.items!.result}
    />
}
type ItemType = {
    id: string,
    name: string,
    rating: number
}
const Component = ({ tableMode, pageSize, onAction, ...props }: { tableMode: boolean, pageSize: number, onAction: (action: ActionType, item: ItemType) => boolean }) => {
    const [state, setState] = useState<{ pageSize: number, pageNumber: number, items: PaginatedResult<ItemType> }>({
        pageSize,
        pageNumber: 0, items: { count: 0, result: [] }
    })
    useGamesDatasource<ItemType>(state.pageNumber + 1, state.pageSize, e => setState(o => ({
        ...o, items: {
            count: e.total,
            result: e.items
        }
    })))

    return <>
        <GridEditor
            ItemsRenderer={tableMode ? Table : Paper}
            items={state.items}
            pageSize={pageSize}
            PageRenderer={PreviousNextPageRenderer}
            onAction={onAction}
            pageChanged={p => setState(o => ({ ...o, ...{ pageNumber: p + 1, pageSize } }))}
        />
    </>
}
export const GridTable = (props: { tableMode: boolean, pageSize: number, onAction: (action: ActionType, item: ItemType) => boolean }) => {
    return <WithQueryClient>
        <Component {...props} />
    </WithQueryClient>
}