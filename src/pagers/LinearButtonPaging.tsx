import { Button, ButtonOwnProps, ButtonPropsVariantOverrides } from "@mui/material";
import { PagingProps } from "../renderers/PagingProps";
import { useState } from "react";

export const LinearButtonPaging = ({ onPageChanged, currentPage, pageCount, selectedVariant = "contained", ...props }: PagingProps & ButtonOwnProps & {
    selectedVariant: "text" | "contained" | "outlined"
}) => {
    const [state, setState] = useState(currentPage)
    const pageLinks = [...Array(pageCount)].map((_, a) => {
        return (<Button sx={{ p: 1, m: 1 }}
            onClick={() => {
                if (a === state) {
                    return;
                }
                setState(a); onPageChanged(a);
            }} size='small' key={`link${a}`}
            {...props}
            variant={a == state ? selectedVariant : props.variant}
        >{(a + 1).toString()}</Button>);
    });
    return pageLinks;
};
