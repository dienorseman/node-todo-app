const { log } = require('console');
const fs  = require('fs');


const file = './db/data.json';

const saveDB = ( data ) => {
    const dataJSON = JSON.stringify( data );
    fs.writeFileSync( file, dataJSON );

};

const readDB = () => {

    if ( !fs.existsSync( file ) ) return null

    const info = fs.readFileSync( file, { encoding: 'utf-8' } );

    const data = JSON.parse( info )

    // log( data )

    return data

}

module.exports = {
    saveDB,
    readDB
}