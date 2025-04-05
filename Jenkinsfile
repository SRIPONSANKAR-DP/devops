pipeline {
    agent any

    environment {
        FRONTEND_IMAGE_NAME = "portfolio-frontend"
        IMAGE_TAG           = "latest"
        DOCKER_REPO         = "sriponsankar"
        KUBECONFIG          = "/var/lib/jenkins/.kube/config"
        SHANDEEP_HOME       = "/home/sps"
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    git branch: 'main', url: 'https://github.com/SRIPONSANKAR-DP/devops.git'
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                script {
                    dockerImageFrontend = docker.build("${DOCKER_REPO}/${FRONTEND_IMAGE_NAME}:${IMAGE_TAG}", "./build")
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credential', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    script {
                        sh 'docker login -u $DOCKER_USER -p $DOCKER_PASS'
                        dockerImageBackend.push("${IMAGE_TAG}")
                        dockerImageFrontend.push("${IMAGE_TAG}")
                    }
                }
            }
        }

        stage('Setup Kubeconfig') {
    steps {
        script {
            sh """
                sudo mkdir -p /var/lib/jenkins/.kube
                sudo mkdir -p /var/lib/jenkins/.minikube/profiles/minikube

                # Copy kubeconfig and required certs from sps user
                sudo cp /home/sps/.kube/config /var/lib/jenkins/.kube/
                sudo cp /home/sps/.minikube/ca.crt /var/lib/jenkins/.minikube/
                sudo cp /home/sps/.minikube/profiles/minikube/client.crt /var/lib/jenkins/.minikube/profiles/minikube/
                sudo cp /home/sps/.minikube/profiles/minikube/client.key /var/lib/jenkins/.minikube/profiles/minikube/

                # Fix ownership
                sudo chown -R jenkins:jenkins /var/lib/jenkins/.kube /var/lib/jenkins/.minikube

                # Rewrite kubeconfig paths
                sudo sed -i 's|/home/sps/.minikube|/var/lib/jenkins/.minikube|g' /var/lib/jenkins/.kube/config
            """
        }
    }
}



        stage('Deploy to Minikube') {
            steps {
                script {
                    withEnv(["KUBECONFIG=${KUBECONFIG}"]) {
                        sh 'kubectl apply -f deploy.yaml --validate=false'
                    }
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                script {
                    withEnv(["KUBECONFIG=${KUBECONFIG}"]) {
                        sh 'kubectl get pods'
                        sh 'kubectl get svc'
                    }
                }
            }
        }
    }

    post {
        always {
            echo "Pipeline execution completed."
        }
        failure {
            echo "Pipeline failed. Check logs above for details."
        }
        success {
            echo "Pipeline ran successfully. Deployment complete!"
        }
    }
}
