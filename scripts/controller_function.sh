#!/bin/bash

# Prompt the user for input
# read -p "Enter a dynamic function name: " FUNCTION_NAME
# read -p "Enter a controller name which you want to add function: " CONTROLLER_NAME
# METHOD_NAME=$1
CONTROLLER_NAME=$1
FUNCTION_NAME=$2

# Define the controller function content with dynamic FILE_NAME
CONTROLLER_FUNCTION_CONTENT=$(cat <<EOT
exports.${FUNCTION_NAME} = async (req, res) => {
    try {
        return res.json({
            status: true,
            message: constants.message(constants.${CONTROLLER_NAME}Module, '${FUNCTION_NAME}'),
        });
    } catch(error) {
        return res.json({
            status: false,
            message: constants.message(constants.${CONTROLLER_NAME}Module, '${FUNCTION_NAME}', false),
            error,
        });
    }
}
EOT
)

# Check if the function name already exists
if grep -q "${FUNCTION_NAME}" "app/controllers/${CONTROLLER_NAME}.controller.js"; then
  echo "Function with name '${FUNCTION_NAME}' already exists. Exiting..."
  exit 1
fi

# Find the line number of the last curly braces statement in the object
# LAST_APP_USE_LINE=$(grep -n "}" "app/controllers/${CONTROLLER_NAME}.controller.js" | tail -n 1 | cut -d: -f1)
echo ${CONTROLLER_FUNCTION_CONTENT} >> app/controllers/${CONTROLLER_NAME}.controller.js
# Insert the new function content after the last } statement
# sed -i "${LAST_APP_USE_LINE} a\\
# $CONTROLLER_FUNCTION_CONTENT" "app/controllers/${CONTROLLER_NAME}.controller.js"

echo "Function appended to controllers/${CONTROLLER_NAME}.controller.js for dynamic function name: $FUNCTION_NAME."