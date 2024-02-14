import { Agent, CreateOutOfBandInvitationConfig } from '@aries-framework/core';

export const createNewInvitation = async (
  agent: Agent,
  config: CreateOutOfBandInvitationConfig,
) => {
  const outOfBandRecord = await agent.oob.createInvitation(config);
  return {
    invitationUrl: outOfBandRecord.outOfBandInvitation.toUrl({
      domain: 'https://example.org',
    }),
    outOfBandRecord,
  };
};
