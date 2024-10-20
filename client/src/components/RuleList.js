import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RuleList = () => {
    const [rules, setRules] = useState([]);

    useEffect(() => {
        const fetchRules = async () => {
            try {
                const response = await axios.get('http://localhost:3000/rules');
                setRules(response.data);
            } catch (error) {
                console.error('Error fetching rules:', error);
            }
        };

        fetchRules();
    }, []);

    return (
        <div className="rule-list">
            <h2>Rules</h2>
            <ul>
                {rules.map((rule) => (
                    <li key={rule._id}>
                        <p>Rule: {rule.rule_string}</p>
                        <p>AST: {rule.ast}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RuleList;
