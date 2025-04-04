#!/bin/bash

# Variables
IMAGE_NAME="sriponsankar/devops"
TAG="latest"

# Optional Docker login (only needed if pushing from CI or private repos)
# echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

echo "🛠️  Installing dependencies..."
npm install

echo "📦  Building React app..."
npm run build

echo "🐳  Building Docker image..."
docker build -t $IMAGE_NAME:$TAG .

echo "📤  Pushing Docker image to DockerHub..."
docker push $IMAGE_NAME:$TAG

echo "✅  Docker image pushed: $IMAGE_NAME:$TAG"
