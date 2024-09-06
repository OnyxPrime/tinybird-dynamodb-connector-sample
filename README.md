# Connecting DynamoDB to Tinybird sample
This sample accompanies the blog post [How to Run Real-Time Filtering and Aggregation Queries on DynamoDB with Tinybird]().

It provides sample code to seed and stream data to a DynamoDB database. DynamoDB credentials are stored in a `.env` file.

A sample `.datasource` file is also provided for configuring a DynamoDB Data Source in Tinybird.

## .env
The following values are needed to allow the code to create and write to tables in a DynamoDB instance.

```
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=
```

## Usage

### Seeding the data
The `seed.mjs` file will create the following 4 tables within DynamoDB and seed them with an inital set of random data.
- Riders
- Scooters
- Rides
- Maintenance Logs

In a terminal, execute  `seed.mjs`.
```Bash
node seed.mjs
```

### Streaming data
The `stream_test.mjs` file will stream additional random data to the previously created DynamoDB tables. This is to demonstrate the streaming capabilities of DyanmoDB to Tinybird using the [Tinybird DynamoDB Connector](https://www.tinybird.co/docs/ingest/dynamodb).

In a terminal, execute `stream_test.mjs`.
```Bash
node stream_test.mjs
```