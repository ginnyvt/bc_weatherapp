const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectdb = async () => {
  let database;
  try {
    const client = await MongoClient.connect(process.env.MONGO_API, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    database = await client.db();
    console.log('Connected to mongo database');
  } catch (err) {
    throw new Error(err.message);
  }
  return database;
};

const insert = async (weatherData) => {
  const db = await connectdb();
  try {
    await db.collection('weather_data').insertOne({
      _id: weatherData.id,
      city: weatherData.city,
      longtitude: weatherData.longtitude,
      latitude: weatherData.latitude,
      tempInC: weatherData.tempInC,
      createdAt: weatherData.createdAt,
    });
  } catch (err) {
    throw new Error(err.message);
  }
  return weatherData;
};

const getByCity = async (city) => {
  const db = await connectdb();
  try {
    const result = await db
      .collection('weather_data')
      .findOne({ city: `${city}` });
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const update = async (weatherData) => {
  const db = await connectdb();
  try {
    await db.collection('weather_data').updateOne(
      { city: weatherData.city },
      {
        $set: {
          city: weatherData.city,
          longtitude: weatherData.longtitude,
          latitude: weatherData.latitude,
          tempInC: weatherData.tempInC,
          createdAt: weatherData.createdAt,
        },
      }
    );
    return weatherData;
  } catch (err) {
    throw createError(500, err.message);
  }
};

module.exports = { insert, getByCity, update };
