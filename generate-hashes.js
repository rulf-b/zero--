const bcrypt = require('bcryptjs');

// Admin1 için hash (şifre: 1)
const hash1 = bcrypt.hashSync('1', 10);
console.log('Admin1 hash:', hash1);

// Admin2 için hash (şifre: 5)  
const hash5 = bcrypt.hashSync('5', 10);
console.log('Admin2 hash:', hash5);

// Test
console.log('Test Admin1:', bcrypt.compareSync('1', hash1));
console.log('Test Admin2:', bcrypt.compareSync('5', hash5));
