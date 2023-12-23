
import { Button as Btn, ButtonProps, FormControl } from "@mui/material"
type Props = {
    text: string
} & ButtonProps
export const Button = ({ text, ...props }: Props) => {
    return <FormControl>
        <Btn {...props}>{text}</Btn>
    </FormControl>
}