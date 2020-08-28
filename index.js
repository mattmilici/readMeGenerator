const fs = require("fs");
const util = require("util");
const inquirer = require("inquirer");
const thenableWriteFile = util.promisify(fs.writeFile);

function getHtmlOutput(answers) {
    const title = answers.title;
    const description = answers.description;
    const installation = answers.installation;
    const usage = answers.usage;
    const contribution = answers.contribution;
    const testInstructions = answers.testInstructions;
    const license = answers.license;
    const licneseColor = answers.licneseColor;
    const email = answers.email;
    const github = answers.github;
    return `# ${title} \n\n## Description\n${description}\n\n![${license} Badge](https://img.shields.io/badge/License-${license}-${licneseColor})\n\n## Table of Contents\n* [Description](#Description)\n* [Installation](#Installation)\n* [Usage](#Usage)\n* [License](#License)\n* [Contributing](#Contributing)\n* [Questions](#questions)\n\n## Installation\n${installation}\n\n## Usage\n${usage}\n\n## License\n\n## Contributing\n${contribution}\n\n## Tests\n${testInstructions}\n\n## Questions\nMy email is: ${email}\n\nGithub url can be found here: ${github}`;
}

inquirer
    .prompt([{
            name: "title",
            message: "What is the project title?",
        },
        {
            name: "description",
            message: "Project Description?",
        },
        {
            type: "list",
            name: "license",
            choices: ["MIT", "BSD"],
            message: "what type of license do you need (MIT, BSD, ?",
        },
        {
            type: "list",
            name: "licenseColor",
            choices: ["blue", "red", "yellow", "orange", "green"],
            message: "what color do you want the license to be?",
            default: "blue",
        },
        {
            name: "installation",
            message: "installation instructions?",
        },
        {
            name: "usage",
            message: "usage information?",
        },
        {
            name: "contribution",
            message: "contribution guidelines?",
        },
        {
            name: "testInstructions",
            message: "test instructions?",
        },
        {
            name: "email",
            message: "What is your email?",
        },
        {
            name: "github",
            message: "what is Github Account?",
        },
    ])
    .then(function(answers) {
        return getHtmlOutput(answers);
    })
    .then(function(htmlOutput) {
        return thenableWriteFile("./README.md", htmlOutput);
    })
    .then(function() {
        console.log("All done!");
    })
    .catch(function(error) {
        console.log("Oh noes! An error!", error);
    });