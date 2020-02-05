import Datastore from 'nedb-promises';

const { app } = require('electron').remote;


const dbFactory = (fileName) => Datastore.create({
  filename: `${process.env.NODE_ENV === 'dev' ? '.' : app.getAppPath('userData')}/data/${fileName}`,
  timestampData: true,
  autoload: true,
});

const db = {
  teacher: dbFactory('teacher.db'),
  test: dbFactory('test.db'),
  result: dbFactory('result.db'),
};

export default db;
