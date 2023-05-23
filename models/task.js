const uuid  = require('uuid').v4;

class Task {
    id = '';
    desc = '';
    completedAt = false;

    constructor( desc ) {
        this.id = uuid();
        this.desc = desc;
        this.completedAt = null;
    }

    set markCompleted( mark=true ) {
        this.completedAt = mark
    }
    
}

module.exports = Task;