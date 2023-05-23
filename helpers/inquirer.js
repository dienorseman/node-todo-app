
const { log, clear } = require('console')
const inquirer = require('inquirer')
require('colors')

const menuOpts = [
    {
        type: 'list',
        name: 'option',
        message: 'What do you want to do?',
        choices: [
            {
                value: '1',
                name: `${'1)'.green} Create task`,
            },
            {
                value: '2',
                name: `${'2)'.green} List tasks`,
            },
            {
                value: '3',
                name: `${'3)'.green} List completed tasks`,
            },
            {
                value: '4',
                name: `${'4)'.green} List pending tasks`,
            },
            {
                value: '5',
                name: `${'5)'.green} Complete task(s)`,
            },
            {
                value: '6',
                name: `${'6)'.green} Delete task`,
            },
            {
                value: '0',
                name: `${'0)'.green} Exit`,
            },
        ],
    },
]

const inquirerMenu = async () => {
    clear()
    log('============================'.green)
    log('   Select an option'.yellow)
    log('============================\n'.green)

    const { option } = await inquirer.prompt(menuOpts)
    return option
}

const pause = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Press ${'ENTER'.green} to continue`,
        },
    ]
    log('\n')
    await inquirer.prompt(question)
}


const readInput = async ( message ) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if ( value.length === 0 ) {
                    return 'Please enter a value';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}


const selectTask = async ( tasks = [] ) => {
    log()
    const taskMenu = {
        type: 'list',
        name: 'id',
        message: 'Select a task',
        choices: tasks.map( ( task, i ) => {
            {
                const index = `${i + 1}`.green
                const { desc, completedAt } = task
                const status = completedAt 
                ? 'Completed'.green 
                : 'Pending'.red
                return {
                    value: task.id,
                    name: `${index} ${desc} ${'::'} ${status}`
                }
            }
        })
    }
    const { id } = await inquirer.prompt( taskMenu )
    return id
}

const multiSelectTask = async ( tasks = [] ) => {
    log()
    const taskMenu = {
        type: 'checkbox',
        name: 'ids',
        message: 'Select a task',
        choices: tasks.map( ( task, i ) => {
            {
                const index = `${i + 1}`.green
                const { desc, completedAt } = task
                const status = completedAt
                ? 'Completed'.green
                : 'Pending'.red
                return {
                    value: task.id,
                    name: `${index} ${desc} ${'::'} ${status}`,
                    checked: (completedAt) ? true : false
                }
            }
        })
    }
    const { ids } = await inquirer.prompt( taskMenu )
    return ids
}

const confirm = async ( message ) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;
}

module.exports = {
    inquirerMenu,
    pause,
    readInput,
    selectTask,
    multiSelectTask,
    confirm
};


    
