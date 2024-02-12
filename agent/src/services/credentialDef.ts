import { CustomAgent } from '../agent/agent';
import Logger from '../utils/loggers';

type CredentialDefinition = {
  tag?: string;
  issuerId: string;
  schemaId: string;
};

export const createAndRegisterCredentialDefinition = async (
  issuer: CustomAgent,
  { tag = 'default', issuerId, schemaId }: CredentialDefinition
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
  Logger.info(
    `Created credential definition with id '${credentialDefinitionResult
      .credentialDefinitionState.credentialDefinitionId!}' for ${
      issuer.config.label
    }`
  );
  return credentialDefinitionResult.credentialDefinitionState
    .credentialDefinitionId!;
};
