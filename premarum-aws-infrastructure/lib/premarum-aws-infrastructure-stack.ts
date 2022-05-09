import {CfnOutput, Duration, Stack, StackProps} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as kms from "aws-cdk-lib/aws-kms"
import * as secretsmanager from "aws-cdk-lib/aws-secretsmanager"
import {Architecture} from "aws-cdk-lib/aws-lambda";
import * as apigwv2 from "@aws-cdk/aws-apigatewayv2-alpha"
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';

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
    
    const premarum_lambda = new lambda.DockerImageFunction(this, 'premalambda', {
      code: lambda.DockerImageCode.fromImageAsset("../premarum-backend", {
        buildArgs: {
          "-f": "DockerfileLambda",
          "--platform": "linux/arm64"
        }
      }),
      timeout: Duration.minutes(5),
      architecture: Architecture.ARM_64,
      memorySize: 1024,
      environment: {
        DATABASE_SERVER_URL: db_secret.secretValue.unsafeUnwrap(),
        ASPNETCORE_ENVIRONMENT: "Production",
        LAMBDA_NET_SERIALIZER_DEBUG: "true"
      }
    })

    const lambdaIntegration = new HttpLambdaIntegration("PreEnrollmentMgmtIntegration", premarum_lambda)
    
    const api = new apigwv2.HttpApi(this, "APIGW")

    api.addRoutes({
      path: "/{proxy+}",
      methods: [apigwv2.HttpMethod.ANY],
      integration: lambdaIntegration,
    })
    
    new CfnOutput(this, 'api url', {
      value: api.url!
    });
  }
}
