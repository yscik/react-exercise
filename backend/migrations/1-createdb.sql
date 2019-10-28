
CREATE TABLE IF NOT EXISTS app (
  key VARCHAR(255) NULL,
  value VARCHAR(255) NULL,
  PRIMARY KEY (key)
);

INSERT INTO app(key,value) values('version', '1');

CREATE TABLE IF NOT EXISTS userdata (
  userid UUID NOT NULL,
  cities JSON NULL,
  PRIMARY KEY (userid)
);


CREATE TABLE IF NOT EXISTS "user" (
  id UUID NOT NULL,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS userdata (
  userid UUID NOT NULL,
  cities JSON NULL,
  PRIMARY KEY (userid)
);
