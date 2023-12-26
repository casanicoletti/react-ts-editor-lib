import * as React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { PaperList, CrudActions, PaperListRendererProps } from '../renderers/CardRenderer';
import { WithQueryClient } from './WithQueryClient';
import { useGamesDatasource } from './dataSourceFetcher';
type ItemType = {
    id: string
    name: string

}
const WithComponent = (props: PaperListRendererProps<ItemType>) => {

    return <WithQueryClient>
        <Component {...props} />
    </WithQueryClient>
}
const Component = (props: PaperListRendererProps<ItemType>) => {
    const data = useGamesDatasource<ItemType>();
    if (data.data === undefined) {
        return <></>
    }
    return <PaperList {...props} items={data.data!} />
}

type Story = StoryObj<typeof WithComponent>
const meta: Meta<typeof WithComponent> = {
    tags: ["autodocs"],
    component: WithComponent,
    title: "My/Card",
    argTypes: {
        onAction: { action: "action" }

    }
}
export default meta;
export const Primary: Story = {
    args: {
        HeaderColumn: ({ item }) => item.id,
        idRender: e => e.id,
        MainText: ({ item }) => item.name,
        variant: "elevation",
        elevation: 3,
        Actions: (props) => (<CrudActions<ItemType> {...props}
            buttonProps={e => ({ edit: { color: "warning", disabled: e.id == "5000" } })} />)

    }
}