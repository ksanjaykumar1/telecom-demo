import { CustomAgent } from '../agent/agent';
import { cyan, underscore } from '../utils';
import Logger from '../utils/loggers';

export const requestAnoncredsProof = async (
  verifier: CustomAgent,
  connectionId: string,
  credentialDefinitionId?: string,
  requested_attributes?: string[]
) => {
  if (requested_attributes?.length === 0) {
    requested_attributes = ['name', 'date of birth', 'occupation'];
  }
  await verifier.proofs.requestProof({
    connectionId,
    protocolVersion: 'v2',
    proofFormats: {
      anoncreds: {
        requested_attributes: {
          identity: {
            names: ['name', 'date of birth', 'occupation'],
            restrictions: [
              {
                cred_def_id: credentialDefinitionId,
              },
            ],
          },
        },
        name: 'proof-request',
        version: `1.0.${Math.floor(Math.random() * 1000)}`,
      },
    },
  });

  Logger.info(
    `Requested ${underscore('Anoncreds')} proof: ${cyan(
      verifier.config.label
    )} -> ${underscore(connectionId)}`
  );
};

export const connectionlessProofRequest = async (
  verifier: CustomAgent,
  credentialDefinitionId: string
) => {
  // create Request
  let { proofRecord, message } = await verifier.proofs.createRequest({
    protocolVersion: 'v2',
    proofFormats: {
      anoncreds: {
        requested_attributes: {
          identity: {
            names: ['name', 'date of birth', 'occupation'],
            restrictions: [
              {
                cred_def_id: credentialDefinitionId,
              },
            ],
          },
        },
        name: 'proof-request',
        version: `1.0.${Math.floor(Math.random() * 10000)}`,
      },
    },
  });
  // createInvitation on the oob module and pass the message and set handshake to false
  const outOfBandRecord = await verifier.oob.createInvitation({
    messages: [message],
    handshake: false,
  });

  return outOfBandRecord;
};
