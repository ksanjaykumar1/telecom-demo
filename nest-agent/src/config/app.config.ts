export default () => ({
  environment: process.env.NODE_ENV || 'prod',
  server: {
    // host: process.env.DATABASE_HOST,
    port: parseInt(process.env.PORT, 10) || 4000,
  },
  agent: {
    environment: process.env.AGENT_ENV || 'public',
    type: process.env.AGENT_TYPE,
    name: process.env.AGENT_NAME,
    label: process.env[`${process.env.AGENT_NAME}LABEL`],
    wallet_id: process.env[`${process.env.AGENT_NAME}WALLET_ID`],
    wallet_key: process.env[`${process.env.AGENT_NAME}WALLET_KEY`],
    agent_port: parseInt(process.env[`${process.env.AGENT_NAME}PORT`]) || 3001,
    endpoint: process.env[`${process.env.AGENT_NAME}ENDPOINT`],
    did: process.env.DID,
    seed: process.env.SEED,
    mediator_url: process.env.MEDIATOR_URL,
    did_namespace: process.env.DID_NAMESPACE,
  },
});
