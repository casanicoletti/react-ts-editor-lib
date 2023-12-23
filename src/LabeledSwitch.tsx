import { FormControlLabel, Switch } from "@mui/material"

export const LabeledSwitch = ({ label, changed, value }: { value: boolean, label: string, changed: (v: boolean) => void }) => {
    return <FormControlLabel control={
        <Switch checked={value} onChange={e => changed(e.target.checked)} />
    } label={label} />
}
