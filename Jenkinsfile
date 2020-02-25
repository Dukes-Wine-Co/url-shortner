pipeline {
  agent any

  tools {nodejs "node"}

  stages {

    stage('Cloning Git') {
      steps {
        git 'https://github.com/Dukes-Wine-Co/url-shortner'
      }
    }

    stage('Install dependencies') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Test') {
      steps {
         sh 'npm test:unit'
      }
    }
  }
}
