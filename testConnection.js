// const oracledb = require('oracledb');

// async function testConnection() {
//   try {
//     await oracledb.createPool({
//       user: 'K8S_PE_ENV_PARTY',
//       password: 'Payx07',
//       connectString: '127.0.0.1:1525/dahabdev_pdb1.mumdbsubnet.mumvcn.oraclevcn.com'
//     });

//     const connection = await oracledb.getConnection();
//     console.log('Connection was successful!');
//     await connection.close();
//   } catch (err) {
//     console.error('Error connecting to Oracle:', err);
//   } finally {
//     await oracledb.getPool().close();
//   }
// }

// testConnection();

const oracledb = require('oracledb');
oracledb.initOracleClient({ libDir: 'C:\\oracle\\instantclient' });

async function testConnection() {
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: 'K8S_PE_ENV_PARTY',
      password: 'Payx07',
      connectString: '127.0.0.1:1525/dahabdev_pdb1.mumdbsubnet.mumvcn.oraclevcn.com'
    });

    console.log('Connection was successful!');
  } catch (err) {
    console.error('Error connecting to Oracle:', err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
}

testConnection();
