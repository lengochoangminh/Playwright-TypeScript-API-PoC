# Playwright API Testing with TypeScript

## Swagger UI

- [Booking Swagger UI](https://automationintesting.online/booking/swagger-ui/index.html#/)
- [Room Swagger UI](https://automationintesting.online/room/swagger-ui/index.html#/)

## Set up

1. Clone the repo and install the dependencies: `npm install`
2. Run the tests on the DEV environment: `env=dev npx playwright test`
3. Check out the test results via Allure Report: `npx allure serve allure-results`

## Framework Features

- Hands-on for the GET, POST, PUT & DELETE requests

- Read the environment configurations from .env files to run tests on multiple environments.

  - Run the tests for Dev environment: `env=dev npx playwright test`
  - Run the tests for QA environment: `env=qa npx playwright test`

- Run the tests by tags. For example, only run the happy tests: `env=dev npx playwright test --grep @smoke`

- Consume the API Docs (Swagger) to calculate the test coverage.
  <br><img width="300" alt="test-coverage" src="https://github.com/lengochoangminh/Playwright-TypeScript-API-PoC/assets/29770042/2d75f1b2-37f3-4b9f-9535-caa4769bdaac">

- Validate for JSON Schema of the request or response

- Handling Headers and Authentication. Extract the Cookies or Tokens

- Mock the HTTP network traffic for a specific response

- Generate the Allure Report
  <br><img width="800" alt="AllureReport" src="https://github.com/lengochoangminh/Playwright-TypeScript-API-PoC/assets/29770042/e97e103d-8f2d-4941-a838-3de0c5fc9b44">

- CI/CD with GitHub Actions
  <br><img width="800" alt="Screenshot 2024-05-31 at 15 18 50" src="https://github.com/lengochoangminh/Playwright-TypeScript-API-PoC/assets/29770042/3145eb29-a83f-4799-9eb2-c3eae9700183">

- Install Prettier and ESLint to help solve common errors and consistency your code base
  <br><img width="600" alt="EslintExample" src="https://github.com/lengochoangminh/Playwright-TypeScript-API-PoC/assets/29770042/08930a4f-3bcf-4e6d-b16d-9db40e31b1f6">

- Dockerization. Run the tests in the Docker
  - Build your docker image from Docker File: `docker build -t playwright-tests .`
  - Run tests in Docker: `docker run -e TESTS=tests/booking/booking.delete.spec.ts playwright-tests`
