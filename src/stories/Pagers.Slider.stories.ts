import * as React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { SliderPaging } from '../pagers/SliderPaging';

type Story = StoryObj<typeof SliderPaging>
const meta: Meta<typeof SliderPaging> = {
    tags: ["autodocs"],
    component: SliderPaging,
    title: "My/Pager/Slider",
    argTypes: {
        disabled: {
            type: "boolean"
        },
        color: {
            options: ["primary", "secondary"],
            control: { "type": "radio" }
        }

    }
}
export default meta;
export const Primary: Story = {
    args: {
        currentPage: 0,
        pageCount: 10,
        color: "primary"

    }
}