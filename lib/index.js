#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const readline = require("readline");
const controllerContent = require("./utils/controller_template");
const routerContent = require("./utils/routes_template");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const generateRoutes = async (modelName) => {
  const currentDir = process.cwd();
  const modelsPath = path.join(currentDir, "src", "models");
  const controllerFolderPath = path.join(currentDir, "src", "controllers");
  const routerFolderPath = path.join(currentDir, "src", "routes");

  // Create the "models" folder if it doesn't exist
  if (!fs.existsSync(modelsPath)) {
    try {
      fs.mkdirSync(modelsPath, { recursive: true });
      console.log('The "models" folder has been created.');
    } catch (error) {
      console.error('Error creating the "models" folder:', error);
      return;
    }
  }

  // Search for the model file
  const modelFile = fs
    .readdirSync(modelsPath)
    .find((file) => file.toLowerCase() === `${modelName.toLowerCase()}.js`);

  if (!modelFile) {
    console.error(`The model ${modelName} was not found.`);
    console.log("Try again...");
    rl.close();
    return;
  }

  const Model = require(path.join(modelsPath, modelFile));
  const modelFields = Model.getFieldsInfo();

  // Create the "controllers" folder if it doesn't exist
  if (!fs.existsSync(controllerFolderPath)) {
    try {
      fs.mkdirSync(controllerFolderPath, { recursive: true });
      console.log('The "controllers" folder has been created.');
    } catch (error) {
      console.error('Error creating the "controllers" folder:', error);
      process.exit(1);
    }
  }

  // Write the controller file
  const controllerFile = controllerContent(modelName);
  const controllerPath = path.join(
    controllerFolderPath,
    `${modelName.toLowerCase()}Controller.js`
  );
  fs.writeFileSync(controllerPath, controllerFile);

  // Create the "routes" folder if it doesn't exist
  if (!fs.existsSync(routerFolderPath)) {
    try {
      fs.mkdirSync(routerFolderPath, { recursive: true });
      console.log('The "Routes" folder has been created.');
    } catch (error) {
      console.error('Error creating the "Routes" folder:', error);
      process.exit(1);
    }
  }

  // Write the routes file
  const routerFile = routerContent(modelName, modelFields);
  const routerPath = path.join(
    routerFolderPath,
    `${modelName.toLowerCase()}Routes.js`
  );
  fs.writeFileSync(routerPath, routerFile);

  console.log(`Routes generated for the model ${modelName}`);
};

rl.question("Please enter the model name: ", (modelName) => {
  generateRoutes(modelName.trim().replace(/\s/g, ""));
  rl.close();
});