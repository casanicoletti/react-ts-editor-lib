import * as React from 'react'
import { Meta, StoryObj } from '@storybook/react'

import { GridTable } from './GridTable'
type Story = StoryObj<typeof GridTable>
const meta: Meta<typeof GridTable> = {
    tags: ["autodocs"],
    component: GridTable,
    title: "My/GridTable",
    argTypes: {
        onAction: { action: "action" }

    }
}
export default meta;
export const Primary: Story = {
    args: {
        pageSize: 50,
        tableMode: true,
    }
}