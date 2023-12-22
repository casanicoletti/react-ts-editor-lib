import { useEffect, useState } from "react"
import { PaginatedResult } from "./PaginatedResult"
import { GridEditor, ColumnRenderer } from "./GridEditor"
import React from "react"
import { Dialog } from "./Dialog"
export type AbstractGridEditorProps<T> = {
    load: (skip: number, size: number) => Promise<PaginatedResult<T>>
    columnRenderer: ColumnRenderer<T>
    children: React.FC<AbstractEditorProps<T>>
    idRender: (item: T) => string
    onSave: (entity: T) => Promise<any>
}
export type AbstractEditorProps<T> = {
    entity: T
    onCancel: () => void
    changed: (item: T) => void
}

export const AbstractGridEditor = <T,>({ load, children, idRender, columnRenderer, onSave }: AbstractGridEditorProps<T>) => {

    const _onSave = async (entity: T) => {
        await onSave(entity)
        setSelected(null)
    }
    const [selected, setSelected] = useState<T | null>(null)
    const [items, setItems] = useState<PaginatedResult<T> | undefined>(undefined)
    const [page, setPage] = useState(0);
    useEffect(() => {
        load(page * 10, 10).then(s => setItems(s))
    }
        , [page, selected]);
    if (items === undefined) {
        return <></>
    }

    return (
        <>
            <GridEditor
                pageSize={10}
                items={items}

                onSelect={setSelected}
                columnItems={Object.keys(columnRenderer)}
                columnRender={columnRenderer}
                idRender={idRender}
                pageChanged={e => setPage(e)}
            />
            <Dialog open={selected !== null} title={selected ? idRender(selected) : ""} onClose={() => { }}>
                {selected && children({ entity: selected!, changed: _onSave, onCancel: () => setSelected(null) })}
            </Dialog>
        </>

    )
}
