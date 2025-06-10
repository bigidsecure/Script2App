echo "Welcome to Script2App!\n"
echo "This script has been called from a BigID server with the following data:\n"
echo "Base URL: $bigidBaseUrl"
echo "Token: $bigidToken"
echo "Third Party Application (TPA) ID: $tpaId"
echo "Execution ID: $executionId"

echo "\nHere's that system's DS connections:"
curl --location --request GET "${bigidBaseUrl}ds_connections" --header "Authorization: $bigidToken"