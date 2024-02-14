import { Agent } from '@aries-framework/core';
import { log, underscore, yellow } from '../../../utils';

type CredentialDefinition = {
  tag?: string;
  issuerId: string;
  schemaId: string;
};

export const createAndRegisterCredentialDefinition = async (
  issuer: Agent,
  { tag = 'default', issuerId, schemaId }: CredentialDefinition,
): Promise<string> => {
  const credentialDefinitionResult =
    await issuer.modules.anoncreds.registerCredentialDefinition({
      credentialDefinition: {
        tag,
        issuerId,
        schemaId,
      },
      options: {},
    });

  if (credentialDefinitionResult.credentialDefinitionState.state === 'failed') {
    throw new Error('Error ');
  }
  await log(
    `Created ${underscore('credential definition')} with id '${underscore(
      credentialDefinitionResult.credentialDefinitionState
        .credentialDefinitionId!,
    )}' for ${yellow(issuer.config.label)}`,
  );
  return credentialDefinitionResult.credentialDefinitionState
    .credentialDefinitionId!;
};
