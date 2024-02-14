import { Agent, KeyType, TypedArrayEncoder } from '@aries-framework/core';
import { log, underscore, yellow } from '../../../utils';

export const createAndRegisterIndy = async (
  issuer: Agent,
  seed,
  did,
  did_namespace: string,
) => {
  console.log(did);
  const seedBuffer = TypedArrayEncoder.fromString(seed);
  const indyDID = `${did_namespace}${did}`;
  console.log(`indyDID ` + indyDID);

  await issuer.dids.import({
    did: indyDID,
    overwrite: true,
    privateKeys: [{ privateKey: seedBuffer, keyType: KeyType.Ed25519 }],
  });
  await log(
    `Created did '${underscore(indyDID)}' for ${yellow(issuer.config.label)}`,
  );
  return indyDID;
};
