const bcrypt = require('bcryptjs');

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  console.log('Hashed password:', hash);
  console.log('\nCopy this hash and update your admin user in Supabase');
}

// Change this to your desired password
const password = 'admin123';
hashPassword(password);
