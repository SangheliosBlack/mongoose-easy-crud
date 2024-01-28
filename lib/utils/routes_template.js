function routerContent(modelName,modelFields){

    const modelNameCamelCase = modelName.charAt(0).toUpperCase() + modelName.slice(1);

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

    return routerContent;

}   

module.exports = routerContent;