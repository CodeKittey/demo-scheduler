## demo-scheduler

The Demo-Scheduler is based on webhook communication between microservices, communicating
with rabbitmq.

The implementation contains three microservices:

- SlackService
- MailService
- Scheduler Service

### Installation

There are two ways:

#### Docker

The Folder Dev provides a `docker-compose.yml` file and can be executed with
`docker-compose up -d`.

As you can see there are three different docker env_files.

slackservice.env
- NODE_ENV
- BOT_USER_OAUTH_ACCESS_TOKEN=The slack based Bot oauth Token
- QUEUE_CHANNEL_NAME_SLACK=The Name of the rabbitmq-queue for communication between scheduler and Slackservice
- RABBITMQ_HOST=Hostname for RabbitMQ
- RABBITMQ_PORT=Port for RabbitMQ

scheduler.env
- NODE_ENV
- QUEUE_CHANNEL_NAME_MAIL=The Name of the rabbitmq-queue for communication between scheduler and Mailservice
- PAYLOAD_URL=The POST-WebhoolURL for revieving the events
- QUEUE_CHANNEL_NAME_SLACK=The Name of the rabbitmq-queue for communication between scheduler and Slackservice
- RABBITMQ_HOST=Hostname for RabbitMQ
- RABBITMQ_PORT=Port for RabbitMQ

mailservice.env
- NODE_ENV
- API_MAIL_KEY=API Key for using the SendGrid Service
- MAIL_SERVICE_URL=The webhook URL for recieving the mail answers
- QUEUE_CHANNEL_NAME_Mail=The Name of the rabbitmq-queue for communication between scheduler and Slackservice
- RABBITMQ_HOST=Hostname for RabbitMQ
- RABBITMQ_PORT=Port for RabbitMQ

### Manuel

Of course you can start every Service on you own:
Every service provides npm scripts for that:

`npm run build`: Running the Typescript Compiler
`npm run start-server`: Starting the Server


In Addition to that, the Slack- and the Mailservice, each has a `member.json`-File according to the User you want
to send messages.

- mail_member.json
```
{
    "username1": "mailAdressUsername1",
    "username2": "mailAdressUsername2"
}
```

- slack_member.json
```
{
    "username1": "USER1_SLACK_ID",
    "username2": "USER2_SLACK_ID"
}
```

To use the whole Service you have to push a POST-Request to the Scheduler-Service:

POST /scheduler/api/send
```
{
    "users": [{"name": "username1", "notification_channel": "SLACK"},{"name": "username2", "notification_channel": "SLACK"},{"name": "username3", "notification_channel": "MAIL"}],
    "callback_id": <generatedCallBackId>,
    "text": "Do you have time??",
    "actions": [{"text": "Ja", "value": "yes"},{"text": "Nein", "value": "no"}]
}
```

If one of the user is reacting to the action, a request will be postet to the provided PayloadURL:
```
{ user: 'username1', value: 'no', callback_id: 'gejkrgjk5y5hjny5' }
{ user: 'username2', value: 'yes', callback_id: 'gejkrgjk5y5hjny5' }
```
