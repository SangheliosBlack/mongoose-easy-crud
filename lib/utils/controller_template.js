function controllerContent (modelName){

    const modelNameCamelCase = modelName.charAt(0).toUpperCase() + modelName.slice(1);

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

  return controllerContent;

}

module.exports = controllerContent;