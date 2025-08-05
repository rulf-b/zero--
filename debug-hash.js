const bcrypt = require('bcryptjs');
const fs = require('fs');

console.log('=== Hash Test ===');

// Admin1 test
const admin1Data = JSON.parse(fs.readFileSync('./data/admin1-user.json', 'utf-8'));
console.log('Admin1 dosyası:', admin1Data);

const test1 = bcrypt.compareSync('1', admin1Data.password);
console.log('Admin1 şifre "1" test:', test1);

// Admin2 test  
const admin2Data = JSON.parse(fs.readFileSync('./data/admin2-user.json', 'utf-8'));
console.log('Admin2 dosyası:', admin2Data);

const test2 = bcrypt.compareSync('5', admin2Data.password);
console.log('Admin2 şifre "5" test:', test2);

console.log('=== Yeni Hash Oluştur ===');
console.log('Şifre "1" için yeni hash:', bcrypt.hashSync('1', 10));
console.log('Şifre "5" için yeni hash:', bcrypt.hashSync('5', 10));
