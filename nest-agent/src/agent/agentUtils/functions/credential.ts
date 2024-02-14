import { Agent } from '@aries-framework/core';
import { cyan, log, underscore } from '../../../utils';

export const offerAnoncredsCredential = async (
  issuer: Agent,
  connectionId: string,
  credentialDefinitionId: string,
  attributes?: any,
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
