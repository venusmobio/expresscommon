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
while [[ $# -gt 0 ]]; do
    FIELD_ARG="$1"
    shift  # Move to the next argument

    # Split the FIELD_ARG into field name, field type, and possibly reference
    IFS=':' read -ra FIELD_INFO <<< "$FIELD_ARG"
    FIELD_NAME="${FIELD_INFO[0]}"
    FIELD_TYPE="${FIELD_INFO[1]}"
    REF_PROPERTY=""

    # If there's a reference, adjust properties accordingly
    if [[ "${FIELD_INFO[2]}" == "ref" ]]; then
        REF_MODEL="${FIELD_INFO[3]}"
        FIELD_TYPE="mongoose.Schema.Types.ObjectId"
        REF_PROPERTY="ref: '$REF_MODEL',"
    fi

    MODEL_CONTENT+="    $FIELD_NAME: { type: $FIELD_TYPE, $REF_PROPERTY },\n"
done

MODEL_CONTENT+="}, { timestamps: true });\n\n"
MODEL_CONTENT+="module.exports = mongoose.model('${CAPITALIZED_MODEL_NAME}', ${MODEL_NAME}Schema);"

# Write the model content to the file
echo -e "$MODEL_CONTENT" > "app/models/${MODEL_NAME}.model.js"

echo "Express model ${MODEL_NAME} created successfully!" with ObjectId field