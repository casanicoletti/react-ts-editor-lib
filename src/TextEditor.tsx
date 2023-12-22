import { TextField, FormControl } from "@mui/material";

type TextEditorProps = {
    multiline?: boolean
    title: string
    value: string
    mode?: "text" | "password"
    changed: (newValue: string) => void
}

export const TextEditor = ({ mode = "text", multiline = false, ...props }: TextEditorProps) => {
    return <TextField type={mode} label={props.title} maxRows={12} multiline={multiline} value={props.value} onChange={e => props.changed(e.target.value)} />
    // return <FormControl>
    // </FormControl>
}