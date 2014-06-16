#!/bin/bash          

scp data/db.db root@host:directory/data/db.db 
rm data/db.db
node db_init.js & node db_populate.js 

