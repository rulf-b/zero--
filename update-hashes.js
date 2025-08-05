const bcrypt = require('bcryptjs');
const fs = require('fs');

// Yeni hash'ler oluştur
const admin1Hash = '$2b$10$NZx1JkgSQtJiRpxOfTSh.Ok1Jw83MfvHyShy.ZMxJKr8m2nD3CUWy';
const admin2Hash = '$2b$10$cgr0GOLcB2iIn4olKfUuEOa4WtJ9yw9ws29lsR1yfv8j0rDWc8lOi';

// Test edelim
console.log('Admin1 test:', bcrypt.compareSync('1', admin1Hash));
console.log('Admin2 test:', bcrypt.compareSync('5', admin2Hash));

// Dosyaları güncelle
const admin1Data = { username: '1', password: admin1Hash };
const admin2Data = { username: '5', password: admin2Hash };

fs.writeFileSync('./data/admin1-user.json', JSON.stringify(admin1Data, null, 2));
fs.writeFileSync('./data/admin2-user.json', JSON.stringify(admin2Data, null, 2));

console.log('Dosyalar güncellendi!');
