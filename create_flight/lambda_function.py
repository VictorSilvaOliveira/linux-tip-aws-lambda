import boto3
from botocore.config import Config
Config(
    region_name = 'us-east-2'
)

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')

    table = dynamodb.Table('flights')
    response = table.put_item(
       Item={
            'id': event['id'],
            'aircraft_prefix': event['aircraft_prefix'],
            'pilot_name': event['pilot_name'],
            'max_load': event['max_load'],
            'route': event['route'],
        }
    )
    return response
    