require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./models');

// Render asigna un puerto dinámicamente vía la variable PORT 
const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await sequelize.authenticate();
    // Lo dejamos genérico para que aplique tanto a SQLite (local) como a PostgreSQL (producción)
    console.log('✅ Conexión a la Base de Datos establecida correctamente');

    await sequelize.sync({ force: false });
    console.log('✅ Tablas sincronizadas');

    app.listen(PORT, () => {
      // Quitamos el "localhost" porque en Render tendrá un dominio público
      console.log(`🚀 Backend corriendo exitosamente en el puerto ${PORT}`);
      console.log(`📋 API disponible e inicializada`);
    });
  } catch (err) {
    console.error('❌ Error al iniciar:', err);
    process.exit(1);
  }
}

start();