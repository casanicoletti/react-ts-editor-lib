import * as React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Button } from '../Button'
type Story = StoryObj<typeof Button>
const meta: Meta<typeof Button> = {
    tags: ["autodocs"],
    component: Button,
    title: "My/Button",
    argTypes: {
        text: {
            type: "string",
            description: "Sets the text button"

        },
        onClick: { action: 'clicked' },


    }
}
export default meta;
export const Primary: Story = {

    args: {
        text: "Hello",

    }
}
export const Secondary_Outlined: Story = {
    args: {
        text: "Secondary",
        color: "secondary",
        variant: "outlined"
    }
}

export const Warning_Outlined: Story = {
    args: {
        text: "Warning",
        color: "warning",
        variant: "outlined"
    }
}


export const Warning_Contained: Story = {
    args: {
        text: "Warning",
        color: "warning",
        variant: "contained"
    }
}
