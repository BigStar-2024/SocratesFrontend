import { FC, useState } from 'react';
import { Paper, Typography } from '@mui/material';
import { dictionary } from './dictionary'
import { useSelector } from 'react-redux';
import { LSDialog } from '../Setting/LSDialog';
import { ImgUploadDgContent } from './ImgUploadDgContent';

export const ImageUploader: FC = () => {

    const [open, setOpen] = useState(false)

    let language: string = useSelector((state: any) => state.user.language);
    language = language ? language : 'en-us'

    const close = () => {
        setOpen(false)
    }

    // const handleResetFile = (e: any, fileRef: any) => {
    //     e.stopPropagation()
    //     setFileDataUrl(null)
    //     fileRef.current.value = null
    // }

    return (
        <>
            <Paper
                onClick={() => { setOpen(true) }}
                sx={{
                    // maxHeight: ,
                    width: 383,
                    height: 275,
                    background: '#C4C4C4',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    '&:hover': {
                        filter: 'drop-shadow(0 0 0.75rem gold)'
                    },
                    position: 'relative'
                }}>
                {
                    <Typography variant='h3'>
                        {dictionary[language]?.uploadImage}
                    </Typography>
                }
            </Paper>
            <LSDialog
                isOpen={open}
                open={close}
                title='Upload image'
                fullWidth='true'
                dialogContent={
                    <ImgUploadDgContent />
                }
            />
        </ >
    )

}
