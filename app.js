const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const team = [];
addToTeam();

function addToTeam() {
  inquirer.prompt([
    {
      type: "list",
      name: "addEmployee",
      message: "Add an employee, or select 'Finish'.",
      choices: [
        "Manager",
        "Engineer",
        "Intern",
        "Finish"
      ]
    }
  ]).then(function(data) {
    const employeeRole = data.addEmployee;
    if (employeeRole === "Manager") {
      managerInfo();
    }
    else if (employeeRole === "Engineer") {
      engineerInfo();
    }
    else if (employeeRole === "Intern") {
      internInfo();
    }
    else if (employeeRole === "Finish") {
      renderTeam();
    }

  });
}

function managerInfo() {
  inquirer.prompt([
    {
      type: "input",
      name: "managerName",
      message: "Manager's Name:"
    },
    {
      type: "input",
      name: "managerId",
      message: "Manager's ID:"
    },
    {
      type: "input",
      name: "managerEmail",
      message: "Manager's E-mail:"
    },
    {
      type: "input",
      name: "managerOffice",
      message: "Manager's Office Number:"
    }
  ]).then(function(data) {
    const manager = new Manager(data.managerName, data.managerId, data.managerEmail, data.managerOffice);
    team.push(manager);
    addToTeam();
  });
}

function engineerInfo() {
  inquirer.prompt([
    {
      type: "input",
      name: "engineerName",
      message: "Engineer's Name:"
    },
    {
      type: "input",
      name: "engineerId",
      message: "Engineer's ID:"
    },
    {
      type: "input",
      name: "engineerEmail",
      message: "Engineer's E-mail:"
    },
    {
      type: "input",
      name: "engineerGithub",
      message: "Engineer's Github username:"
    }
  ]).then(function(data) {
    const engineer = new Engineer(data.engineerName, data.engineerId, data.engineerEmail, data.engineerGithub);
    team.push(engineer);
    addToTeam();
  });
}

function internInfo() {
  inquirer.prompt([
    {
      type: "input",
      name: "internName",
      message: "Intern's Name:"
    },
    {
      type: "input",
      name: "internId",
      message: "Intern's ID:"
    },
    {
      type: "input",
      name: "internEmail",
      message: "Intern's E-mail:"
    },
    {
      type: "input",
      name: "internSchool",
      message: "Intern's School:"
    }
  ]).then(function(data) {
    const intern = new Intern(data.internName, data.internId, data.internEmail, data.internSchool);
    team.push(intern);
    addToTeam();
  });
}

function renderTeam() {
  fs.writeFile(outputPath, render(team), "utf-8", function(error, data) {
    if (error) {
      throw error;
    }

    console.log("Successfully rendered team!");

  })
}
