---
layout: post
title: Home Assistant LTSS
draft: "true"
---

Define a new database user account for for home assistant.

```console
$ ssh josh@pg-server.localdomain
josh@pg-server:~$ psql -U postgres -h localhost                
Password for user postgres: 
psql (15.4 (Debian 15.4-1.pgdg120+1))
SSL connection (protocol: TLSv1.3, cipher: TLS_AES_256_GCM_SHA384, compression: off)
Type "help" for help.

postgres=# CREATE USER homeassistant WITH PASSWORD 'what-is-seen-cannot-be-unseen' ;
CREATE ROLE
```

Create the database

```console
postgres=# CREATE database homeassistant_ltss WITH OWNER homeassistant;
CREATE DATABASE
postgres=# \c homeassistant_ltss
SSL connection (protocol: TLSv1.3, cipher: TLS_AES_256_GCM_SHA384, compression: off)
You are now connected to database "homeassistant_ltss" as user "postgres".
homeassistant_ltss=# CREATE EXTENSION IF NOT EXISTS timescaledb;
WARNING:  
WELCOME TO
 _____ _                               _     ____________  
|_   _(_)                             | |    |  _  \ ___ \ 
  | |  _ _ __ ___   ___  ___  ___ __ _| | ___| | | | |_/ / 
  | | | |  _ ` _ \ / _ \/ __|/ __/ _` | |/ _ \ | | | ___ \ 
  | | | | | | | | |  __/\__ \ (_| (_| | |  __/ |/ /| |_/ /
  |_| |_|_| |_| |_|\___||___/\___\__,_|_|\___|___/ \____/
               Running version 2.11.2
For more information on TimescaleDB, please visit the following links:

 1. Getting started: https://docs.timescale.com/timescaledb/latest/getting-started
 2. API reference documentation: https://docs.timescale.com/api/latest
 3. How TimescaleDB is designed: https://docs.timescale.com/timescaledb/latest/overview/core-concepts

Note: TimescaleDB collects anonymous reports to better understand and assist our users.
For more information and how to disable, please see our docs https://docs.timescale.com/timescaledb/latest/how-to-guides/configuration/telemetry.

CREATE EXTENSION
homeassistant_ltss=# \q
```

Enable remote access

```console
josh@pg-server:~$ find / -name "postgresql.conf"
/etc/postgresql/15/main/postgresql.conf

josh@pg-server:~$ sudo nano /etc/postgresql/15/main/postgresql.conf

listen_addresses = '*'

josh@pg-server:~$ sudo ss -tulpn | grep LISTEN
tcp   LISTEN 0      188          0.0.0.0:5432      0.0.0.0:*    users:(("postgres",pid=36898,fd=5))
tcp   LISTEN 0      128          0.0.0.0:22        0.0.0.0:*    users:(("sshd",pid=634,fd=3))      
tcp   LISTEN 0      188             [::]:5432         [::]:*    users:(("postgres",pid=36898,fd=6))
tcp   LISTEN 0      128             [::]:22           [::]:*    users:(("sshd",pid=634,fd=4))

josh@pg-server:~$ sudo nano /etc/postgresql/15/main/pg_hba.conf

# TYPE  DATABASE        USER            ADDRESS                 METHOD
# "local" is for Unix domain socket connections only
local   all             all                                     peer
# IPv4 local connections:
host    all             all             127.0.0.1/32            scram-sha-256
host    all             all             0.0.0.0/0               md5
# IPv6 local connections:
host    all             all             ::1/128                 scram-sha-256
host    all             all             ::/0                    md5

josh@pg-server:~$ sudo systemctl restart postgresql
```

To download a backup of the database
First I'll define a new database user account for myself with superuser privileges. Second I'll use ssh to connect to the database server, run pg_dump, piped through gzip, and redirected to local machine.

```console
$ ssh josh@pg-server.localdomain
josh@pg-server:~$ psql -U postgres -h localhost                
Password for user postgres: 
psql (15.4 (Debian 15.4-1.pgdg120+1))
SSL connection (protocol: TLSv1.3, cipher: TLS_AES_256_GCM_SHA384, compression: off)
Type "help" for help.

postgres=# CREATE USER josh WITH SUPERUSER PASSWORD 'password' ;
CREATE ROLE
postgres=# \du
                                     List of roles
   Role name   |                         Attributes                         | Member of 
---------------+------------------------------------------------------------+-----------
 homeassistant |                                                            | {}
 josh          | Superuser                                                  | {}
 postgres      | Superuser, Create role, Create DB, Replication, Bypass RLS | {}

postgres=# \q
josh@pg-server:~$ logout
Connection to pg-server.localdomain closed.
$ ssh josh@pg-server.localdomain "pg_dump -C --column-inserts homeassistant_ltss | gzip -c " > ./homeassistant_ltss.sql.gz
pg_dump: warning: there are circular foreign-key constraints on this table:
pg_dump: detail: hypertable
pg_dump: hint: You might not be able to restore the dump without using --disable-triggers or temporarily dropping the constraints.
pg_dump: hint: Consider using a full dump instead of a --data-only dump to avoid this problem.
pg_dump: warning: there are circular foreign-key constraints on this table:
pg_dump: detail: chunk
pg_dump: hint: You might not be able to restore the dump without using --disable-triggers or temporarily dropping the constraints.
pg_dump: hint: Consider using a full dump instead of a --data-only dump to avoid this problem.
pg_dump: warning: there are circular foreign-key constraints on this table:
pg_dump: detail: continuous_agg
pg_dump: hint: You might not be able to restore the dump without using --disable-triggers or temporarily dropping the constraints.
pg_dump: hint: Consider using a full dump instead of a --data-only dump to avoid this problem.
```

Ignore these errors. [circular warning while backup using pg_dump with version 1.5.1 #1581](https://github.com/timescale/timescaledb/issues/1581)


Thanks
[Configure PostgreSQL to allow remote connection](https://www.bigbinary.com/blog/configure-postgresql-to-allow-remote-connection)
[Home Assistant With TimescaleDB and Grafana](https://cristian.livadaru.net/home-assistant-grafana/)
[Custom component: Long Time State Storage (LTSS) utilizing TimescaleDB](https://community.home-assistant.io/t/custom-component-long-time-state-storage-ltss-utilizing-timescaledb/155047)


CREATE DATABASE homeassistant_db WITH OWNER homeassistant ENCODING 'utf8';" |