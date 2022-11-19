
-- // Used during Development //
-- DROP KEYSPACE IF EXISTS tokendata;

-- // Create Cassandra KEYSPACE //
CREATE KEYSPACE tokendata WITH replication = {
  'class': 'SimpleStrategy',
  'replication_factor': 1
};

-- // Create Cassandra Table and Indexes for tokendata prices //
USE tokendata;

CREATE TABLE prices (
  name text,
  price text,
  date text,
  ingest_time timestamp,
  PRIMARY KEY ((name), date, ingest_time)
)
WITH CLUSTERING ORDER BY (date desc, ingest_time desc);

CREATE INDEX index_name on prices(name);
CREATE INDEX index_date on prices(date);
-- CREATE INDEX index_time on prices(ingest_time);

