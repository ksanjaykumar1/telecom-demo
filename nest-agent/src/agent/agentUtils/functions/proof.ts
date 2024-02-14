import { Agent } from '@aries-framework/core';
import { cyan, log, underscore } from '../../../utils';

export const requestAnoncredsProof = async (
  verifier: Agent,
  connectionId: string,
  credentialDefinitionId?: string,
  requested_attributes?: string[],
) => {
  let names: string[];
  if (requested_attributes?.length === 0) {
    names = ['name', 'date of birth', 'occupation'];
  } else {
    names = requested_attributes!;
  }
  await verifier.proofs.requestProof({
    connectionId,
    protocolVersion: 'v2',
    proofFormats: {
      anoncreds: {
        requested_attributes: {
          identity: {
            names,
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

  log(
    `Requested ${underscore('Anoncreds')} proof: ${cyan(
      verifier.config.label,
    )} -> ${underscore(connectionId)}`,
  );
};

export const connectionlessProofRequest = async (
  verifier: Agent,
  credentialDefinitionId: string,
) => {
  // create Request
  const { proofRecord, message } = await verifier.proofs.createRequest({
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
