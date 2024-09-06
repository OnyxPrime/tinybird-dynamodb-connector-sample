import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import { faker }  from '@faker-js/faker';
import 'dotenv/config';

// Configure AWS DynamoDB
const dynamoDb = new DynamoDB({
    region: 'us-east-2', // Change to your preferred region
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const RIDERS_TABLE = 'Riders';
const RIDES_TABLE = 'Rides';
const SCOOTERS_TABLE = 'Scooters';
const MAINTENANCE_LOGS_TABLE = 'MaintenanceLogs';

const cities = ['New York', 'San Francisco', 'Los Angeles', 'Chicago', 'Miami'];
const models = ['Xiaomi M365', 'Segway Ninebot', 'Bird One', 'Lime-S', 'Spin'];
const membershipTypes = ['Pay-as-you-go', 'Monthly', 'Annual'];
const statuses = ['Available', 'In Use', 'Maintenance'];

async function streamRiders(count) {
    for (let i = 0; i < count; i++) {
        const rider = {
            RiderID: { "S": uuidv4().toString()},
            Name: { "S": faker.name.findName()},
            Age: { "S": faker.datatype.number({ min: 18, max: 60 }).toString()},
            MembershipType: { "S": faker.helpers.arrayElement(membershipTypes)},
            SignUpDate: { "S": faker.date.past().toISOString()},
            City: { "S": faker.helpers.arrayElement(cities)},
        };

        await dynamoDb.putItem({ TableName: RIDERS_TABLE, Item: rider });
        console.log(`Streamed Rider: ${rider.Name}`);
    }
}

async function streamScooters(count) {
    for (let i = 0; i < count; i++) {
        const scooter = {
            ScooterID: { "S": uuidv4().toString()},
            Model: { "S": faker.helpers.arrayElement(models)},
            BatteryLevel: { "S": faker.datatype.number({ min: 0, max: 100 }).toString()},
            Status: { "S": faker.helpers.arrayElement(statuses)},
            LastServiceDate: { "S": faker.date.past().toISOString()},
            City: { "S": faker.helpers.arrayElement(cities)},
        };

        await dynamoDb.putItem({ TableName: SCOOTERS_TABLE, Item: scooter });
        console.log(`Streamed Scooter: ${scooter.ScooterID}`);
    }
}

async function streamRides(count) {
    for (let i = 0; i < count; i++) {
        const ride = {
            RideID: { "S": uuidv4().toString()},
            RiderID: { "S": faker.datatype.uuid().toString()}, // You would typically link this to a real RiderID
            ScooterID: { "S": faker.datatype.uuid().toString()}, // You would typically link this to a real ScooterID
            StartLocation: { "S": faker.address.streetAddress().toString()},
            EndLocation: { "S": faker.address.streetAddress().toString()},
            StartTime: { "S": faker.date.recent().toISOString()},
            EndTime: { "S": faker.date.recent().toISOString()},
            Distance: { "S": faker.datatype.number({ min: 1, max: 15 }).toString()}, // Distance in kilometers
            Cost: { "S": faker.datatype.float({ min: 1, max: 20, precision: 0.01 }).toString()},
            City: { "S": faker.helpers.arrayElement(cities)},
        };

        await dynamoDb.putItem({ TableName: RIDES_TABLE, Item: ride });
        console.log(`Streamed Ride: ${ride.RideID}`);
    }
}

async function streamMaintenanceLogs(count) {
    for (let i = 0; i < count; i++) {
        const log = {
            LogID: { "S": uuidv4().toString()},
            ScooterID: { "S": faker.datatype.uuid().toString()}, // You would typically link this to a real ScooterID
            ServiceDate: { "S": faker.date.past().toISOString()},
            Technician: { "S": faker.name.findName()},
            ServiceDetails: { "S": faker.lorem.sentence()},
            City: { "S": faker.helpers.arrayElement(cities)},
        };

        await dynamoDb.putItem({ TableName: MAINTENANCE_LOGS_TABLE, Item: log });
        console.log(`Streamed Maintenance Log: ${log.LogID}`);
    }
}

async function streamDatabase() {
    do {
    //await streamRiders(50); // Stream 50 riders
    //await streamScooters(20); // Stream 20 scooters
    await streamRides(100); // Stream 100 rides
    //await streamMaintenanceLogs(30); // Stream 30 maintenance logs
    } while(true)
}

streamDatabase().catch(error => console.error('Error streaming database:', error));
