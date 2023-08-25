#!/bin/bash

# Extract the model name from the arguments
MODEL_NAME="$1"
shift  # Remove the first argument (model_name) from the list

# Create a new directory for the model if it doesn't exist
# mkdir -p models

CAPITALIZED_MODEL_NAME=$(tr '[:lower:]' '[:upper:]' <<< "${MODEL_NAME:0:1}")"${MODEL_NAME:1}"

# Generate the model file content
MODEL_CONTENT="const mongoose = require('mongoose');\n\n"
MODEL_CONTENT+="const ${MODEL_NAME}Schema = new mongoose.Schema({\n"

# Loop through the remaining arguments and generate fields
for FIELD_ARG in "$@"; do
    IFS=':' read -ra FIELD_INFO <<< "$FIELD_ARG"
    FIELD_NAME="${FIELD_INFO[0]}"
    FIELD_TYPE="${FIELD_INFO[1]}"
    MODEL_CONTENT+="    $FIELD_NAME: { type: $FIELD_TYPE },\n"
done

MODEL_CONTENT+="}, { timestamps: true });\n\n"
MODEL_CONTENT+=`echo "module.exports = mongoose.model('${CAPITALIZED_MODEL_NAME}', ${MODEL_NAME}Schema);"`

# Write the model content to the file
echo -e "$MODEL_CONTENT" > "app/models/${MODEL_NAME}.model.js"

echo "Express model ${MODEL_NAME} created successfully!"