import { styled, Paper, Typography, Fab, Box, Grid, Container, PaperOwnProps, colors, FabOwnProps } from "@mui/material";
import { ReactNode } from "react";
import { ActionProps } from "../ActionProps";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteForever';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    // textAlign: 'center',

    color: theme.palette.text.secondary,

}));
export type CrudActionsProps<T> = {
    buttonProps?: (e: T) => {
        add?: FabOwnProps
        edit?: FabOwnProps
        del?: FabOwnProps
    }
}
export const CrudActions = <T,>({ item, onAction, buttonProps }: { item: T } & ActionProps<T> & CrudActionsProps<T>) => {
    const { add, del, edit } = (buttonProps && buttonProps(item)) || {}
    return <Box sx={{
        '& > :not(style)': { p: 0, m: 0.5 },
        // backgroundColor: colors.yellow[100],
        width: "100%", height: "100%",
        alignItems: "flex-end",
        transition: "opacity .2s ease-in-out",
        opacity: 0.2,
        ':hover': {
            transition: "opacity .2s ease-in-out",
            opacity: 1,
        }
    }} display={"flex"}>
        <Fab color="primary" aria-label="add" size="small" onClick={() => onAction("select", item)} {...add || {}}>
            <AddIcon />
        </Fab>
        <Fab color="secondary" aria-label="add" size="small" onClick={() => onAction("edit", item)} {...edit || {}}>
            <EditIcon />
        </Fab>
        <Fab color="warning" aria-label="add" size="small" onClick={() => onAction("delete", item)} {...del || {}}>
            <DeleteIcon />
        </Fab>

    </Box>
}
const Card = <T,>({ elevation = 3, HeaderColumn, MainText, Actions = CrudActions, onAction, item, ...props }: CardRenderProps<T> & { item: T } & PaperOwnProps) => {
    return <Item {...props} elevation={elevation} sx={{ minWidth: 250, maxWidth: 250, minHeight: 250, maxHeight: 250 }}>
        <Grid container maxWidth="xl" xl={12} sx={{ height: 250, display: "flex", flexDirection: "row" }}>

            <Grid item container xs={12}>

                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    <HeaderColumn item={item} />
                </Typography>

            </Grid>
            <Grid item container xs={12}>
                <Typography variant="h6" component="div">
                    <MainText item={item} />
                </Typography>
            </Grid>
            <Grid item container lg={12} md={12} xs={12} sx={{ verticalAlign: "bottom" }} >
                <Actions item={item} onAction={onAction} />
            </Grid>
        </Grid>
    </Item >
}
export type PaperListRendererProps<T> = {
    items: T[]
} & CardRenderProps<T>
type CardRenderProps<T> = {
    idRender: (item: T) => string
    HeaderColumn: (props: { item: T }) => ReactNode
    MainText: (props: { item: T }) => ReactNode,
    Actions?: (props: { item: T } & ActionProps<T>) => ReactNode

} & ActionProps<T> & PaperOwnProps

export const PaperList = <T,>({ items, ...props }: PaperListRendererProps<T>) => {
    const output = items.map(a => {
        return <Card {...props} key={props.idRender(a)} item={a} />
    });
    return <>
        <Grid container maxWidth="xl" sx={{ display: "flex", flexWrap: "wrap", flexDirection: "row" }} justifyContent={"space-evenly"}>
            {output}
        </Grid>
    </>
}
