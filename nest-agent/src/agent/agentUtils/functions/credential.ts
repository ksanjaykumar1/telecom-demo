import { Agent, CredentialExchangeRecord } from '@aries-framework/core';
import { cyan, log, underscore } from '../../../utils';
import { IssueCredentialDto } from 'src/issue-credential/dto/issue-credential.dto/issue-credential.dto';
import { CustomAgent } from '../agentModules';

export const offerAnoncredsCredential = async (
  issuer: Agent,
  { attributes, credentialDefinitionId, connectionId }: IssueCredentialDto,
) => {
  const dob = new Date();
  dob.setFullYear(new Date().getFullYear() - 25);
  if (!attributes) {
    attributes = [
      { name: 'name', value: 'John Doe' },
      {
        name: 'date of birth',
        value: dob.toISOString(),
      },
      { name: 'email', value: 'jane@anoncreds.ltd' },
      { name: 'occupation', value: 'Credential Influencer' },
    ];
  }
  await issuer.credentials.offerCredential({
    // @ts-ignore
    protocolVersion: 'v2',
    connectionId,
    credentialFormats: {
      anoncreds: {
        credentialDefinitionId,
        attributes,
      },
    },
  });

  log(
    `Offered ${underscore('Anoncreds')} credential: ${cyan(
      issuer.config.label,
    )} -> ${underscore(connectionId)}`,
  );
};

export const getAllCredentials = (agent: CustomAgent) => {
  return agent.credentials.getAll();
};

export const getCredentialById = (
  agent: CustomAgent,
  credentialRecordId: string,
): Promise<CredentialExchangeRecord> => {
  return agent.credentials.getById(credentialRecordId);
};
