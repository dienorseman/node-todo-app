const { log, clear } = require('console');

require("colors");

const { 
    inquirerMenu, 
    pause, 
    readInput 
} = require('./helpers/inquirer.js'); 

const Tasks = require('./models/tasks.js');
const { saveDB, readDB } = require('./helpers/saveFile.js');


const main = async () => {

    let opt = '';

    const tasks = new Tasks();

    const dbTasks = readDB(); 

    if ( dbTasks ) {
        tasks.loadTasksFromArray( dbTasks )
    }

    do {

        opt = await inquirerMenu();

        switch ( opt ) {
            case '1':
                const desc = await readInput('Description: ');
                tasks.createTask( desc );
                break;
            case '2':
                tasks.listAllTasks()
                break;
            case '3':
                log( tasks.listCompleted );

            default:
                log('Invalid option:', opt);
                break;
        }

        saveDB( tasks.listArr );
            
        await pause();

    } while ( opt !== '0' );
};

main();
