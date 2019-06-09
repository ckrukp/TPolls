pipeline {
  agent {
    node {
      label 'Node'
    }

  }
  stages {
    stage('Primary') {
      agent any
      steps {
        git(url: 'https://github.com/HF-Solutions/TPolls', branch: 'master')
        sh 'npm install'
      }
    }
  }
}