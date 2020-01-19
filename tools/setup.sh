FILE="env.sh"

if [ -f "$FILE" ]; then
  echo "$FILE exists in this project already. Exiting the setup script";
  exit 0;

  else
    echo "This setup script is going to walk you through the configuration of some enviornment variables to get your version of the application up and running";
    echo; echo "Enter the url that your app will redirect to and press [ENTER]:";
    read -r gateway;
    echo; echo "Enter the mongoDB url that your app will connect to and press [ENTER]:";
    read -r second;

    echo "export GATEWAY_URL=${gateway};" >> "$FILE";
    echo "export MONGO_DB_URL=${second};" >> "$FILE";

    echo;
    echo "Setup is complete";
    exit 0;
fi
