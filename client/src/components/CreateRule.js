// CreateRule.js
import React, { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';

const CreateRule = ({ onCreateRule }) => {  
    const [ruleString, setRuleString] = useState('');
    const [response, setResponse] = useState(null); 

    const handleCreateRule = async () => {
        try {
            const res = await fetch('http://localhost:3000/create_rule', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ rule_string: ruleString }),
            });
            const data = await res.json();
            setResponse(data);
           
            onCreateRule(data.ast);
        } catch (error) {
            console.error('Error creating rule:', error);
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
                Create Rule
            </Typography>
            <TextField
                label="Enter Rule String"
                fullWidth
                variant="outlined"
                value={ruleString}
                onChange={(e) => setRuleString(e.target.value)}
                multiline
                rows={4}
            />
            <Button variant="contained" color="primary" onClick={handleCreateRule} sx={{ mt: 2 }}>
                Create Rule
            </Button>
            {response && (
                <Box sx={{ mt: 2 }}>
                    <Typography variant="body1">
                        Rule created successfully! Here is the generated AST:
                    </Typography>
                    {renderAST(response.ast)} {/* Render AST in a formatted way */}
                </Box>
            )}
        </Box>
    );
};

export default CreateRule;
