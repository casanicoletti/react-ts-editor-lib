
import { Button, FormControl } from "@mui/material"
type Props = {
    text: string
    clicked: () => void
}
const MyButton = ({ clicked, text }: Props) => {
    return <Button onClick={() => clicked()}>{text}</Button>
    // return <FormControl>
    // </FormControl>
}
export { MyButton as Button };