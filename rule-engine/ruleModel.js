// ruleModel.js
const mongoose = require('./database'); 

const ruleSchema = new mongoose.Schema({
    rule_string: { type: String, required: true },
    ast: { type: String, required: true } 
});

const Rule = mongoose.model('Rule', ruleSchema);

module.exports = Rule;
