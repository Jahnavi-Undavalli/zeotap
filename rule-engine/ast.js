// ast.js
class Node {
    constructor(type, value = null, left = null, right = null) {
        this.type = type; // "operator" or "operand"
        this.value = value; // Optional value for operand nodes
        this.left = left; // Left child
        this.right = right; // Right child
    }
}

module.exports = Node;
