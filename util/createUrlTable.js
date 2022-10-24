require('dotenv').config()
const {dbWrite} = require('../models/mysqlconf');

const createTable = async () => {
  try{
  await dbWrite.execute('DROP TABLE IF EXISTS `url_info`;')
  console.log('Drop existed table');
  await dbWrite.execute('CREATE TABLE `url_info`(`id` BIGINT unsigned NOT NULL AUTO_INCREMENT, `short_url` CHAR(10) NOT NULL UNIQUE, `long_url` VARCHAR(255) NOT NULL, PRIMARY KEY (`id`), INDEX (`short_url`))')
  console.log('table created successfully.');
  process.exit()
  } catch(err){
    console.error(err);
    console.error('create table failed')
  }
}

createTable()