const { log, clear } = require("console");

require("colors");

const showMenu = () => {

    return new Promise( resolve => {



        log(`${"1)".green} Add a TODO`);
        log(`${"2)".green} List all TODOs`);
        log(`${"3)".green} List completed TODOs`);
        log(`${"4)".green} List pending TODOs`);
        log(`${"5)".green} Complete TODOs`);
        log(`${"6)".green} Delete a TODO`);
        log(`${"0)".green} Exit\n`);
        
        const readline = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        readline.question("Select an option: ", (opt) => {
            readline.close();
            resolve(opt);
        });
    });

};

const pause = () => {
    const readline = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    readline.question(`\nPress ${"ENTER".green} to continue\n`, (opt) => {
        readline.close();
    });
    };

module.exports = {
    showMenu,
    pause,
};
