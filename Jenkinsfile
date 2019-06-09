pipeline {
  agent any
  stages {
    stage('Primary') {
      agent any
      steps {
        git(url: 'https://github.com/HF-Solutions/TPolls', branch: 'master')
        powershell(script: './install.ps1', label: 'Run Install Script', returnStatus: true, returnStdout: true)
      }
    }
  }
}