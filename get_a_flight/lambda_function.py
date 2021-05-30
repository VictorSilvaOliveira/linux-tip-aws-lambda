import boto3
from botocore.config import Config
Config(
    region_name = 'us-east-2'
)

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')

    table = dynamodb.Table('flights')
    response = table.get_item( Key={ 'id': event['id'] })
    return response['Item']
    