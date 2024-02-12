import { CustomAgent } from '../agent/agent';
import { underscore } from '../utils';
import Logger from '../utils/loggers';

type CredentialSchema = {
  attrNames?: string[];
  issuerId: string;
  name?: string;
  version?: string;
};

export const createAndRegisterSchema = async (
  issuer: CustomAgent,
  {
    attrNames = ['name', 'dob', 'email', 'occupation'],
    issuerId,
    name = 'SSI Identity',
    version = `1.0.${Math.floor(Math.random() * 1000)}`,
  }: CredentialSchema
): Promise<string> => {
  const schemaResult = await issuer.modules.anoncreds.registerSchema({
    schema: {
      attrNames,
      issuerId,
      name,
      version,
    },
    options: {},
  });

  if (schemaResult.schemaState.state === 'failed') {
    throw new Error(`Error creating schema`);
  }
  Logger.info(
    `Created ${underscore('schema')} with id '${underscore(
      schemaResult.schemaState.schemaId!
    )}`
  );

  return schemaResult.schemaState.schemaId!;
};
