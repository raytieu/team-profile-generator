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
    addEmployee();
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
    const engineer = new Engineer(data.engineerName, data.engineerId, data.engineerEmail, data.engineerOffice);
    team.push(engineer);
    addEmployee();
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
      name: "internOffice",
      message: "Intern's School:"
    }
  ]).then(function(data) {
    const intern = new Intern(data.internName, data.internId, data.internEmail, data.internOffice);
    team.push(intern);
    addEmployee();
  });
}

function addEmployee() {
  inquirer.prompt([
    {
      type: "list",
      name: "addPerson",
      message: "Add an employee, or select finish.",
      choices: [
        "Manager",
        "Engineer",
        "Intern",
        "Finish"
      ]
    }
  ]).then(function(data) {
    const employeeRole = data.addPerson;
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

function renderTeam() {
  fs.writeFile(outputPath, render(team), "utf-8", function(error, data) {
    if (error) {
      throw error;
    }

    console.log("Successfully rendered team!");

  })
}

function init() {
  addEmployee();
}

init();


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
