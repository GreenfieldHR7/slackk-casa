  CREATE TABLE IF NOT EXISTS "privatechannels" (
	"id" serial NOT NULL,
	"username1" varchar(1024) NOT NULL,
	"username2" varchar(1024) NOT NULL,
  	"db_name" varchar(1024) NOT NULL UNIQUE,
	CONSTRAINT privatechannels_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);