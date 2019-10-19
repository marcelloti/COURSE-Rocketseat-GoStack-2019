const express = require('express');
const server = express();
server.use(express.json());

const projects = [];

let counter = 0;

// Global middleware
server.use((req, res, next) => {
  counter++;
  console.log(`Requests counter: ${counter}`);
  next();
});

/**
 * Checks if project exists
 */
function projectExists(req, res, next){

  let indexToChange = projects.findIndex(x => x.id === parseInt(req.params.index));

  if (indexToChange < 0){
    return res.status(400).json({ error: "Project does not exists. Details: "+JSON.stringify(projects)});
  }

  req.projectIndex = indexToChange;

  return next();
}

/**
 * Insert an project inside the projects array
 */
server.post('/projects', (req, res) => {
  const { id, title } = req.body;

  projects.push({ 
    id,
    title,
    tasks: [] 
  });

  return res.json(projects);
});

/**
 * Get all projects array
 */
server.get('/projects', (req, res) => {
  return res.json(projects);
});

/**
 * Update a project
 */
server.put('/projects/:index', projectExists, (req, res) => {
  const { index } = req.params;
  const { title } = req.body;

  console.log(req.projectIndex, projects);
  projects[req.projectIndex].title = title;

  return res.json(projects);
});

/**
 * Removes a project from array
 */
server.delete('/projects/:index', projectExists, (req, res) => {
  const { index } = req.params;
  projects.splice(index, 1);
  return res.json(projects);
});


/**
 * Insert a task in a project
 */
server.post('/projects/:index/tasks', projectExists, (req, res) => {
  const { index } = req.params;
  const { title } = req.body;

  projects[index].tasks.push(title);

  return res.json(project[index]);
});

server.listen(3000);