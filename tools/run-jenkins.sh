docker container run -d \
    -p 8082:8080 \
    -v dwc:/var/jenkins_home \
    --name jenkins-local \
    jenkins/jenkins:lts
