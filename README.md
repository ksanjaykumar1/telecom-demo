# Telecom-demo

# Contents <!-- omit in toc -->

## About the project.

The standard process of getting a mobile sim card in India is visiting a telecom operator store which will perform Aadhar e-KYC i.e. taking the customer’s biometric data and sending it to the UIDAI to get the customer details. Once the customer is verified the sim card is issued. I am using SSI technology to reimagine the situation. The customer data will be verified without calling the Issuer i.e UIDAI.

## Project FLow

![telecom-demo](https://github.com/ksanjaykumar1/telecom-demo/assets/72605368/aa8062d6-30f0-4156-a670-172838371280)

## How to Run the Project

> NOTE: Use docker version V2. I am using Docker Compose version v2.12.2. The network fails when run with docker-compose version 1.25.5.

Create .env file from .env-sample in each of the issuer, holder and verifer folder. And run the following command from the root directory of this repo.

```
docker compose up -d --build
```

It will create a network with three servers. You check the logs of each of the server by:

```
docker logs issuer -f
```

```
docker logs holder -f
```

```
docker logs issuer -f
```

### Software Requirements

1. Docker
2. Docker Compose V2

> NOTE: Internet connection is a must because application interacts with online BCovrin Test Indy network and online mediator provided by Animo.

## There are two way to perform the interacts between Agents

1. Use the all three agents in the project.
2. **Use your mobile digital wallet as a holder (USE BC WALLET by British Columbia, the app is available in Play Store)** to perform the interaction. All three agents use online mediator which makes it possible to communicate outside the local system.

## Postman Collection

Postman collections are added in the docs folder. This need to be imported and used to communicate with the agents.
I have used the following global variable, please set these global variables for the project.

1. "issuerbase" and it's value is "localhost:3000"
2. "holderbase" and it's value is "localhost:5000"
3. "verifierbase" and it's value is "localhost:4000"
4. "version1" and its' value is "api/v1"

# Flow

I am going to decribe the flow of

1.  Agent Setup.
2.  Connection Establishment.
3.  Issuance.

        a. Credential offer.
        b. Acceptiong credential offer.
        c. Receiving credential.

4.  Verification

        a. Proof request
        b. Acceptance of proof request
        c. Verification of proof
        d. Issuance of phone number in form of  credential (TODO)

These numbering are seperate from the above project flow.

## 1.Agent Setup

At the start each of the agent are intialized and are connected to ledger and mediator.

To check if a particular agent is connected to the mediator call the "get all connections" API under the folder collection "connections" that is under each respective agent folder name in the Postman collection.

![mediator](https://github.com/ksanjaykumar1/telecom-demo/assets/72605368/db9c70f9-68b7-4f41-8ec8-857ffc017787)
The request was sent to issuer agent and it says the connection status is completed with Animo Mediator.

At the start, the issuer agent writes the necessary crypto material into the ledger i.e. schema and credential definition. The below screenshot display the query request. If schema Id or Credential Def Id is not passed as value in the respected API calls then initally registered schema Id or Credential Def Id is picked and queried from the ledger.

![Screenshot from 2023-05-22 19-40-05](https://github.com/ksanjaykumar1/telecom-demo/assets/72605368/c3316e96-d43e-437a-8085-7fbeb2e31ecf)

![Screenshot from 2023-05-22 19-40-29](https://github.com/ksanjaykumar1/telecom-demo/assets/72605368/258ab039-0511-4f01-a22f-20df8d2fd1e0)


## 2.Connection establishment between Issuer and holder

## 3. Issuance

## 4 Verification
