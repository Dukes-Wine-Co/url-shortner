#!/usr/bin/env bash

source env.sh;

JENKINS_NAME="jenkins-local";
NGROK_INSTALL="ngrok-install.zip";

run(){
  docker container run -d -p 8082:8080 \
  -v dwc:/var/jenkins_home \
  --name $JENKINS_NAME jenkins/jenkins:lts;
}

kill(){
  (docker kill $JENKINS_NAME || true) && (docker rm $JENKINS_NAME || true);
}

runTunnel(){
  docker exec -d ${JENKINS_NAME} ./ngrok http 8080 -subdomain="${NGROK_SUBDOMAIN}";
}

addNgrok(){
    docker cp ngrok/${NGROK_INSTALL}- ${JENKINS_NAME}:/;
    docker exec -it ${JENKINS_NAME} unzip ${NGROK_INSTALL};
    docker exec -it ${JENKINS_NAME} ./ngrok authtoken ${NGROK_AUTH_TOKEN};
}

getPassword(){
  docker container exec $JENKINS_NAME sh -c "cat /var/jenkins_home/secrets/initialAdminPassword";
}

"$@"
