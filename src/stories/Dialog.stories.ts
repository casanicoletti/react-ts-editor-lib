import * as React from 'react'
import { Meta, StoryObj } from '@storybook/react'

import { DialogSample } from './DialogSample'

type Story = StoryObj<typeof DialogSample>
const meta: Meta<typeof DialogSample> = {
    tags: ["autodocs"],
    component: DialogSample,
    title: "My/Dialog",
    argTypes: {
        title: {
            type: "string",
            description: "Sets the text button"
        }
    }
}
export default meta;
export const Primary: Story = {

    args: {
        title: "Hello",
        open: true,

    }
}