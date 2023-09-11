#!/bin/bash

# Prompt the user for input
# read -p "Enter a validator name which you want to add service: " VALIDATOR_NAME
VALIDATOR_NAME=$1

CAPITALIZED_VALIDATOR_NAME=$(tr '[:lower:]' '[:upper:]' <<< "${VALIDATOR_NAME:0:1}")"${VALIDATOR_NAME:1}"

# Define the validator content with dynamic FILE_NAME
VALIDATOR_CONTENT=$(cat <<EOT
const constants = require("../utils/constants.util");

/* create ${VALIDATOR_NAME} schema */
exports.create${CAPITALIZED_VALIDATOR_NAME}Schema = {
  ${VALIDATOR_NAME}Name: {
    notEmpty: true,
    errorMessage: constants.cantBeEmpty("${CAPITALIZED_VALIDATOR_NAME} name"),
  },
};

EOT
)

echo ${VALIDATOR_CONTENT} > app/validators/${VALIDATOR_NAME}.validator.js


echo "Validator created into validators folder with dynamic validator name: $VALIDATOR_NAME."