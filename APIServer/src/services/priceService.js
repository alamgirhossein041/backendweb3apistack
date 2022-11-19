import cassandra from 'cassandra-driver'

export async function getTokenPrice(tokenId, date_from, date_to) {
  // Initialize Database client
  const db_client = new cassandra.Client({ contactPoints: ['cassandra'], localDataCenter: 'datacenter1', keyspace: 'tokendata' });

  //Check time period params are valid
  if (date_from && date_to && Date.parse(date_from) && Date.parse(date_to)) {
    // Build query statement
    var query_statement = "SELECT * FROM prices WHERE name = '" + tokenId +"' AND date >= '" + date_from +"' AND date <= '" + date_to +"'"
  }
  else {
    var query_statement = "SELECT * FROM prices WHERE name = '" + tokenId +"'"
  }

  await db_client.connect()

  // Query Database
  try {
    let db_Res = await db_client.execute(query_statement)
    return db_Res
  }
  catch(err) {
    // console.log('APIServer: There was an error connecting to DB: ', err)
    throw new Error('error');
  }
  finally {
    await db_client.shutdown();
  }
}

export async function getTokenPriceOn(tokenId, date) {
  // Initialize Database client
  const db_client = new cassandra.Client({ contactPoints: ['cassandra'], localDataCenter: 'datacenter1', keyspace: 'tokendata' });

  //Check date is valid
  if (date && Date.parse(date)) {
    // Build query statement
    var query_statement = "SELECT price FROM prices WHERE name = '" + tokenId +"' AND date = '" + date +"' LIMIT 1"
    // Query Database
    try {
      let db_Res = await db_client.execute(query_statement)
      return db_Res
    }
    catch(err) {
      // console.log('APIServer: There was an error connecting to DB: ', err)
      throw new Error('error');
    }
    finally {
      await db_client.shutdown();
    }
  }
  else {
    throw new Error('error');
  }
}