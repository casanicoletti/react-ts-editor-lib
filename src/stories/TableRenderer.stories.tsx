import * as React from 'react'
import { QueryClient, useQuery } from 'react-query'
import { Meta, StoryObj } from '@storybook/react'
import { ColumnRenderer, TableRenderer, TableRendererProps } from '../renderers/TableRenderer';
import { useEffect, useState } from 'react';
import { Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { WithQueryClient } from './WithQueryClient';
import { useGamesDatasource } from './dataSourceFetcher';

const CustomType = (props: TableRendererProps<ItemType>) => {

    const { data } = useGamesDatasource<ItemType>()

    return <TableRenderer {...props} items={data!.items} />
}
const MyComponent = (props: TableRendererProps<ItemType>) => {
    return <WithQueryClient>
        <CustomType {...props}></CustomType>
    </WithQueryClient>
}
type ItemType = { id: string, data: string, name: string, rating: number };

const renderer: ColumnRenderer<ItemType> = {
    id: e => {
        return <a href={"#" + e.id}> {e.id}</a>;
    },
    name: e => e.name,
    rating: e => <Rating size="small" emptyIcon={<StarIcon style={{ opacity: 0 }} />} name="half-rating" defaultValue={e.rating} readOnly precision={0.5} aria-label={e.rating.toString()} />
}
type Story = StoryObj<typeof MyComponent>
const meta: Meta<typeof MyComponent> = {
    tags: ["autodocs"],
    component: MyComponent,
    title: "My/Rendererers/Table",
    argTypes: {
        onAction: { action: "action" }
    }
}
export default meta;
export const Primary: Story = {
    args: {
        columns: ["id", "name", "rating"],
        idRender: e => e.id,
        columnRender: renderer,
        renderSelectionClick: false
    }
}

