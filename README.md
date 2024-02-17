# Ister website

## Generate openapi

java -jar openapi-generator-cli.jar generate -i http://localhost:8080/v3/api-docs -o src/generated-sources/openapi -g typescript-fetch

