const inquirer = require("inquirer")
const Manager = require("./lib/Manager")
const Engineer = require("./lib/Engineer")
const Intern = require("./lib/Intern")

const renderHTML = require("./renderHTML")

var info = []
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
        
    ]).then(function(response){
        const manager = new Manager(
            response.name, response.id, response.email,response.office
        )
        info.push(manager)
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
            renderHTML(info)
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
            message: "What is your engineer's github username?"
        }

    ]).then(function(response){
        const engineer = new Engineer(
            response.name, response.id, response.email, response.github
        )
        info.push(engineer)
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
            message: "What university does your intern attend?"
        }
                   
    ]).then(function(response){
        const intern = new Intern(
            response.name, response.id, response.email, response.school
        )
        info.push(intern)
        whatType()
    })
}

