const AWS = require('aws-sdk');
const { spawn } = require('child_process');

// Configure AWS SDK to use instance role
AWS.config.update({ region: 'eu-north-1' });

const secretName = "prod/issue-tracker";

// Fetch secret from AWS Secrets Manager
async function fetchSecrets() {
  const secretsManager = new AWS.SecretsManager();
  try {
    const data = await secretsManager.getSecretValue({ SecretId: secretName }).promise();
    const secrets = JSON.parse(data.SecretString);

    // Prepare the environment variables for docker-compose
    const envVars = Object.entries(secrets)
      .map(([key, value]) => `${key}=${value.replace(/^"|"$/g, '')}`);

    console.log('Secrets fetched successfully.');
    return envVars;
  } catch (error) {
    console.error('Error fetching secrets:', error);
    process.exit(1);
  }
}

// Run docker-compose with the environment variables
async function runDockerCompose() {
  const envVars = await fetchSecrets();
  const compose = spawn('docker-compose', ['up', '--build'], {
    // only the first = is used to split the key and value,
    env: { ...process.env, ...Object.fromEntries(envVars.map(e => e.split(/=(.+)/))) },
    stdio: 'inherit',
  });

  compose.on('close', (code) => {
    console.log(`docker-compose exited with code ${code}`);
    process.exit(code);
  });
}

runDockerCompose();
