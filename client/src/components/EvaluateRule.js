// EvaluateRule.js
import React, { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';

const EvaluateRule = ({ ast }) => {  
    const [dataString, setDataString] = useState('');
    const [response, setResponse] = useState('');

    const handleEvaluateRule = async () => {
        try {
           
            const data = JSON.parse(dataString); 

            
            const res = await fetch('http://localhost:3000/evaluate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ast, data }), 
            });

            const result = await res.json(); 
            setResponse(result); 
        } catch (error) {
            console.error('Error evaluating rule:', error);
            setResponse('Error: ' + error.message); 
        }
    };

    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Evaluate Rule
            </Typography>
            <TextField
                label="Enter Data (JSON)"
                fullWidth
                variant="outlined"
                value={dataString}
                onChange={(e) => setDataString(e.target.value)}
                multiline
                rows={4}
            />
            <Button variant="contained" color="primary" onClick={handleEvaluateRule} sx={{ mt: 2 }}>
                Evaluate Rule
            </Button>
            {response && (
                <Typography variant="body1" sx={{ mt: 2 }}>
                    Evaluation Result: {JSON.stringify(response.result)}
                </Typography>
            )}
        </Box>
    );
};

export default EvaluateRule;
