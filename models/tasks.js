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
        const list = this.listArr()
        log( list )
    }

    get listArr() {
        const list = [];
        Object.keys(this._list).forEach( key => {
            const task = this._list[key];
            list.push( task );
        });
        return list;
    }

    get listCompleted() {
        const list = [];
        Object.keys(this._list).forEach( key => {
            const task = this._list[key];
            if ( task.completedAt ) {
                list.push( task );
            }
        });
        return list;
    }

}

module.exports = Tasks;