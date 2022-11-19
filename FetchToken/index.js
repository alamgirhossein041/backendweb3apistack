//
// Node script to fetch token price data and load into DB
//
import { Spot } from '@binance/connector'
import cassandra from 'cassandra-driver'
import cron from 'node-cron'

////// Binance API Init
const apiKey = ''
const apiSecret = ''
const client = new Spot(apiKey, apiSecret)

////// Database Init
const db_client = new cassandra.Client({ contactPoints: ['cassandra'], localDataCenter: 'datacenter1', keyspace: 'tokendata' });

const insert_statement = 'INSERT INTO prices (name, price, date, ingest_time) VALUES (?, ?, ?, ?)'

////// Fetch Token Price every 10 seconds and write to Database
cron.schedule('*/10 * * * * *', () => {
  //Get date and the timestamp closest to price request
  const req_date = new Date()
  var date = req_date.toISOString().substring(0,10)
  var timestamp = req_date.valueOf()
  
  //DB function with current timestamp
  async function write_db(values) {
    await db_client.connect();

    // console.log('Fetched and inserting into Database: ', values.map(token => [token.symbol, token.price, date, timestamp ]))

    //Concurrently insert token data as array into cassandra table
    try {
      await cassandra.concurrent.executeConcurrent(db_client, insert_statement, values.map(token => [token.symbol, token.price, date, timestamp ]))
    }
    catch(err) {
      console.log('PRICEAPP: There was an error connecting to DB: ', err)
    }
  }
  
  //Fetch market ticker price
  client.tickerPrice('', ['ETHUSDT', 'BNBUSDT', 'MATICUSDT'])
    .then(response =>  write_db(response.data))
})