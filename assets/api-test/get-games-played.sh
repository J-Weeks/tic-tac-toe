TOKEN="4a4d89ed2e66d2525a272ecbafa87627"
BASE_URL="http://tic-tac-toe.wdibos.com"
URL="${BASE_URL}/games?over=true"

json() {

  CONTENT_TYPE="application/json"

    curl ${URL} \
      --include \
      --request 'GET' \
      --header "Content-Type: ${CONTENT_TYPE}" \
      --header "Authorization: Token token=${TOKEN}"
}

json

echo
