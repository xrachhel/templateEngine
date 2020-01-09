const inquirer = require("inquirer")

// inquirer.prompt([
//     {
//         type: "input",
//         name: "name",
//         message: "What is your name?"
//     },
//     {
//         type: "input",
//         name: "id",
//         message: "What is your ID?"
//     },
//     {
//         type: "input",
//         name: "email",
//         message: "What is your email?"
//     },
//     {
//         type: "list",
//         name: "role",
//         message: "What is your role?",
//         choices: ["Manager", "Engineer", "Intern"]
//     },

//     {
//         type: "input",
//         name: "github",
//         message: "What is your github username?",
//         when: function(answers){
//             return answers.role === "Engineer"
//         }
//     },
//     {
//         type: "input",
//         name: "officeNumber",
//         message: "What is your office number?",
//         when: function(answers){
//             return answers.role === "Manager"
//         }
//     },
//     {
//         type: "input",
//         name: "school",
//         message: "What university do you attend?",
//         when: function (answers){
//             return answers.role === "Intern"
//         }
//     }
// ])
initialQuestions()

function initialQuestions() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your manager's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is your manager's ID?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your manager's email?"
        },
        {
            type: "input",
            name: "office",
            message: "What is your manager's office number?"
        }
        
    ]).then(function(){
        whatType()
    })
}

function whatType(){
    inquirer.prompt([
        {
            type: "list",
            name: "type",
            message: "What type of team member would you like to add?",
            choices: ["Engineer", "Intern", "I dont want to add anymore team members"]
        }
    ]).then(function(response){
        if(response.type === "Engineer"){
            engineerQuestions()
        }
        else if(response.type === "Intern"){
            internQuestions()
        }
        else if(response.type === "I dont want to add anymore team members"){
            return
        }
    })
}



function engineerQuestions() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your engineer's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is your engineer's ID?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your engineer's email?"
        },
        {
            type: "input",
            name: "github",
            message: "What is your github username?"
        }

    ]).then(function(){
        whatType()
    })
}

function internQuestions() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your intern's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is your intern's ID?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your intern's email?"
        },
        {
            type: "input",
            name: "school",
            message: "What university do you attend?"
        }
                   
    ]).then(function(){
        whatType()
    })
}

// initialQuestions().then(function(){
//     whatType()
// }).then(function (answers) {
//     console.log(answers)
//     if (answers.type === "Engineer") {
//         engineerQuestions()
//     }
//     else if (answers.type === "Intern"){
//         internQuestions()
//     }
// })
