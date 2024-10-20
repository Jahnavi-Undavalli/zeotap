// CombineRules.js
import React, { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';

const CombineRules = ({ onCombineRules }) => {  
    const [ruleStrings, setRuleStrings] = useState('');
    const [response, setResponse] = useState(null); 

    const handleCombineRules = async () => {
        try {
            const res = await fetch('http://localhost:3000/combine_rules', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ rules: ruleStrings.split('\n') }),  
            });
            const data = await res.json();
            setResponse(data);
            
            onCombineRules(data);
        } catch (error) {
            console.error('Error combining rules:', error);
        }
    };

    const renderAST = (ast) => {
        return (
            <Box
                sx={{
                    maxHeight: '300px', 
                    overflowY: 'auto',   
                    backgroundColor: '#f5f5f5',
                    padding: '10px',
                    borderRadius: '5px',
                    whiteSpace: 'pre-wrap', 
                    wordBreak: 'break-word'
                }}
            >
                {JSON.stringify(ast, null, 2)}
            </Box>
        );
    };

    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Combine Rules
            </Typography>
            <TextField
                label="Enter Rules (each rule on a new line)"
                fullWidth
                variant="outlined"
                value={ruleStrings}
                onChange={(e) => setRuleStrings(e.target.value)}
                multiline
                rows={4}
            />
            <Button variant="contained" color="primary" onClick={handleCombineRules} sx={{ mt: 2 }}>
                Combine Rules
            </Button>
            {response && (
                <Box sx={{ mt: 2 }}>
                    <Typography variant="body1">
                        Combined AST: 
                    </Typography>
                    {renderAST(response)} {/* Render combined AST in a formatted way */}
                </Box>
            )}
        </Box>
    );
};

export default CombineRules;
