import { Agent } from '@aries-framework/core';
import { log, underscore } from '../../../utils';

type CredentialSchema = {
  attrNames?: string[];
  issuerId: string;
  name?: string;
  version?: string;
};

export const createAndRegisterSchema = async (
  issuer: Agent,
  {
    attrNames,
    issuerId,
    name,
    version = `1.0.${Math.floor(Math.random() * 1000)}`,
  }: CredentialSchema,
): Promise<string> => {
  const schemaResult = await issuer.modules.anoncreds.registerSchema({
    schema: {
      attrNames,
      issuerId,
      name,
      version,
    },
    options: {
      endorserMode: 'internal',
      endorserDid: issuerId,
    },
  });
  if (schemaResult.schemaState.state === 'failed') {
    throw new Error(`Error creating schema`);
  }
  await log(
    `Created ${underscore('schema')} with id '${underscore(
      schemaResult.schemaState.schemaId!,
    )}`,
  );

  return schemaResult.schemaState.schemaId!;
};

export const getSchemaById = async (agent: Agent, schemaId: string) => {
  const schema = await agent.modules.anoncreds.getSchema(schemaId);
  return schema;
};
