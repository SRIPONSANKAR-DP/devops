pipeline {
  agent {
    docker {
      image 'node:18-alpine'
    }
  }

  environment {
    DOCKER_IMAGE = 'sriponsankar/devops'
    TAG = 'latest'
  }

  stages {
    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build App') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Build Docker Image') {
      steps {
        sh 'docker build -t $DOCKER_IMAGE:$TAG .'
      }
    }

    stage('Push to DockerHub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
          sh 'echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin'
          sh 'docker push $DOCKER_IMAGE:$TAG'
        }
      }
    }

    stage('Deploy (optional)') {
      steps {
        sh 'kubectl apply -f deploy.yaml'
      }
    }
  }
}
