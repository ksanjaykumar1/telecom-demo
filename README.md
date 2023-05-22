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

At the start, the issuer agent writes the necessary crypto material into the ledger i.e. schema and credential definition. The below screenshot display the query request. If schema Id or Credential Def Id is not passed as a value in the respected API calls then initally registered schema Id or Credential Def Id is picked and queried from the ledger and sent as a response to the API call.

![Screenshot from 2023-05-22 19-40-05](https://github.com/ksanjaykumar1/telecom-demo/assets/72605368/c3316e96-d43e-437a-8085-7fbeb2e31ecf)

![Screenshot from 2023-05-22 19-40-29](https://github.com/ksanjaykumar1/telecom-demo/assets/72605368/258ab039-0511-4f01-a22f-20df8d2fd1e0)


## 2.Connection establishment between Issuer and holder

When the agent is setup it created OOB invitation and displays QR code.
![Screenshot from 2023-05-22 19-42-00](https://github.com/ksanjaykumar1/telecom-demo/assets/72605368/fb7a44f0-ac48-4e39-8c7e-5c319cbb1f12)

If you lost it you can query the agent which you want to get connected with. The agent send the invitation url as json response and aslo displays the qrcode in the logs of the container. 

![Screenshot from 2023-05-22 19-42-25](https://github.com/ksanjaykumar1/telecom-demo/assets/72605368/103e44cb-ccd0-4f1e-9f65-c39a861e26c3)

The agent which wants to establish connection can scan the QR code or call the '/api/v1//out-of-band/receive-invitation' API by passing the invitation url to get connected. The 

![Screenshot from 2023-05-22 19-48-29](https://github.com/ksanjaykumar1/telecom-demo/assets/72605368/c5eba1ef-33c8-46f2-8f5e-95657bebad40)

The issuer agent listner listens to the connection request by OOB record once the connection is established it send a message to the agent and the connection ID of the holder is stored and exported for other services to use.

![Screenshot from 2023-05-22 19-48-59](https://github.com/ksanjaykumar1/telecom-demo/assets/72605368/98bdaab8-7dca-4b20-aebe-50775a8b64e3)


## 3. Issuance

The issuer agent sends the credential offer when '/api/v1/issue-credential/send' API is called with the values of credential. 

![Screenshot from 2023-05-22 20-32-14](https://github.com/ksanjaykumar1/telecom-demo/assets/72605368/06f11199-11b7-411f-b9b2-05835d083128)


The holder agent as setup a listner and it listen to the credential offer it recieves and the holder agent in this code configured to auto accept the credential offer, holder agent accepts the offer and the issuer agent send the credential
![Screenshot from 2023-05-22 20-33-06](https://github.com/ksanjaykumar1/telecom-demo/assets/72605368/fd294e80-9d0e-4dc5-a938-78fdb446950f)

![Screenshot from 2023-05-22 20-34-13](https://github.com/ksanjaykumar1/telecom-demo/assets/72605368/e435d793-1d23-4a0e-8483-348a19239187)

## 4 Verification

![Screenshot from 2023-05-22 21-08-30](https://github.com/ksanjaykumar1/telecom-demo/assets/72605368/3489368c-7a25-4cc7-a27f-20b022a8e651)


![Screenshot from 2023-05-22 21-13-52](https://github.com/ksanjaykumar1/telecom-demo/assets/72605368/aa9962f5-e50f-41c8-8d0d-a88c978eed46)




![Screenshot from 2023-05-22 21-11-50](https://github.com/ksanjaykumar1/telecom-demo/assets/72605368/025465cc-32bc-4dec-bb99-fa57aec82025)


