


pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
                // Install Node.js dependencies
               // sh 'npm install --legacy-peer-deps'
                //sh 'npm install @emotion/react'
                //sh 'npm install --save-dev @babel/plugin-proposal-private-property-in-object --force'
                 sh 'npm install react-firebase@latest --force'
                }
          }       
        }
        /*stage('Lint') {
            steps {
                // Run ESLint to catch issues
                sh 'npx eslint src/ --quiet' // --quiet will only show errors
            }
        }*/
        stage('Build') {
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'SUCCESS') {
            script{  
                // Build the React application
                //sh 'npm run build'
                sh 'CI=false npm run build'
               }
             }          
           }
         }   
stage('Copy Files') {
            steps {
                // Make sure the destination directory exists
                sh 'mkdir -p /var/www/connect'
                // Copy the files using cp, with sudo if necessary
                sh 'cp -r build/ /var/www/connect/'
            }
        }

        stage('Deploy') {
            steps {
                // Deploy the application (this will depend on your deployment strategy)
                echo 'Deploying application...'
                // Add your deployment commands here
            }
        }
    }
    post {
        success {
            echo 'Build and deployment successful!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}

