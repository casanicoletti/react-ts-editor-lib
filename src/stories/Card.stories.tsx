import * as React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { PaperList, CrudActions } from '../renderers/CardRenderer';
type ItemType = { id: string, data: string };
const items: ItemType[] = [
    { id: "198765", data: "Thats an awesome way to run" },
    { id: "5000", data: "Thats an awesome way to run" },
]

type Story = StoryObj<typeof PaperList<ItemType>>
const meta: Meta<typeof PaperList<ItemType>> = {
    tags: ["autodocs"],
    component: PaperList<ItemType>,
    title: "My/Card",
    argTypes: {
        onAction: { action: "action" }

    }
}
export default meta;
export const Primary: Story = {
    args: {
        items: items,
        HeaderColumn: e => e.item.id,
        idRender: e => e.id,
        MainText: e => e.item.data,
        variant: "elevation",
        elevation: 3,
        Actions: (props) => (<CrudActions<ItemType> {...props}
            buttonProps={e => ({ edit: { color: "warning", disabled: e.id == "5000" } })} />)

    }
}