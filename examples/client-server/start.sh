#!/bin/bash
# shellcheck disable=SC1090
CURRENT_PATH=$(
    cd "$(dirname "${BASH_SOURCE[0]}")" || exit
    pwd -P
)
C_RED='\033[0;31m'
C_GREEN='\033[0;32m'
C_RESET='\033[0m'

function error() {
    echo -e "${C_RED}ERROR: ${1}${C_RESET}"
    exit -1
}

function message() {
    echo -e "${C_GREEN}${1}${C_RESET}"
}

message "---------------------------------------------------"
message "Starting the server: "
message "---------------------------------------------------"
pushd "$CURRENT_PATH/server/" || error "Unable to change to the project folder."
npm run start-server &
popd || error "Unable to get back to root folder."

message "---------------------------------------------------"
message "Starting the client: "
message "---------------------------------------------------"
pushd "$CURRENT_PATH/client/" || error "Unable to change to the project folder."
npm install && npm start
popd || error "Unable to get back to root folder."

message "---------------------------------------------------"
message "Finished"
message "---------------------------------------------------"