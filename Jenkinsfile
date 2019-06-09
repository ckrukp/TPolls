pipeline {
  agent any
  stages {
    stage('Primary') {
      agent any
      steps {
        git(url: 'https://github.com/HF-Solutions/TPolls', branch: 'master')
        nodejs 'recent node'
        sh 'npm install'
      }
    }
  }
}