import { useState, FC } from 'react';
import {
    Box,
    Grid,
    Pagination
} from '@mui/material';
import { ReviewBox } from 'views/molecules/ProgressReview/ReviewBox';

export const ReviewBlocks: FC<{ blocks: any }> = ({ blocks }) => {

    const [page, setPage] = useState(1)
    const _blocks = Array.from(blocks)
    const PER_PAGE = 9
    const [data, setData] = useState(_blocks.slice(0, PER_PAGE))
    const count = Math.ceil(_blocks.length / PER_PAGE)
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        setData(_blocks.slice(value * PER_PAGE - PER_PAGE, PER_PAGE * value))
    };
    return (
        <Box
            display='flex'
            justifyContent='center'
            flexDirection={'column'}
            alignItems='space-between'
        >
            <Grid container spacing={4} justifyContent='center'>
                {data.map((block: any) => (
                    <Grid item key={block.id}>
                        <Box
                            width={320}
                            id='quesion-box'
                        >
                            <ReviewBox block={block} />
                        </Box>
                    </Grid>
                ))}
            </Grid>
            <Box
                display='flex'
                justifyContent={'center'}
                mt={5}
            >

                <Pagination count={count}
                    page={page}
                    variant='outlined' color='primary'
                    onChange={handleChange}
                />
            </Box>
        </Box>
    )
}
