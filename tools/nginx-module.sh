start() {
  docker run --name dukes-wine-url-shortner -d -p 3002:80 -v ${PWD}/nginx.conf:/etc/nginx/nginx.conf nginx
}

quit() {
  (docker kill dukes-wine-url-shortner || true) && (docker rm dukes-wine-url-shortner || true)
}

develop() {
  quit && start
}
