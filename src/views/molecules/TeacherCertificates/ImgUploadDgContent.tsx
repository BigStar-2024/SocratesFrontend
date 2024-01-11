import LoadingButton from '@mui/lab/LoadingButton';
import { Container, TextField, Box, Button, Typography } from '@mui/material';
import { FC, useState, useRef } from 'react';
import { uploadTeacherCertificateFileOnFirebase } from 'app/firebase';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import * as TYPES from 'app/types'


export const ImgUploadDgContent: FC = () => {

    const fileRef = useRef<HTMLInputElement>(null)
    const [filename, setFilename] = useState<any>('')
    const [fileDataUrl, setFileDataUrl] = useState<any>(null)
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();

    const handleFileSelect = (e: any) => {
        const pickedFile = e.target.files[0]

        const reader = new FileReader()
        if (pickedFile) {
            setFile(pickedFile)
            setFilename(pickedFile.name)

            // This is used as src of image
            reader.readAsDataURL(pickedFile)
            reader.onloadend = function (e) {
                setFileDataUrl(reader.result)
            }
        }
    }


    const handleUploadBtnClick = async () => {
        setLoading(true)
        const res: any = await uploadTeacherCertificateFileOnFirebase(file, filename)
        if (res.success) {
            enqueueSnackbar('Upload File Successfully', { variant: 'success' })
            dispatch({ type: TYPES.TEACHER_RELOAD_IMAGES });
        }
        else
            enqueueSnackbar(res.error, { variant: 'error' })
        setLoading(false)
    }

    const handleFilenameChange = (e: any) => {
        e.preventDefault()
        setFilename(e.target.value)
    }
    return (
        <Container sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: 2 }}>
            <input
                ref={fileRef}
                style={{ display: 'none' }}
                // accept='image/*,video/*,audio/*,webgl/*,.glb,.gltf'
                accept='image/*'
                id='contained-button-file'
                multiple
                type='file'
                onChange={handleFileSelect}
            />
            <Button onClick={() => fileRef?.current?.click()} >
                Select Image
            </Button>
            <img src={fileDataUrl} style={{
                width: 600,
                // height: 400,
                objectFit: 'cover'
            }} />
            <Box sx={{ display: 'flex' }}>

                <Typography>File name:</Typography>
                <TextField
                    value={filename}
                    onChange={handleFilenameChange}
                // label='File name'
                />
            </Box>
            <Box sx={{ width: '100%', margin: 2, display: 'flex', justifyContent: 'center' }}>
                <LoadingButton
                    variant='contained'
                    disabled={!filename || !file}
                    onClick={handleUploadBtnClick}
                    loading={loading}
                    startIcon={<FileUploadIcon />}
                >Upload</LoadingButton>
            </Box>
        </Container>
    )

}
