const fs = require('fs');
const idl = require('./step_staking.json');
const idl1 = require('./nft_staking.json');

fs.writeFileSync('./src/shadow/idl.json', JSON.stringify(idl));

fs.writeFileSync('./src/contract/idl.json', JSON.stringify(idl1));