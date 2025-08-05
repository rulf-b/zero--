const bcrypt = require('bcryptjs');
const fs = require('fs');

// Yeni hash'ler oluştur
const admin1Hash = bcrypt.hashSync('1', 10);
const admin2Hash = bcrypt.hashSync('5', 10);

console.log('Admin1 hash oluşturuldu, test:', bcrypt.compareSync('1', admin1Hash));
console.log('Admin2 hash oluşturuldu, test:', bcrypt.compareSync('5', admin2Hash));

// Dosyaları güncelle
const admin1Data = { username: '1', password: admin1Hash };
const admin2Data = { username: '5', password: admin2Hash };

fs.writeFileSync('./data/admin1-user.json', JSON.stringify(admin1Data, null, 2));
fs.writeFileSync('./data/admin2-user.json', JSON.stringify(admin2Data, null, 2));

console.log('Hash\'ler başarıyla oluşturuldu ve dosyalara yazıldı!');
