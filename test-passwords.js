const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

// Admin1 kullanıcısını test et
const admin1Path = path.join(__dirname, 'data', 'admin1-user.json');
const admin1Data = JSON.parse(fs.readFileSync(admin1Path, 'utf-8'));

console.log('Admin1 Kullanıcı:', admin1Data.username);

// Şifre "1" için test
bcrypt.compare('1', admin1Data.password, (err, result) => {
  console.log('Admin1 - Şifre "1" test:', result);
});

// Şifre "admin1" için test  
bcrypt.compare('admin1', admin1Data.password, (err, result) => {
  console.log('Admin1 - Şifre "admin1" test:', result);
});

// Admin2 kullanıcısını test et
const admin2Path = path.join(__dirname, 'data', 'admin2-user.json');
const admin2Data = JSON.parse(fs.readFileSync(admin2Path, 'utf-8'));

console.log('Admin2 Kullanıcı:', admin2Data.username);

// Şifre "2" için test
bcrypt.compare('2', admin2Data.password, (err, result) => {
  console.log('Admin2 - Şifre "2" test:', result);
});

// Şifre "admin2" için test
bcrypt.compare('admin2', admin2Data.password, (err, result) => {
  console.log('Admin2 - Şifre "admin2" test:', result);
});

// Yeni şifreler oluştur
const newPassword1 = bcrypt.hashSync('1', 10);
const newPassword2 = bcrypt.hashSync('2', 10);

console.log('\n--- Yeni Hash\'ler ---');
console.log('Admin1 için "1" şifresi hash:', newPassword1);
console.log('Admin2 için "2" şifresi hash:', newPassword2);

// Dosyaları güncelle
const newAdmin1Data = { username: '1', password: newPassword1 };
const newAdmin2Data = { username: '2', password: newPassword2 };

fs.writeFileSync(admin1Path, JSON.stringify(newAdmin1Data, null, 2));
fs.writeFileSync(admin2Path, JSON.stringify(newAdmin2Data, null, 2));

console.log('\nAdmin kullanıcı dosyaları güncellendi!');
console.log('Admin1: Kullanıcı adı=1, Şifre=1');
console.log('Admin2: Kullanıcı adı=2, Şifre=2');
