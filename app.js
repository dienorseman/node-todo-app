const { log, clear } = require('console');

require("colors");

const { 
    inquirerMenu, 
    pause, 
    readInput, 
    selectTask,
    confirm,
    multiSelectTask
} = require('./helpers/inquirer.js'); 

const Tasks = require('./models/tasks.js');
const { saveDB, readDB } = require('./helpers/saveFile.js');


const main = async () => {

    let opt = '';
    let ok = '';
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
                tasks.listPendgingCompleted()
                break
            case '4':
                tasks.listPendgingCompleted( false )
                break
            case '5':
                const ids = await multiSelectTask(tasks.listArr)
                ok = await confirm('Are you sure?')
                if ( ok ) {
                    tasks.toggleCompleted( ids )
                    log('Tasks updated')
                }
                break
            case '6':
                const taskId = await selectTask(tasks.listArr)
                ok = await confirm('Are you sure?')
                if ( ok ) {
                    tasks.deleteTask( taskId )
                    log('Task deleted')
                }
                break
            default:
                log('Invalid option:', opt);
                break;
        }

        saveDB( tasks.listArr );
            
        await pause();

    } while ( opt !== '0' );
};

main();
