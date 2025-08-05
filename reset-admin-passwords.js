const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

async function updatePasswords() {
  // Admin1 - kullanıcı: 1, şifre: 1
  const hash1 = await bcrypt.hash('1', 10);
  const admin1 = { username: '1', password: hash1 };
  fs.writeFileSync(path.join(__dirname, 'data', 'admin1-user.json'), JSON.stringify(admin1, null, 2));
  
  // Admin2 - kullanıcı: 2, şifre: 2  
  const hash2 = await bcrypt.hash('2', 10);
  const admin2 = { username: '2', password: hash2 };
  fs.writeFileSync(path.join(__dirname, 'data', 'admin2-user.json'), JSON.stringify(admin2, null, 2));
  
  console.log('✅ Admin şifreler güncellendi:');
  console.log('👤 Admin1: kullanıcı=1, şifre=1');
  console.log('👤 Admin2: kullanıcı=2, şifre=2');
  console.log('🔗 Admin1 panel: http://localhost:3000/admin');
  console.log('🔗 Admin2 panel: http://localhost:3000/admin2');
}

updatePasswords().catch(console.error);
