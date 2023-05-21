import express from 'express';
import qrcode from 'qrcode-terminal';
import { initialOutOfBandRecord } from '../integration/integration';

const getInvitation = async (req: express.Request, res: express.Response) => {
  const invitationUrl = initialOutOfBandRecord.outOfBandInvitation.toUrl({
    domain: 'https://example.org',
  });
  console.log(`Invitation URL ${invitationUrl}`);
  qrcode.generate(invitationUrl, { small: true });
  res.status(200).json({ invitationUrl });
};

export { getInvitation };
