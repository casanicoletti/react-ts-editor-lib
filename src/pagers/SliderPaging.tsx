import { Slider, SliderOwnProps } from "@mui/material";
import { PagingProps } from "../renderers/PagingProps";
import { useState } from "react";


export const SliderPaging = ({ onPageChanged, currentPage, pageCount, ...props }: PagingProps & SliderOwnProps) => {
    const marks = [...Array(pageCount)].map((_, a) => { return { label: `${a + 1}`, value: a }; });
    const [page, setPage] = useState(currentPage)
    return <Slider
        disableSwap step={null} min={0} max={pageCount - 1}
        marks={marks}
        valueLabelDisplay="auto"
        defaultValue={page}
        onChange={(_, v) => { setPage(v as number); onPageChanged(v as number); }} {...props} />;
};
