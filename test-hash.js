const bcrypt = require('bcryptjs');

console.log('Admin1 şifre "1" için hash:');
console.log(bcrypt.hashSync('1', 10));
console.log('\nAdmin2 şifre "5" için hash:');
console.log(bcrypt.hashSync('5', 10));

// Test edelim
const hash1 = bcrypt.hashSync('1', 10);
const hash5 = bcrypt.hashSync('5', 10);

console.log('\nTest: "1" şifresi doğru mu?', bcrypt.compareSync('1', hash1));
console.log('Test: "5" şifresi doğru mu?', bcrypt.compareSync('5', hash5));
