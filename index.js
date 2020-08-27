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
    const email = answers.email;
    const github = answers.github;
    return `# ${title}

    # Description
    
    ${description}
    
    ## Table of Contents
    
    ## Installation
    
    ${installation}
    
    ## Usage
    
    ${usage}
    
    ## License
    
    ## Contributing
    
    ${contribution}
    
    ## Tests
    
    ${testInstructions}
    
    ## Questions
    
    ${email}
    ${email}`;
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

// function test(answers) {
//     const name = answers.name;
//     const location = answers.location;
//     const bio = answers.bio;
//     const githubUserName = answers.githubUserName;
//     const linkedInUserName = answers.linkedinUserName;
//     return `<!DOCTYPE html>
//     <html lang="en">
//     <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
//         <title>Portfolio</title>
//     </head>
//     <body>
//         <div class="container">
//             <div id="basics" aria-label="Basic information">
//                 <h3>${name}</h3>
//                 <p>Location: ${location}</p>
//             </div>
//             <div id="bio" aria-labelledby="#bio-header">
//                 <h3 id="bio-header">Bio</h3>
//                 <p>
//                     ${bio}
//                 </p>
//             </div>
//             <div id="on-the-web" aria-labelledby="#on-the-web-header">
//                 <h3>On The Web</h3>
//                 <ul>
//                     <li>Github: <a href="https://www.github.com/${githubUserName}">${githubUserName}</a></li>
//                     <li>LinkedIn: <a href="https://www.linkedin.com/in/${linkedInUserName}/">${linkedInUserName}</a></li>
//                 </ul>
//             </div>
//         </div>
//     </body>
//     </html>`;
// }