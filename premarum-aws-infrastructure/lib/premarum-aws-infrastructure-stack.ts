import {CfnOutput, Duration, Stack, StackProps} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as kms from "aws-cdk-lib/aws-kms"
import * as secretsmanager from "aws-cdk-lib/aws-secretsmanager"
import * as ag from "aws-cdk-lib/aws-apigateway" 
import {Architecture} from "aws-cdk-lib/aws-lambda";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class PremarumAwsInfrastructureStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    
    const encryptionKey = kms.Key.fromKeyArn(this, 
        'DefaultEncKey', 
        'arn:aws:kms:us-east-1:749991802782:key/796b3dfa-882f-4d62-a830-b0494f1a7af6');
    
    const db_secret = secretsmanager.Secret.fromSecretAttributes(this, 'SecretFromAttributes', {
      secretCompleteArn: 'arn:aws:secretsmanager:us-east-1:749991802782:secret:DATABASE_SERVER_URL-TfQ6uQ',
      encryptionKey,
    });
    
    const premarum_lambda = new lambda.DockerImageFunction(this, 'PremarumLambdaFn', {
      code: lambda.DockerImageCode.fromImageAsset("../premarum-backend", {
        buildArgs: {
          "-f": "DockerfileLambda",
          "--platform": "linux/arm64"
        }
      }),
      timeout: Duration.minutes(5),
      architecture: Architecture.ARM_64,
      memorySize: 512,
      environment: {
        DATABASE_SERVER_URL: db_secret.secretValue.unsafeUnwrap(),
        ASPNETCORE_ENVIRONMENT: "Production",
        LAMBDA_NET_SERIALIZER_DEBUG: "true"
      }
    })
    
    const api = new ag.LambdaRestApi(this, 'API GW', {
      handler: premarum_lambda,
      proxy: true
    })
    
    new CfnOutput(this, 'api url', {
      value: api.url
    });
  }
}
