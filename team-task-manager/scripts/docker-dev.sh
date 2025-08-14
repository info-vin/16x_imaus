#!/bin/bash

# A simple script to manage the docker-compose development environment.

# Function to show usage
usage() {
  echo "Usage: $0 {up|down}"
  echo "  up: Starts the services in detached mode, builds images if necessary."
  echo "  down: Stops and removes the containers, network."
}

# Check for argument
if [ -z "$1" ]; then
  usage
  exit 1
fi

# Change to the script's directory to ensure docker-compose.yml is found
cd "$(dirname "$0")/.."

# Main command logic
case "$1" in
  up)
    echo "Starting up development environment..."
    docker-compose up -d --build
    ;;
  down)
    echo "Tearing down development environment..."
    docker-compose down
    ;;
  *)
    usage
    exit 1
    ;;
esac
