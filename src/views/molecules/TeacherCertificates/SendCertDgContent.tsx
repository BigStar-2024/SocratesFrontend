import { FC, useState, useRef } from 'react'
import { Container, Box, Button, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { exportComponentAsPNG } from 'react-component-export-image'

export const SentCertDgContent: FC = () => {

    const imgurl = useSelector((state: any) => state.certificate.selectedImg);
    const [title, seTitle] = useState('')
    const [content, setContent] = useState('')
    const certRef = useRef<HTMLElement>(null)

    const handleTitleChange = (e: any) => {
        seTitle(e.target.value)
    }

    const handleContentChange = (e: any) => {
        setContent(e.target.value)
    }

    return (
        <Container sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', paddingBottom: 2 }}>
            <Box ref={certRef}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    minHeight: 200,
                }}
            >
                <img src={imgurl} style={{
                    width: 800,
                    height: 'auto',
                    objectFit: 'contain',
                }} />
                <Box
                    sx={{
                        width: 400,
                        position: 'absolute',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <input
                        value={title}
                        onChange={handleTitleChange}
                        placeholder='Title'
                        style={{
                            fontSize: 45,
                            textAlign: 'center',
                            border: title ? 'none' : 'dashed 2px grey',
                            background: 'none',
                            filter: 'drop-shadow(0 0 0.1rem white)'
                        }}
                    />
                    <input
                        value={content}
                        onChange={handleContentChange}
                        placeholder='Title'
                        style={{
                            fontSize: 20,
                            textAlign: 'center',
                            border: content ? 'none' : 'dashed 2px grey',
                            background: 'none',
                            filter: 'drop-shadow(0 0 0.1rem white)'
                        }}
                    />
                    <Typography variant='h5'>
                        Student Name
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-evenly', margin: 1 }}>
                <Button
                    variant='contained'
                    // onClick={() => { setOpen(true) }}
                    sx={{
                        width: 200
                    }}
                >
                    Send
                </Button>
                <Button
                    variant='contained'
                    color='warning'
                    onClick={() => exportComponentAsPNG(certRef)}
                    sx={{
                        width: 200,
                    }}
                >
                    Print
                </Button>
            </Box>
        </Container>
    )

}
