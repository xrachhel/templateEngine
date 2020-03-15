// Dependencies
const fs = require("fs")
const util = require("util")

const Manager = require("./lib/Manager")
const Engineer = require("./lib/Engineer")
const Intern = require("./lib/Intern")

const writeFile = util.promisify(fs.writeFile)
const readFile = util.promisify(fs.readFile)

// Using RegExp and .replace to replace values in HTML templates
function createTemplate(template, key, value) {
    const replace = new RegExp("{{"+key+"}}");
    const newTemplate = template.replace(replace, value);
    return newTemplate;
};

async function renderHTML(employees) {
    const html = []

    // Reading HTML templates for each role
    const [managerTemplate, mainTemplate, internTemplate, engineerTemplate] = await Promise.all([
        readFile(__dirname + "/templates/manager.html", "utf8"),
        readFile(__dirname + "/templates/main.html", "utf8"),
        readFile(__dirname + "/templates/intern.html", "utf8"),
        readFile(__dirname + "/templates/engineer.html", "utf8")
    ]);

    // Filtering through to find Manager objects to create Manager cards
    const managerCards = employees.filter(employee => employee instanceof Manager)
        .map(employee => {
            let template = managerTemplate;
            for (const key in employee) {
                template = createTemplate(template, key, employee[key]);
            }
            return template;
        });

    // Filtering through to find Intern objects to create Intern cards
    const internCards = employees.filter(employee => employee instanceof Intern)
        .map(employee => {
            let template = internTemplate;
            for (const key in employee) {
                template = createTemplate(template, key, employee[key]);
            }
            return template;
        });

    // Filtering through to find Engineer objects to create Engineer cards
    const engineerCards = employees.filter(employee => employee instanceof Engineer)
        .map(employee => {
            let template = engineerTemplate;
            for (const key in employee) {
                template = createTemplate(template, key, employee[key]);
            }
            return template;
        });
    
    // Pushing all cards to empty array
    html.push(managerCards, internCards, engineerCards)
    
    // Setting variable to return value of createTemplate and put all cards into
    // body of main HTML file
    const final = createTemplate(mainTemplate, "body", html.join(""))

    // Writing final HTML file with all employee cards
    await writeFile("team.html", final, function (err) {
        if (err) throw err
    });
};

module.exports = renderHTML;