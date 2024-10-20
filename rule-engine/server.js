const express = require('express');
const mongoose = require('mongoose');
const Rule = require('./ruleModel');
const app = express();
const cors = require('cors');

app.use(cors());

app.use(express.json()); 


class Node {
    constructor(type, value = null, left = null, right = null) {
        this.type = type;
        this.value = value;
        this.left = left;
        this.right = right;
    }
}


function createRule(ruleString) {
    const tokens = ruleString.split(/\s+/); 

    
    const root = new Node('operator', 'AND');
    root.left = new Node('operand', { key: 'age', operator: '>', value: 30 });
    root.right = new Node('operand', { key: 'department', operator: '=', value: 'Sales' });

    return root;
}


function findOperatorIndex(ruleString) {
    let parenthesesCount = 0;
    for (let i = 0; i < ruleString.length; i++) {
        if (ruleString[i] === '(') parenthesesCount++;
        if (ruleString[i] === ')') parenthesesCount--;
        if (parenthesesCount === 0) {
            if (ruleString.substring(i, i + 3) === 'AND' || ruleString.substring(i, i + 2) === 'OR') {
                return i;
            }
        }
    }
    return -1;
}

function parseCondition(conditionString) {
    const conditionRegex = /^\s*(\w+)\s*(=|>|>=|<|<=)\s*'?([\w\s]+)'?\s*$/; 
    const match = conditionString.match(conditionRegex);

    if (!match) {
        throw new Error(`Invalid condition: ${conditionString}`);
    }

    const [, key, operator, value] = match;

    return {
        key: key.trim(),
        operator: operator.trim(),
        value: isNaN(value) ? value.trim() : Number(value.trim()) 
    };
}



app.post('/create_rule', async (req, res) => {
    const { rule_string } = req.body;
    
    if (!rule_string) {
        return res.status(400).json({ error: 'Rule string is missing' });
    }

    try {
        
        const ruleAST = createRule(rule_string);

        
        const astString = JSON.stringify(ruleAST);

        
        const newRule = new Rule({
            rule_string,  
            ast: astString  
        });

        
        await newRule.save();

        
        res.json(newRule);
    } catch (error) {
        console.error('Error creating rule:', error);
        res.status(500).json({ error: 'Error creating or saving the rule' });
    }
});


function combineRules(ruleASTs) {
    if (ruleASTs.length === 0) return null;

    let combinedRoot = ruleASTs[0];
    for (let i = 1; i < ruleASTs.length; i++) {
        const newRoot = new Node('operator', 'AND');
        newRoot.left = combinedRoot;
        newRoot.right = ruleASTs[i];
        combinedRoot = newRoot;
    }
    return combinedRoot;
}

function evaluateRule(node, data) {
    if (!node) {
        throw new Error('Invalid AST node');
    }
    
    switch (node.type) {
        case 'operator':
            const leftValue = evaluateRule(node.left, data);
            const rightValue = evaluateRule(node.right, data);
            
            if (node.value === 'AND') {
                return leftValue && rightValue;
            } else if (node.value === 'OR') {
                return leftValue || rightValue;
            }
            break;
            
        case 'operand':
            const attributeValue = data[node.value.key];
            if (node.value.operator === '>') {
                return attributeValue > node.value.value;
            } else if (node.value.operator === '<') {
                return attributeValue < node.value.value;
            } else if (node.value.operator === '=') {
                return attributeValue === node.value.value;
            }
            break;
            
        default:
            throw new Error(`Unknown node type: ${node.type}`);
    }
}




app.post('/combine_rules', (req, res) => {
    const { rules } = req.body; 
    const ruleASTs = rules.map(ruleString => createRule(ruleString));
    const combinedAST = combineRules(ruleASTs);
    res.json(combinedAST);
});


app.post('/evaluate', (req, res) => {
    const { ast, data } = req.body;
    console.log(ast);
    console.log(data);

    try {
       
        const parsedAST = typeof ast === 'string' ? JSON.parse(ast) : ast;
        const result = evaluateRule(parsedAST, data);
        res.json({ result });
    } catch (error) {
        console.error('Evaluation Error:', error);
        res.status(400).json({ error: error.message });
    }
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
