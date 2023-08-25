#!/bin/bash

# Prompt the user for input
# read -p "Enter a service name which you want to add service: " SERVICE_NAME
SERVICE_NAME=$1

# Define the service content with dynamic FILE_NAME
SERVICE_CONTENT=$(cat <<EOT
exports.findByName = async (name) => {
    // write your logic here....
}
EOT
)

# Check if the service already exists
if grep -q "${SERVICE_CONTENT}" "app/services/${SERVICE_NAME}.service.js"; then
  echo "Service with name '${SERVICE_NAME}' already exists. Exiting..."
  exit 1
fi

echo ${SERVICE_CONTENT} > app/services/${SERVICE_NAME}.service.js


echo "Service created into services folder with dynamic service name: $SERVICE_NAME."