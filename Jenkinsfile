pipeline {
  agent any
  stages {
    stage('Primary') {
      agent any
      steps {
        powershell(script: './install.ps1', label: 'Run Install Script', returnStatus: true, returnStdout: true)
      }
    }
  }
}