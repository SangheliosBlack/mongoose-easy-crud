# mongoose-easy-crud

Mongoose Easy CRUD is a utility library for simplifying CRUD (Create, Read, Update, Delete) operations with Mongoose in MongoDB.

[![npm version](https://badge.fury.io/js/mongoose-easy-crud.svg)](https://www.npmjs.com/package/mongoose-easy-crud)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)



[![npm](https://nodei.co/npm/mongoose-easy-crud.png)](https://www.npmjs.com/package/https://www.npmjs.com/package/mongoose-easy-crud)

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Installation

First install [Node.js](http://nodejs.org/) and [MongoDB](https://www.mongodb.org/downloads). Then:

```bash
npm install -g mongoose-easy-crud
```

## Usage

Create a Mongoose model with the required structure. For example, let's create an "Auto" model:

```javascript
// Auto.js

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const AutoSchema = Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

AutoSchema.statics.getFieldsInfo = function () {
  return Object.keys(this.schema.paths).map((field) => ({
    name: field,
    properties: this.schema.paths[field],
  }));
};

const Auto = model("Autos", AutoSchema);

module.exports = Auto;

```

Now, you can use mongoose-easy-crud to simplify CRUD operations with your Mongoose models.

```sh
generate-crud auto
```


## Configuration

To use `mongoose-easy-crud`, ensure your project has the following folder structure:

- **`project-root/`**: Your project's root directory.
- **`src/`**: The source folder that holds your application's code.
  - **`models/`**: A subfolder where you store your Mongoose model files.
    - **`YourModel.js`**: Example Mongoose model file.

## Contributing

Thank you for considering contributing to Mongoose Easy CRUD! Contributions are highly appreciated.

### How to Contribute

1. Fork the repository.
2. Clone your forked repository: `git clone https://github.com/your-username/mongoose-easy-crud.git`.
3. Install dependencies: `npm install`.
4. Create a new branch for your feature: `git checkout -b feature/your-feature`.
5. Make your changes and test them thoroughly.
6. Commit your changes: `git commit -m 'Add your feature'`.
7. Push your branch to your forked repository: `git push origin feature/your-feature`.
8. Submit a pull request.

### Coding Guidelines

Please follow the coding guidelines outlined in the project. If in doubt, refer to the [CONTRIBUTING.md](CONTRIBUTING.md) file.

### Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project, you agree to abide by its terms.

Thank you for contributing to Mongoose Easy CRUD!

## License

This project is licensed under the [MIT License](LICENSE.md) - see the [LICENSE.md](LICENSE.md) file for details.

