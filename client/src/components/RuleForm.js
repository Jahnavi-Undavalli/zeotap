import React, { useState } from 'react';
import axios from 'axios';

const RuleForm = () => {
    const [ruleString, setRuleString] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/create_rule', { rule_string: ruleString });
            console.log('Rule created:', response.data);
            setRuleString('');
        } catch (error) {
            console.error('Error creating rule:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="rule-form">
            <input
                type="text"
                value={ruleString}
                onChange={(e) => setRuleString(e.target.value)}
                placeholder="Enter rule string"
                required
            />
            <button type="submit">Create Rule</button>
        </form>
    );
};

export default RuleForm;
