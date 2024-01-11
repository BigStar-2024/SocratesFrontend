import {
    Box, Typography,
} from '@mui/material';
import { FC } from 'react';
import { BasicColor } from 'views/Color';
import { isValidUrl } from 'views/utils';

interface ReviewMCOptionProps {
    value: string
    index?: number
}

export const ReviewMCOption: FC<ReviewMCOptionProps> = ({
    value,
    index
}) => {
    return (
        isValidUrl(value) ?
            <Box display='flex' justifyContent={'center'}>
                <img src={value} style={{ height: 50 }} />
            </Box> :
            <Typography color={BasicColor.darkGreen} >{index && index + '. '}{value}</Typography>
    )
}
