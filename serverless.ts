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
      name: 'MyTestLambda',
      events: [{
        httpApi: {
          path: '/hello',
          method: 'GET'
        }
      }],
      environment: {
        GENERAL_VAR: 'general',
      }
    },
    MyTestLambda2: {
      handler: '.build/lambda.envHandler2',
      events: [{
        httpApi: {
          path: '/hello2',
          method: 'GET'
        }
      }],
      environment: {
        GENERAL_VAR: 'general',
        ARN_VAR_REF: {
          'Ref': 'MyTestLambdaLambdaFunction'
        },
        ARN_VAR_GETATT: {
          'Fn::GetAtt': ['MyTestLambdaLambdaFunction', 'Arn']
        }
      }
    }
  } 
}

module.exports = serverlessConfiguration;