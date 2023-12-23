import { useEffect, useState } from "react"
import { GridEditor, RendererProps, ItemsRenderer } from "../GridEditor"
import { PaginatedResult } from "../PaginatedResult"

import { ColumnRenderer } from "../renderers/TableRenderer"
import { ActionType } from "../ActionProps"
const MachineColumnRenderer: ColumnRenderer<CodeAndName> = {
    codigo: e => e.codigo.toString(),
    nome: e => e.nome
}
const Table = (props: RendererProps<CodeAndName>) => {
    return <ItemsRenderer.Table
        columns={["codigo", "nome"]}
        idRender={a => a.codigo.toString()}
        onAction={props.onAction}
        items={props.items!.result}
        columnRender={MachineColumnRenderer}
    />
}

const Paper = (props: RendererProps<CodeAndName>) => {
    return <ItemsRenderer.Card<CodeAndName> onAction={props.onAction}
        HeaderColumn={e => e.item.codigo}
        MainText={e => e.item.nome}
        idRender={e => e.codigo.toString()}
        items={props.items!.result}
    />
}

type CodeAndName = { codigo: number, nome: string }
export const GridTable = ({ tableMode, pageSize, onAction, ...props }: { tableMode: boolean, pageSize: number, onAction: (action: ActionType, item: CodeAndName) => boolean }) => {
    const [items, setItems] = useState<{ total: CodeAndName[], selection: PaginatedResult<CodeAndName> }>(
        { total: [], selection: { count: 0, result: [] } }
    )

    useEffect(() => {
        fetch("https://parallelum.com.br/fipe/api/v1/carros/marcas/59/modelos")
            .then(async r => {
                const a = await r.json()
                const items = (a["modelos"] as CodeAndName[]).slice(0, 150)
                setItems({ total: items, selection: { count: items.length, result: items.slice(0, pageSize) } })

            })
        // .then(() => setActual({ count: items.length, result: items.slice(0, pageSize) }))
    }, [])
    useEffect(() => {
        setItems({ ...items, selection: { count: items.total.length, result: items.total.slice(0, pageSize) } })

    }, [pageSize])
    return <>
        <GridEditor
            ItemsRenderer={tableMode ? Table : Paper}
            items={items.selection}
            pageSize={pageSize}
            onAction={onAction}
            pageChanged={p => setItems(o => ({ ...o, selection: { count: o.total.length, result: o.total.slice(p * pageSize, (p * pageSize) + pageSize) } }))}
        />
    </>
}