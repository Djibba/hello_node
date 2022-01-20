pipeline {
    agent any 
    stages {

         stage("build & SonarQube analysis") {
          node {
              withSonarQubeEnv('sonarserver') {
                 sh 'mvn clean package sonar:sonar'
              }
          }
      }

      stage("Quality Gate"){
          timeout(time: 1, unit: 'HOURS') {
              def qg = waitForQualityGate()
              if (qg.status != 'OK') {
                  error "Pipeline aborted due to quality gate failure: ${qg.status}"
              }
          }
      }
        // stage('Quality Gate Status check') {
        //     steps {
        //         script{
        //             withSonarQubeEnv('sonarserver')
        //             sh "mvn sonar:sonar"
                
        //         timeout(time: 1, unit: 'HOURS'){
        //             def qg = waitForQualityGate()
        //                 if (qg.status != 'OK'){
        //                     error "Pipeline aborted due to quality gate failure: \$(qg.status)"
        //                 }
        //             }
        //             sh 'mvn clean install'
        //         }
        //     }
        // }
    }
}


