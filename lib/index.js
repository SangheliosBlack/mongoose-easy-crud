#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout 
});

rl.question('Please enter the model name: ',(model)=>{

    const generateRoutes = () => {

        const modelName = model.trim().replace(/\s/g, '');

        const currentDir = process.cwd();
    
        const modelsPath = path.join(currentDir,'src','models');
    
        if (!fs.existsSync(modelsPath)) {
            try {
                fs.mkdirSync(modelsPath, { recursive: true });
                console.log('The "models" folder has been created.');
                console.log('Try again...');
               return;
            } catch (error) {
                console.error('Error creating the "models" folder:', error);
               return;
            }
        }
    
        // Load models
        const modelFile = fs.readdirSync(modelsPath)
            .find(file => file.toLowerCase() === `${modelName.toLowerCase()}.js`);
    
        if (!modelFile) {
            console.error(`The model ${modelName} was not found.`);
            console.log('Try again...');
            rl.close();
            return;
        }
    
        const Model = require(path.join(modelsPath, modelFile));
        const modelFields = Model.getFieldsInfo();
        
        
            const modelNameCamelCase = modelName.charAt(0).toUpperCase() + modelName.slice(1);
    
            
    
            // Generar controlador
            const controllerContent = `const ${modelNameCamelCase} = require('../models/${modelName}');
    const catchAsync = require("../utils/catchAsync");
    const AppError = require('../utils/appError');
    const RequestUtil = require('../utils/requestUtils');
    
    const ${modelNameCamelCase}Controller = {
        getAll${modelNameCamelCase}: catchAsync(async (req, res, next) => {
            try {
                const ${modelNameCamelCase.toLowerCase()} = await ${modelNameCamelCase}.find();
                res.status(200).json(RequestUtil.prepareSingleResponse('success', ${modelNameCamelCase.toLowerCase()}, 'data'));
            } catch (error) {
                next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
            }
        }),
    
        get${modelNameCamelCase}ById: catchAsync(async (req, res, next) => {
            try {
                const ${modelNameCamelCase.toLowerCase()} = await ${modelNameCamelCase}.findById(req.params.id);
                res.status(200).json(RequestUtil.prepareSingleResponse('success', ${modelNameCamelCase.toLowerCase()}, 'data'));
            } catch (error) {
                next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
            }
        }),
    
        createNew${modelNameCamelCase}: catchAsync(async (req, res, next) => {
            try {
                const new${modelNameCamelCase} = new ${modelNameCamelCase}(req.body);
                await new${modelNameCamelCase}.save();
                res.status(200).json(RequestUtil.prepareSingleResponse('success', { ${modelNameCamelCase.toLowerCase()}: new${modelNameCamelCase} }, 'data'));
            } catch (error) {
                next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
            }
        }),
    
        update${modelNameCamelCase}: catchAsync(async (req, res, next) => {
            try {
                const ${modelNameCamelCase.toLowerCase()} = await ${modelNameCamelCase}.findByIdAndUpdate(req.params.id, req.body, { new: true });
                res.status(200).json(RequestUtil.prepareSingleResponse('success', ${modelNameCamelCase.toLowerCase()}, 'data'));
            } catch (error) {
                next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
            }
        }),
    
        delete${modelNameCamelCase}: catchAsync(async (req, res, next) => {
            try {
                await ${modelNameCamelCase}.findByIdAndDelete(req.params.id);
                res.status(200).json(RequestUtil.prepareSingleResponse('success', { ok: true }, 'data'));
            } catch (error) {
                next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
            }
        })
    };
    
    module.exports = ${modelNameCamelCase}Controller;
    `;

            
        const controllerFolderPath = path.join(currentDir,'src','controllers');

            if(!fs.existsSync(controllerFolderPath)){
                try {
                    fs.mkdirSync(controllerFolderPath, { recursive: true });
                    console.log('The "controllers" folder has been created.');
                } catch (error) {
                    console.error('Error creating the "controllers" folder:', error);
                    process.exit(1); 
                }
            }

    
            const controllerPath = path.join(currentDir, 'src','controllers',`${modelName.toLowerCase()}Controller.js`);
            fs.writeFileSync(controllerPath, controllerContent);
    
            console.log(`Controller generated for the model ${modelNameCamelCase}`);
    
            const paramList = modelFields.map(param => {
                return `
     *       - in: path
     *         name: ${param.name}
     *         required: ${param.properties.isRequired}
     *         schema:
     *           type: ${param.properties.instance}`;
              }).join('');
    
            const routerContent = `
    const express = require('express');
    const passport = require('passport');
    const ${modelNameCamelCase}Controller = require('../controllers2/${modelName.toLowerCase()}Controller');
    const checkPermissions = require('../middlewares/checkPermissions');
    const router = express.Router();
    
    router.use(passport.authenticate('jwt', { session: false }));
    
    /**
     * @swagger
     * tags:
     *   name: ${modelNameCamelCase}
     *   description: API endpoints for ${modelNameCamelCase}
     */
    
    /**
     * @swagger
     * /${modelName.toLowerCase()}:
     *   get:
     *     summary: Retrieve a list of ${modelNameCamelCase}
     *     description: Retrieve a list of all ${modelNameCamelCase}
     *     tags: [${modelNameCamelCase}]
     *     responses:
     *       200:
     *         description: A list of ${modelNameCamelCase}
     */
    router.get("/", checkPermissions('read', 'all'), ${modelNameCamelCase}Controller.getAll${modelNameCamelCase});
    
    /**
     * @swagger
     * /${modelName.toLowerCase()}:
     *   post:
     *     summary: Create a new ${modelNameCamelCase}
     *     description: Create a new ${modelNameCamelCase}
     *     tags: [${modelNameCamelCase}]
     *     parameters: ${paramList}
     *     requestBody:
     *       description: ${modelNameCamelCase} data
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/${modelNameCamelCase}'
     *     responses:
     *       200:
     *         description: ${modelNameCamelCase} created successfully
     */
    router.post("/", checkPermissions('read', 'all'), ${modelNameCamelCase}Controller.createNew${modelNameCamelCase});
    
    /**
     * @swagger
     * /${modelName.toLowerCase()}/{id}:
     *   get:
     *     summary: Retrieve a single ${modelNameCamelCase} by ID
     *     description: Retrieve a single ${modelNameCamelCase} by ID
     *     tags: [${modelNameCamelCase}]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: A single ${modelNameCamelCase}
     */
    router.get("/:id", checkPermissions('read', 'all'), ${modelNameCamelCase}Controller.get${modelNameCamelCase}ById);
    
    /**
     * @swagger
     * /${modelName.toLowerCase()}/{id}:
     *   patch:
     *     summary: Update a ${modelNameCamelCase} by ID
     *     description: Update a single ${modelNameCamelCase} by ID
     *     tags: [${modelNameCamelCase}]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     requestBody:
     *       description: ${modelNameCamelCase} data
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/${modelNameCamelCase}'
     *     responses:
     *       200:
     *         description: ${modelNameCamelCase} updated successfully
     */
    router.patch("/:id", checkPermissions('read', 'all'), ${modelNameCamelCase}Controller.update${modelNameCamelCase});
    
    /**
     * @swagger
     * /${modelName.toLowerCase()}/{id}:
     *   delete:
     *     summary: Delete a ${modelNameCamelCase} by ID
     *     description: Delete a single ${modelNameCamelCase} by ID
     *     tags: [${modelNameCamelCase}]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: ${modelNameCamelCase} deleted successfully
     */
    router.delete("/:id", checkPermissions('read', 'all'), ${modelNameCamelCase}Controller.delete${modelNameCamelCase});
    
    module.exports = router;
    `;

            const routerFolderPath = path.join(currentDir,'src','routes');

            if (!fs.existsSync(routerFolderPath)) {
                try {
                    fs.mkdirSync(routerFolderPath, { recursive: true });
                    console.log('The "routes" folder has been created.');
                } catch (error) {
                    console.error('Error creating the "routes" folder:', error);
                    process.exit(1); // Salir con código de error
                }
            }
            
            const routerPath = path.join(currentDir, 'src','routes', `${modelName.toLowerCase()}_Routes.js`);
            fs.writeFileSync(routerPath, routerContent);
    
            console.log(`Routes generated for the model ${modelNameCamelCase}`);
    
            
            
    };
    
    generateRoutes();

});

