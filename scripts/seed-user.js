/**
 * Script para criar usuário inicial (seed)
 * Uso: node scripts/seed-user.js
 */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const User = mongoose.model('User', userSchema);

async function seedUser() {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI não está definido no arquivo .env');
    }

    await mongoose.connect(mongoUri);
    console.log('✓ Conectado ao MongoDB');

    // Verificar se já existe algum usuário
    const existingUser = await User.findOne();
    if (existingUser) {
      console.log('✗ Já existem usuários no banco de dados. Abortando seed.');
      process.exit(0);
    }

    // Criar usuário padrão
    const defaultUsername = 'admin';
    const defaultEmail = 'admin@chefdesk.com';
    const defaultPassword = 'admin123456'; // MUDAR EM PRODUÇÃO!

    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    const newUser = new User({
      username: defaultUsername,
      email: defaultEmail,
      password: hashedPassword,
      isAdmin: true,
      isActive: true,
    });

    await newUser.save();
    console.log('✓ Usuário criado com sucesso!');
    console.log(`
Credenciais de acesso:
  Username: ${defaultUsername}
  Email: ${defaultEmail}
  Senha: ${defaultPassword}

⚠️  IMPORTANTE: Altere a senha após o primeiro login!
    `);
  } catch (error) {
    console.error('✗ Erro ao criar usuário:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('✓ Desconectado do MongoDB');
  }
}

seedUser();
