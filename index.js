const inquirer = require("inquirer")

inquirer.prompt([
    {
        type: "input",
        name: "name",
        message: "What is your name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is your ID?"
    },
    {
        type: "input",
        name: "email",
        message: "What is your email?"
    },
    {
        type: "list",
        name: "role",
        message: "What is your role?",
        choices: ["Manager", "Engineer", "Intern"]
    },
    
    {
        type: "input",
        name: "github",
        message: "What is your github username?",
        when: function(answers){
            return answers.role === "Engineer"
        }
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What is your office number?",
        when: function(answers){
            return answers.role === "Manager"
        }
    },
    {
        type: "input",
        name: "school",
        message: "What university do you attend?",
        when: function (answers){
            return answers.role === "Intern"
        }
    }
])