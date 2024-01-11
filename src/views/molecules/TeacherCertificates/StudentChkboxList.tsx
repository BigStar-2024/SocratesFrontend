import { FC, useState } from 'react';
import { FormControlLabel, Paper, Checkbox, Typography, Box, Button } from '@mui/material';
import { dictionary } from './dictionary'
import { LSDialog } from '../Setting/LSDialog';
import { SentCertDgContent } from './SendCertDgContent';

interface IStudents {
    students: {
        id: number
        name: string
    }[]
}

export const StudentChkboxList: FC<IStudents> = ({ students }) => {

    const [selected, setSeleted] = useState<Array<number>>([])
    const [all, setAll] = useState(false)
    const [open, setOpen] = useState(false)
    const close = () => {
        setOpen(false)
    }

    const handleStudentSelect = (id: number) => {

        const tempSeleted = [...selected]

        if (tempSeleted.includes(id)) {
            const filtered = tempSeleted.filter(element => { return element !== id })
            setSeleted(filtered)
        } else setSeleted([...selected, id])

    }
    const handleSelectAll = () => {
        setAll(!all)
    }

    return (
        <Paper sx={{
            width: 300,
            background: '#22BAAF33',
            padding: '30px 50px',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column'
        }}>
            <Paper sx={{
                padding: 2,
                width: 250,
            }}>
                <Typography variant='h5' style={{ textAlign: 'center' }}>Students Name</Typography>
                <FormControlLabel
                    label={'All'}
                    value={-1}
                    sx={{
                        marginLeft: 5
                    }}
                    control={
                        <Checkbox checked={all} onChange={handleSelectAll} />
                    }
                />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: 200,
                        maxHeight: 500,
                        overflowY: 'auto'
                    }}
                >
                    {
                        students.map(student => (
                            <FormControlLabel
                                key={student.id}
                                label={student.name}
                                value={student.id}
                                sx={{
                                    marginLeft: 5
                                }}
                                control={
                                    <Checkbox checked={selected.includes(student.id) || all} onChange={() => handleStudentSelect(student.id)} />
                                }
                            />
                        ))
                    }
                </Box>
            </Paper>
            <Button
                variant='contained'
                onClick={() => { setOpen(true) }}
                sx={{
                    width: 200,
                    marginTop: 5
                }}
            >
                Select
            </Button>
            <LSDialog
                isOpen={open}
                open={close}
                fullWidth='true'
                dialogContent={
                    <SentCertDgContent />
                }
            />
        </Paper>
    )

}
