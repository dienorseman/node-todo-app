const { log, clear } = require('console');

require("colors");
const Task = require('./task');

class Tasks {
    _list = {};
    constructor() {
        this._list = {};
    }

    loadTasksFromArray( tasks = [] ) {
        tasks.forEach( task => {
            this._list[task.id] = task    
        })
    }

    createTask( desc = '' ) {
        const task = new Task( desc );
        this._list[task.id] = task;
    }

    deleteTask( id = '' ) {
        if ( this._list[id] ) {
            delete this._list[id];
        }
    }


    listAllTasks() {
        log()
        this.listArr.forEach( ( task, i ) => {
            const index = `${i+1}.`.green;
            const { desc, completedAt } = task;
            const status = completedAt 
                ? 'Completed'.green 
                : 'Pending'.red;
            log( `${index} ${desc} ${status}` );
        })
    }

    listPendgingCompleted( completed = true ) {
        log()
        let index = 0
        completed
            ? log('Completed tasks: ')
            : log( 'Pending tasks:')
        log()
        this.listArr.forEach( ( task ) => {
            const { desc, completedAt } = task;
            if ( completed ) {
                if ( completedAt ) {
                    index++;
                    log( `${index.toString().green} ${desc} ${completedAt.green}` )
                }
            } else {
                if ( !completedAt ) {
                    index++;
                    log( `${index.toString().green} ${desc}` )
                }
            }         
        })
        if ( index === 0 ) {
            completed 
                ? log('No completed tasks yet'.red) 
                : log('No pending tasks yes'.red)
        }
    }

    toggleCompleted( ids = [] ) {
        ids.forEach( id => {
            const task = this._list[id];
            if ( !task.completedAt ) {
                task.completedAt = new Date().toISOString()
            }
        })
        this.listArr.forEach( task => {
            if ( !ids.includes( task.id ) ) {
                this._list[task.id].completedAt = null;
            }
        })
    }

    get listArr() {
        const list = [];
        Object.keys(this._list).forEach( key => {
            const task = this._list[key];
            list.push( task );
        });
        return list;
    }


}

module.exports = Tasks;