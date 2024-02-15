import { Inject, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  Agent,
  ConsoleLogger,
  HttpOutboundTransport,
  InitConfig,
  LogLevel,
  WsOutboundTransport,
} from '@aries-framework/core';
import { HttpInboundTransport, agentDependencies } from '@aries-framework/node';
import {
  agentModuleFactory,
  createAndRegisterIndy,
  createNewInvitation,
} from './agentUtils';
import { AGENT_MODULES_TOKEN, AGENT_TOKEN } from 'src/constants';
import * as qrcode from 'qrcode-terminal';

const agentFactory = {
  provide: AGENT_TOKEN,
  useFactory: async (configService: ConfigService, agentModules: any) => {
    const {
      label,
      agent_port,
      did,
      seed,
      wallet_key,
      wallet_id,
      endpoint,
      did_namespace,
    } = configService.get('agent');
    const applicationEnv = configService.get('environment');
    const agentEndpoints = applicationEnv === 'development' ? [] : [endpoint];
    const config: InitConfig = {
      label: label,
      endpoints: agentEndpoints,
      walletConfig: {
        id: wallet_id,
        key: wallet_key,
      },
      logger: new ConsoleLogger(
        applicationEnv === 'development' ? LogLevel.debug : LogLevel.info,
      ),
    };
    const agent = new Agent({
      config,
      dependencies: agentDependencies,
      modules: agentModules,
    });
    agent.registerOutboundTransport(new HttpOutboundTransport());
    agent.registerOutboundTransport(new WsOutboundTransport());
    agent.registerInboundTransport(
      new HttpInboundTransport({ port: agent_port }),
    );
    try {
      await agent.initialize();
      await createAndRegisterIndy(agent, seed, did, did_namespace);
      const { invitationUrl, outOfBandRecord } = await createNewInvitation(
        agent,
        { label: 'Fur Alice' },
      );
      qrcode.generate(invitationUrl, { small: true });
    } catch (error) {
      console.log(error);
      process.exit(1);
    }

    return agent;
  },
  inject: [ConfigService, AGENT_MODULES_TOKEN],
};
@Module({
  providers: [agentFactory, ConfigService, agentModuleFactory],
  exports: [AGENT_TOKEN],
})
export class AgentModule {
  constructor(@Inject(AGENT_TOKEN) private agent: Agent) {}
}
