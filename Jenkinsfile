pipeline {
    agent any

    stages {
        stage('Build') {
            agent {
                docker {
                    image 'node:22'
                }
            }
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Test') {
            agent {
                docker {
                    image 'node:22'
                }
            }
            steps {
                sh 'npm test -- --watchAll=false'
                sh 'test -f build/index.html'
            }
        }

        stage('AWS') {
            agent {
                docker {
                    image 'amazon/aws-cli'
                    args '--entrypoint=""'
                    reuseNode true
                }
            }
            steps {
                withCredentials([usernamePassword(credentialsId: 'aws-s3-credentials', usernameVariable: 'AWS_ACCESS_KEY_ID', passwordVariable: 'AWS_SECRET_ACCESS_KEY')]) {
                    sh 'aws s3 sync build/ s3://victor-react-app-20260327 --delete'
                }
            }
        }
    }
}