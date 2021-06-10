import { Handler, Context } from 'aws-lambda';

export const envHandler: Handler = (event: any, context: Context) => {
  return Promise.resolve({
    statusCode: 200,
    body: `
    General: ${process.env.GENERAL_VAR}
    ArnGetAtt: ${process.env.ARN_VAR_GETATT},
    ArnRef: ${process.env.ARN_VAR_REF}`,
  });
};