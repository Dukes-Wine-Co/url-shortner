DB="prod";
CONTAINER_NAME="url-traffic";
IS_RUNNING=$(docker ps | grep "${CONTAINER_NAME}")

run(){
  ! [[ -z "${IS_RUNNING}" ]] || docker run -d --name "${CONTAINER_NAME}" -p 27017:27017  -v ./data mongo;
  echo "${CONTAINER_NAME} is running"
}

restart(){
  docker restart "${CONTAINER_NAME}"
}

kill(){
  (docker kill "${CONTAINER_NAME}" || true) && (docker rm "${CONTAINER_NAME}" || true) && echo "${CONTAINER_NAME} container killed";
}

"$@"