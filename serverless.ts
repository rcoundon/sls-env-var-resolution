import type { AWS } from '@serverless/typescript';


const serverlessConfiguration: AWS = {
  service: 'sls-env-test',
  frameworkVersion: '> 2.41.2',
  package: {
    individually: true,
  },
  configValidationMode: 'error',
  provider: {
    name: 'aws',
    lambdaHashingVersion: '20201221',  
    runtime: 'nodejs14.x' as any,
    versionFunctions: false,
    logRetentionInDays: 3,
    memorySize: 128,
    timeout: 10,
    region: 'eu-west-2',
    apiGateway: {
      shouldStartNameWithService: true,      
    },
  },
  plugins: ['serverless-offline'],
  functions: {
    MyTestLambda: {
      handler: '.build/lambda.envHandler',
      events: [{
        httpApi: {
          path: '/hello',
          method: 'GET'
        }
      }],
      environment: {
        GENERAL_VAR: 'general',
        ARN_VAR_REF: {
          'Ref': 'MyTestLambda'
        },
        ARN_VAR_GETATT: {
          'Fn::GetAtt': ['MyTestLambda', 'arn']
        }
      }
    }
  } 
}

module.exports = serverlessConfiguration;