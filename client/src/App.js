import React, { useState } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import CreateRule from './components/CreateRule';
import CombineRules from './components/CombineRules';
import EvaluateRule from './components/EvaluateRule';

const App = () => {
    // State to store the AST
    const [combinedAST, setCombinedAST] = useState(null);


    const updateCombinedAST = (ast) => {
        setCombinedAST(ast);
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h3" gutterBottom>
                Rule Engine Application
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <CreateRule onCreateRule={updateCombinedAST} />
                </Grid>
                <Grid item xs={12}>
                    <CombineRules onCombineRules={updateCombinedAST} />
                </Grid>
                <Grid item xs={12}>
                    <EvaluateRule ast={combinedAST} />
                </Grid>
            </Grid>
        </Container>
    );
};

export default App;
