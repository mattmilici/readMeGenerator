const fs = require("fs");
const util = require("util");
const inquirer = require("inquirer");
const thenableWriteFile = util.promisify(fs.writeFile);

function getHtmlOutput(answers) {
    const name = answers.name;
    const location = answers.location;
    const bio = answers.bio;
    const githubUserName = answers.githubUserName;
    const linkedInUserName = answers.linkedinUserName;
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <title>Portfolio</title>
</head>
<body>
    <div class="container">
        <div id="basics" aria-label="Basic information">
            <h3>${name}</h3>
            <p>Location: ${location}</p>
        </div>
        <div id="bio" aria-labelledby="#bio-header">
            <h3 id="bio-header">Bio</h3>
            <p>
                ${bio}
            </p>
        </div>
        <div id="on-the-web" aria-labelledby="#on-the-web-header">
            <h3>On The Web</h3>
            <ul>
                <li>Github: <a href="https://www.github.com/${githubUserName}">${githubUserName}</a></li>
                <li>LinkedIn: <a href="https://www.linkedin.com/in/${linkedInUserName}/">${linkedInUserName}</a></li>
            </ul>
        </div>
    </div>
</body>
</html>`;
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
        return thenableWriteFile("./portfolio.html", htmlOutput);
    })
    .then(function() {
        console.log("All done!");
    })
    .catch(function(error) {
        console.log("Oh noes! An error!", error);
    });

// WHEN I choose a license for my application from a list of options
// THEN a badge for that license is added hear the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under
// WHEN I enter my GitHub username
// THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile
// WHEN I enter my email address
// THEN this is added to the section of the README entitled Questions, with instructions on how to reach me with additional questions
// WHEN I click on the links in the Table of Contents
// THEN I am taken to the corresponding section of the README
// ```