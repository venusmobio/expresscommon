#!/bin/bash

# Prompt the user for input
# read -p "Enter a dynamic route name: " ROUTE_NAME
# read -p "Enter a dynamic directory name (for controller and validator): " DIRECTORY_NAME
# read -p "Enter a dynamic file name (without extension): " FILE_NAME
ROUTE_NAME=$1
DIRECTORY_NAME=app
FILE_NAME=${ROUTE_NAME}

CAPITALIZED_ROUTE_NAME=$(tr '[:lower:]' '[:upper:]' <<< "${ROUTE_NAME:0:1}")"${ROUTE_NAME:1}"

# Convert ROUTE_NAME to lowercase for case-insensitive comparison
LOWER_CASE_ROUTE_NAME=$(echo "$ROUTE_NAME" | tr '[:upper:]' '[:lower:]')

# ------------------- APPEND NEW ROUTE INTO ROUTE/INDEX.JS FILE --------------------------------------

# Define the route content with dynamic FILE_NAME
ROUTE_CONTENT=$(cat <<EOT
    app.use(\`\${baseRoute}/${ROUTE_NAME}s\`, require('./${FILE_NAME}.route'));
EOT
)

# Check if the route already exists
if grep -q "${LOWER_CASE_ROUTE_NAME}s" "app/routes/index.js"; then
  echo "Route with name '${LOWER_CASE_ROUTE_NAME}' already exists. Exiting..."
  exit 1
fi

# Find the line number of the last app.use statement in the object
LAST_APP_USE_LINE=$(grep -n "app.use" "app/routes/index.js" | tail -n 1 | cut -d: -f1)

# Insert the new route content after the last app.use statement
sed -i "${LAST_APP_USE_LINE} a\\
$ROUTE_CONTENT
" "app/routes/index.js"

# Append the route content to the existing file
# echo "$ROUTE_CONTENT" >> "app/routes/index.js"

echo "Route content appended to routes/index.js for dynamic route name: $ROUTE_NAME."

# Create the directories if they don't exist
mkdir -p "${DIRECTORY_NAME}/controllers"
mkdir -p "${DIRECTORY_NAME}/validators"
mkdir -p "${DIRECTORY_NAME}/routes"

# ------------------- CREATE NEW ROUTE INTO ROUTE/${ROUTE_NAME}.JS FILE --------------------------------------

# Define the route content with dynamic FILE_NAME
ROUTE_CONTENT=$(cat <<EOT
// Require Packages
const express = require('express');
const router = express.Router();
const { checkSchema } = require('express-validator');

// Require Controllers
const ${FILE_NAME}Controller = require('../controllers/${FILE_NAME}.controller');

// Require middlewares
const { validate } = require("../middlewares/validate.middleware");

// Require validators
const ${FILE_NAME}Validator = require("../validators/${FILE_NAME}.validator");

// ${ROUTE_NAME} crud routes
router.get('/', ${FILE_NAME}Controller.list);
router.get('/:id', ${FILE_NAME}Controller.detail);
router.post('/', validate(checkSchema(${FILE_NAME}Validator.create${CAPITALIZED_ROUTE_NAME}Schema)), ${FILE_NAME}Controller.create);
router.put('/:id', ${FILE_NAME}Controller.update);
router.delete('/:id', ${FILE_NAME}Controller.delete);

module.exports = router;
EOT
)

# Create the route file with the provided name and content
echo "$ROUTE_CONTENT" > "${DIRECTORY_NAME}/routes/${FILE_NAME}.route.js"

echo "${DIRECTORY_NAME}/routes/${FILE_NAME}.route.js file created and populated with dynamic route name: $ROUTE_NAME."

# ------------------- CREATE NEW MODEL INTO MODELS/${ROUTE_NAME}.MODEL.JS FILE --------------------------------------

# Define the model content with dynamic MODEL_NAME
MODEL_CONTENT=$(cat <<EOT
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ${LOWER_CASE_ROUTE_NAME}Schema = Schema({
    ${LOWER_CASE_ROUTE_NAME}Name: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    updatedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('${CAPITALIZED_ROUTE_NAME}', ${LOWER_CASE_ROUTE_NAME}Schema);
EOT
)

echo "$MODEL_CONTENT" > "${DIRECTORY_NAME}/models/${LOWER_CASE_ROUTE_NAME}.model.js"

echo "Model file ${DIRECTORY_NAME}/models/${LOWER_CASE_ROUTE_NAME}.model.js created and populated with dynamic model name: $ROUTE_NAME."

# ------------------- CREATE NEW CONTROLLER INTO CONTROLLERS/${ROUTE_NAME}.CONTROLLER.JS FILE --------------------------------------

# Create the controller file with the provided name and content
CONTROLLER_CONTENT=$(cat <<EOT
// Controller logic for ${ROUTE_NAME}

// constants
const constants = require("../utils/constants.util");
const commonService = require("../services/common.service");

/*
    ${CAPITALIZED_ROUTE_NAME} List
    API URL = /${ROUTE_NAME}
    Method = GET
*/
exports.list = async (req, res, next) => {
  try {
    const ${ROUTE_NAME}List = await commonService.operations("${ROUTE_NAME}", "list");
    return res.json({
      status: true,
      message: constants.message(constants.${ROUTE_NAME}Module, "List"),
      data: ${ROUTE_NAME}List,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: constants.message(constants.${ROUTE_NAME}Module, "List", false),
      error: error,
    });
  }
};

/*
    ${CAPITALIZED_ROUTE_NAME} Detail
    API URL = /${ROUTE_NAME}/:id
    Method = GET
*/
exports.detail = async (req, res) => {
  try {
    const ${ROUTE_NAME}Detail = await commonService.operations("${ROUTE_NAME}", "detail", {
      id: req.params.id,
    });
    return res.json({
      status: true,
      message: constants.message(constants.${ROUTE_NAME}Module, "Detail"),
      data: ${ROUTE_NAME}Detail,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: constants.message(constants.${ROUTE_NAME}Module, "Detail", false),
      error: error,
    });
  }
};

/*
    ${CAPITALIZED_ROUTE_NAME} Create
    API URL = /${ROUTE_NAME}
    Method = POST
*/
exports.create = async (req, res) => {
  try {
    const created${CAPITALIZED_ROUTE_NAME} = await commonService.operations(
      "${ROUTE_NAME}",
      "create",
      req.body
    );
    return res.json({
      status: true,
      message: constants.message(constants.${ROUTE_NAME}Module, "Create"),
      data: created${CAPITALIZED_ROUTE_NAME},
    });
  } catch (error) {
    return res.json({
      status: false,
      message: constants.message(constants.${ROUTE_NAME}Module, "Create", false),
      error: error,
    });
  }
};

/*
    ${CAPITALIZED_ROUTE_NAME} Update
    API URL = /${ROUTE_NAME}/:id
    Method = PUT
*/
exports.update = async (req, res) => {
  try {
    await commonService.operations("${ROUTE_NAME}", "update", req.body);
    return res.json({
      status: true,
      message: constants.message(constants.${ROUTE_NAME}Module, "Update"),
    });
  } catch (error) {
    return res.json({
      status: false,
      message: constants.message(constants.${ROUTE_NAME}Module, "Update", false),
      error: error,
    });
  }
};

/*
    ${CAPITALIZED_ROUTE_NAME} Delete
    API URL = /${ROUTE_NAME}/:id
    Method = DELETE
*/
exports.delete = async (req, res) => {
  try {
    await commonService.operations("${ROUTE_NAME}", "delete", { id: req.params.id });
    return res.json({
      status: true,
      message: constants.message(constants.${ROUTE_NAME}Module, "Delete"),
    });
  } catch (error) {
    return res.json({
      status: false,
      message: constants.message(constants.${ROUTE_NAME}Module, "Delete", false),
      error: error,
    });
  }
};
EOT
)

echo "$CONTROLLER_CONTENT" > "${DIRECTORY_NAME}/controllers/${FILE_NAME}.controller.js"

echo "${DIRECTORY_NAME}/controllers/${FILE_NAME}.controller.js file created and populated for controller logic."

# ------------------- APPEND MODELNAME INTO UTILS/CONSTANTS.UTIL.JS FILE --------------------------------------

# Define the constants content with dynamic FILE_NAME
CONSTANT_CONTENT=$(cat <<EOT
    ${FILE_NAME}Module: '${CAPITALIZED_ROUTE_NAME}',
EOT
)

# Find the line number of the last Module statement in the object
LAST_APP_USE_LINE=$(grep -n "Module" "app/utils/constants.util.js" | tail -n 1 | cut -d: -f1)

# Insert the new route content after the last Module statement
sed -i "${LAST_APP_USE_LINE} a\\
$CONSTANT_CONTENT
" "app/utils/constants.util.js"

echo "Constant content appended to utils/constants.util.js for dynamic route name: $ROUTE_NAME."

# ------------------- CREATE NEW SERVICE INTO SERVICES/${ROUTE_NAME}.SERVICE.JS FILE --------------------------------------

# Define the service content with dynamic ROUTE_NAME
SERVICE_CONTENT=$(cat <<EOT
const ${CAPITALIZED_ROUTE_NAME}Model = require('../models/${LOWER_CASE_ROUTE_NAME}.model.js')
exports.findByName = async (name) => {
    return await ${CAPITALIZED_ROUTE_NAME}Model.findOne({${LOWER_CASE_ROUTE_NAME}Name: name})
}
EOT
)

echo "$SERVICE_CONTENT" > "${DIRECTORY_NAME}/services/${LOWER_CASE_ROUTE_NAME}.service.js"

echo "Service file ${DIRECTORY_NAME}/services/${LOWER_CASE_ROUTE_NAME}.service.js created and populated with dynamic model name: $ROUTE_NAME."

# ------------------- CREATE NEW VALIDATOR INTO VALIDATORS/${ROUTE_NAME}.VALIDATOR.JS FILE --------------------------------------

# Create the validator file with the provided name and content
VALIDATOR_CONTENT=$(cat <<EOT
const { body } = require('express-validator');

exports.create${CAPITALIZED_ROUTE_NAME}Schema = [
  // Your validation rules here
];
EOT
)

echo "$VALIDATOR_CONTENT" > "${DIRECTORY_NAME}/validators/${FILE_NAME}.validator.js"

echo "${DIRECTORY_NAME}/validators/${FILE_NAME}.validator.js file created and populated for validator logic."

