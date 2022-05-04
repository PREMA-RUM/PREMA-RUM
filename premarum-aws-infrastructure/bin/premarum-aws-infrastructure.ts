import {PremarumAwsInfrastructureStack} from "../lib/premarum-aws-infrastructure-stack";
import {App} from "aws-cdk-lib";

new PremarumAwsInfrastructureStack(new App(), 'PremarumAwsInfra', {
    env: {
        
    }
})