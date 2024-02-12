import { KeyType, TypedArrayEncoder } from '@aries-framework/core';
import { DID_NAMESPACE, DID, SEED } from '../constants/constant';
import Logger from '../utils/loggers';
import { CustomAgent } from '../agent/agent';

/**
 * Import an existing did that was created outside.
 * This will create a `DidRecord` for the did
 * and will allow the did to be used in other parts of the agent.
 */
export const createAndRegisterIndy = async (issuer: CustomAgent) => {
  const seed = TypedArrayEncoder.fromString(SEED);
  const indyDID = `${DID_NAMESPACE}${DID}`;
  console.log(`indyDID ` + indyDID);

  await issuer.dids.import({
    did: indyDID,
    overwrite: true,
    privateKeys: [{ privateKey: seed, keyType: KeyType.Ed25519 }],
  });
  Logger.info(`Created did '${indyDID}' for ${issuer.config.label}`);
  return indyDID;
};
