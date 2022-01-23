import { Button, Paper, Stack, TextField } from '@mui/material'
import { Box } from '@mui/system';
import React, { useState } from 'react'

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [formError, setFormError] = useState({
        username: "",
        password: ""
    })

    function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUsername(e.currentTarget.value)
    }

    function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.currentTarget.value)
    }

    function handleSubmit() {
        if (!username) {
            setFormError({
                ...formError, username: "Please enter your username."
            })
        }
        if (!password) {
            setFormError({
                ...formError, password: "Please enter your password."
            })
        }
    }

    return (
        <Paper>
            <form>
                <Stack direction="column" spacing={2}>
                    <TextField value={username} onChange={handleUsernameChange} variant="outlined" label="Username" error={!!formError.username} helperText={formError.username} />
                    <TextField value={password} onChange={handlePasswordChange} variant="outlined" label="Password" error={!!formError.password} helperText={formError.password} />

                    <Box display="flex" width="100%" justifyContent="end">
                        <Button variant='contained' onClick={handleSubmit}>Login</Button>
                    </Box>
                </Stack>
            </form>
        </Paper>
    )
}
