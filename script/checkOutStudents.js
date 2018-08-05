const fs = require('fs');
const db = require('../db/connect');

db.start();

const Students = require('../modules/Students/Students.model');

console.log('====start check out collections : Students ....');

Students.list_Students();
