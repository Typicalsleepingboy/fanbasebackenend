const { Parser } = require("json2csv");

function generateCSV(data) {
    const fields = ["code", "votes"];
    const parser = new Parser({ fields });
    return parser.parse(data);
}

module.exports = generateCSV;
