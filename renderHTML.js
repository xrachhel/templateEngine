const fs = require("fs")
const util = require("util")

const Manager = require("./lib/Manager")
const Engineer = require("./lib/Engineer")
const Intern = require("./lib/Intern")

const writeFile = util.promisify(fs.writeFile)
const readFile = util.promisify(fs.readFile)

function createTemplate(template, key, value) {
    const replace = new RegExp("{{"+key+"}}");
    const newTemplate = template.replace(replace, value);
    return newTemplate;
}

async function renderHTML(employees) {
    const html = []

    const [managerTemplate, mainTemplate, internTemplate, engineerTemplate] = await Promise.all([
        readFile(__dirname + "/templates/manager.html", "utf8"),
        readFile(__dirname + "/templates/main.html", "utf8"),
        readFile(__dirname + "/templates/intern.html", "utf8"),
        readFile(__dirname + "/templates/engineer.html", "utf8")
    ])

    const managerCards = employees.filter(employee => employee instanceof Manager)
        .map(employee => {
            let template = managerTemplate;
            for (const key in employee) {
                template = createTemplate(template, key, employee[key]);
            }
            return template;
        })

    const internCards = employees.filter(employee => employee instanceof Intern)
        .map(employee => {
            let template = internTemplate;
            for (const key in employee) {
                template = createTemplate(template, key, employee[key]);
            }
            return template;
        })

    const engineerCards = employees.filter(employee => employee instanceof Engineer)
        .map(employee => {
            let template = engineerTemplate;
            for (const key in employee) {
                template = createTemplate(template, key, employee[key]);
            }
            return template;
        })

    html.push(managerCards, internCards, engineerCards)

    const final = createTemplate(mainTemplate, "body", html.join(""))


    await writeFile("team.html", final, function (err) {
        if (err) throw err
    })
}




module.exports = renderHTML