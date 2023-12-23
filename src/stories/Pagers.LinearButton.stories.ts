import * as React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { SliderPaging } from '../pagers/SliderPaging';
import { LinearButtonPaging } from '../pagers/LinearButtonPaging';

type Story = StoryObj<typeof LinearButtonPaging>
const meta: Meta<typeof LinearButtonPaging> = {
    tags: ["autodocs"],
    component: LinearButtonPaging,
    title: "My/Pager/LinearButton",
    argTypes: {
        disabled: {
            type: "boolean"
        },
        color: {
            options: ["primary", "secondary", "warning", "success"],
            control: { "type": "select" }
        },
        variant: {
            options: ["outlined", "text"],
            control: { type: 'select' }
        },
        currentPage: { type: "number" },
        size: {
            control: { type: "select" },
            options: ["small", "medium", "large"]
        }

    }
}
export default meta;
export const Primary: Story = {
    args: {
        currentPage: 0,
        pageCount: 10

    }
}