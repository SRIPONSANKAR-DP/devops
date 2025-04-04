pipeline {
  agent any
  environment {
    DOCKER_IMAGE = 'sriponsankar/devops'
  }
  stages {
    stage('Install Dependencies') {
      agent {
        docker {
          image 'node:18-alpine'
        }
      }
      steps {
        sh 'rm -rf node_modules package-lock.json'
        sh 'npm install'
      }
    }

    stage('Build React App') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Build Docker Image') {
      steps {
        sh 'docker build -t $DOCKER_IMAGE:latest .'
      }
    }

    stage('Push to DockerHub') {
      steps {
        withDockerRegistry([credentialsId: 'dockerhub-creds', url: '']) {
          sh 'docker push $DOCKER_IMAGE:latest'
        }
      }
    }

    stage('Deploy') {
      steps {
        sh 'kubectl apply -f deploy.yaml'
      }
    }
  }
}
