import {PremarumAwsInfrastructureStack} from "../lib/premarum-aws-infrastructure-stack";
import {App} from "aws-cdk-lib";

new PremarumAwsInfrastructureStack(new App(), 'PremarumAwsInfra', {
    env: {
        account: '749991802782',
        region: 'us-east-1'
    }
})