import { CustomAgent } from '../agent/agent';
import { cyan, underscore } from '../utils';
import Logger from '../utils/loggers';

export const offerAnoncredsCredential = async (
  issuer: CustomAgent,
  connectionId: string,
  credentialDefinitionId: string,
  attributes?: any
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
    protocolVersion: 'v2',
    connectionId,
    credentialFormats: {
      anoncreds: {
        credentialDefinitionId,
        attributes,
      },
    },
  });

  Logger.info(
    `Offered ${underscore('Anoncreds')} credential: ${cyan(
      issuer.config.label
    )} -> ${underscore(connectionId)}`,
    false
  );
};
