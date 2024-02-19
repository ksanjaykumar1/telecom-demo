import {
  Agent,
  BasicMessageEventTypes,
  BasicMessageRole,
  BasicMessageStateChangedEvent,
  ConnectionEventTypes,
  ConnectionStateChangedEvent,
  CredentialEventTypes,
  CredentialExchangeRecord,
  CredentialState,
  CredentialStateChangedEvent,
  ProofEventTypes,
  ProofExchangeRecord,
  ProofState,
  ProofStateChangedEvent,
} from '@aries-framework/core';
import { log, underscore, yellow } from '../../../utils';
import { CustomAgent } from '../agentModules';

export const messageListener = (agent: CustomAgent) => {
  return new Promise(() => {
    agent.events.on(
      BasicMessageEventTypes.BasicMessageStateChanged,
      (event: BasicMessageStateChangedEvent) => {
        if (
          event.payload.basicMessageRecord.role === BasicMessageRole.Receiver
        ) {
          log(` Received message:${underscore(event.payload.message.content)}`);
        }
      },
    );
  });
};
export const returnWhenConnected = (
  agent: Agent,
  outOfBandRecordId: string,
): Promise<string> => {
  return new Promise((resolve) => {
    agent.events.on<ConnectionStateChangedEvent>(
      ConnectionEventTypes.ConnectionStateChanged,
      ({ payload }) => {
        if (payload.connectionRecord.outOfBandId !== outOfBandRecordId) return;
        if (payload.connectionRecord.isReady) {
          resolve(payload.connectionRecord.id);
        }
      },
    );
  });
};

export const credentialInWalletListener = (
  agent: Agent,
): Promise<CredentialExchangeRecord> => {
  return new Promise(() => {
    agent.events.on<CredentialStateChangedEvent>(
      CredentialEventTypes.CredentialStateChanged,
      ({ payload }) => {
        if (payload.credentialRecord.state === CredentialState.Done) {
          log(
            `Accepted ${underscore('Anoncreds')} credential for ${yellow(
              agent.config.label,
            )}`,
          );
          console.log(payload.credentialRecord);
          log(JSON.stringify(payload.credentialRecord));
          // resolve(payload.credentialRecord);
        }
      },
    );
  });
};

export const returnWhenProofShared = (
  agent: Agent,
): Promise<ProofExchangeRecord> => {
  return new Promise((resolve) => {
    agent.events.on<ProofStateChangedEvent>(
      ProofEventTypes.ProofStateChanged,
      async ({ payload }) => {
        if (payload.proofRecord.state === ProofState.Done) {
          log(
            `Present ${underscore('Anoncreds')} proof for ${yellow(
              agent.config.label,
            )}`,
          );

          log('================Presentation==============');
          const formattedData = await agent.proofs.getFormatData(
            payload.proofRecord.id,
          );

          const items = Object.entries(
            // @ts-ignore
            formattedData.presentation?.anoncreds.requested_proof
              .revealed_attr_groups.identity.values,
          );

          // @ts-ignore
          items.forEach(([key, { raw }]) => {
            log(`- ${key}: ${raw}`);
          });

          log('======================================');
          resolve(payload.proofRecord);
        }
      },
    );
  });
};

export const proofAcceptedListener = (
  agent: Agent,
): Promise<ProofExchangeRecord> => {
  return new Promise(() => {
    agent.events.on<ProofStateChangedEvent>(
      ProofEventTypes.ProofStateChanged,
      async ({ payload }) => {
        log(
          `Present ${underscore('Anoncreds')} proof received by ${yellow(
            agent.config.label,
          )}`,
        );
        if (payload.proofRecord.state === ProofState.Done) {
          if (payload.proofRecord.isVerified) {
            log('================Presentation==============');
            const formattedData = await agent.proofs.getFormatData(
              payload.proofRecord.id,
            );

            const items = Object.entries(
              // @ts-ignore
              formattedData.presentation?.anoncreds.requested_proof
                .revealed_attr_groups.identity.values,
            );

            // @ts-ignore
            items.forEach(([key, { raw }]) => {
              log(`- ${key}: ${raw}`);
            });

            log('==============Verified successfully==================');
            // resolve(payload.proofRecord);
          }
        }
      },
    );
  });
};

export const proofRequestListener = (agent: CustomAgent) => {
  return new Promise(() => {
    agent.events.on(
      ProofEventTypes.ProofStateChanged,
      ({ payload }: ProofStateChangedEvent) => {
        if (payload.proofRecord.state === ProofState.RequestReceived) {
          log(JSON.stringify(payload.proofRecord));
        }
      },
    );
  });
};
