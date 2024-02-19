import { Inject, Injectable } from '@nestjs/common';
import {
  CustomAgent,
  credentialInWalletListener,
  messageListener,
  proofAcceptedListener,
  proofRequestListener,
  returnWhenConnected,
} from 'src/agent/agentUtils';
import { AGENT_TOKEN } from 'src/constants';
import { cyan, underscore } from 'src/utils';

@Injectable()
export class ListenerService {
  constructor(@Inject(AGENT_TOKEN) private readonly agent: CustomAgent) {}
  async test() {
    setTimeout(() => {
      console.log('test, console after 1 min');
    }, 100000);
  }
  // To listen to all the message received and logging them
  messageListener() {
    messageListener(this.agent);
  }
  // To listen to connections to a particular outOfBandRecord
  async connectionListener(outOfBandRecordId: string) {
    const connectionListener = returnWhenConnected(
      this.agent,
      outOfBandRecordId,
    );
    const [connectionId] = await Promise.all([connectionListener]);
    console.log(
      `Established a ${underscore('connection')}:  with connectionId ${cyan(
        connectionId,
      )}`,
    );
    // this.agent.events.on<ConnectionStateChangedEvent>(
    //   ConnectionEventTypes.ConnectionStateChanged,
    //   async ({ payload }) => {
    //     if (payload.connectionRecord.outOfBandId !== outOfBandRecordId) return;
    //     if (payload.connectionRecord.isReady) {
    //       const connectionId = payload.connectionRecord.id;
    //       console.log(
    //         `Established a ${underscore('connection')}:  with connectionId ${cyan(
    //           connectionId,
    //         )}`,
    //       );
    //     }
    //   },
    // );
  }
  // To listen to the credential accepted for holder
  credentialListener() {
    credentialInWalletListener(this.agent);
  }
  // To listen to proof request received for holder
  ProofRequestReceivedListener() {
    proofRequestListener(this.agent);
  }
  // To listen to proof request verified for verifier
  ProofRequestVerifiedListener() {
    proofAcceptedListener(this.agent);
  }
}
