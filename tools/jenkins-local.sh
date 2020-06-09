#!/usr/bin/env bash

JENKINS_NAME="jenkins-local"

run(){
  docker container run -d -p 8082:8080 \
  -v dwc:/var/jenkins_home \
  --name $JENKINS_NAME jenkins/jenkins:lts;
}

kill(){
  (docker kill $JENKINS_NAME || true) && (docker rm $JENKINS_NAME || true);
}

getPassword(){
  docker container exec $JENKINS_NAME sh -c "cat /var/jenkins_home/secrets/initialAdminPassword";
}

"$@"
