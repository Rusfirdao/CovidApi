var express = require('express');
var router = express.Router();
const pgp = require('pg-promise')();
const connection = `postgres://postgres:123456@localhost:5432/postgres`;
const db = pgp(connection);


/* About Covid-19 APIs */
router.get('/', (req, res, next) => {
  res.send('Covid-19 APIs version 1.0');
});

// 1. Get all confirmed
router.get('/confirmed', async (req, res, next) => {

    const result = await db.any(`select SUM(cc."3/23/2020"::INTEGER) as total from covid_confirmed cc`);
    res.json(result[0]);
});
router.get('/recovered', async (req, res, next) => {

  const result = await db.any(`select SUM(cr."3/23/2020"::INTEGER) as total from covid_recovered cr `);
  res.json(result[0]);
});

router.get('/death', async (req, res, next) => {

  const result = await db.any(`select SUM(cd."3/23/2020"::INTEGER) as total from covid_death cd `);
  res.json(result[0]);
});

//map
router.get('/map', async (req, res, next) => {

  const result = await db.any(`SELECT covid_confirmed.lat, covid_confirmed.long, country.country ,country.province ,covid_confirmed."3/23/2020" as confirmed ,covid_death."3/23/2020" as deaths,covid_recovered."3/23/2020" as recovered 
  from  country  
  inner join covid_confirmed on country.id = covid_confirmed.id 
  inner join covid_death on covid_confirmed.id = covid_death."﻿ID" 
  inner join covid_recovered on covid_death."﻿ID" = covid_recovered."﻿ID"  `);
  res.json(result);
});

// //table
router.get('/table', async (req, res, next) => {

  const result = await db.any(`SELECT  country.country ,country.province ,covid_confirmed."3/23/2020" as confirmed ,covid_recovered."3/23/2020" as recovered ,covid_death."3/23/2020" as deaths
  from  country  
  inner join covid_confirmed on country.id = covid_confirmed.id 
  inner join covid_death on covid_confirmed.id = covid_death."﻿ID" 
  inner join covid_recovered on covid_death."﻿ID" = covid_recovered."﻿ID"`);
  res.json(result);
});
//top5
router.get('/tabletop7', async (req, res, next) => {

  const result = await db.any(`
  select province,country,covid_death."3/23/2020" as deaths from country 
  inner join covid_death on country.id = covid_death."﻿ID" order by "3/23/2020" desc`);
  res.json(result);
});



//graph
router.get('/graphConfirmed', async (req, res, next) => {

  const result = await db.any(`select SUM(cc."3/23/2020"::INTEGER) as "3/23/2020" 
  ,SUM(cc."3/22/2020"::INTEGER) as "3/22/2020",
  SUM(cc."2/21/2020"::INTEGER) as "3/21/2020",
  SUM(cc."2/20/2020"::INTEGER) as "2/20/2020",
  SUM(cc."2/19/2020"::INTEGER) as "2/19/2020",
  SUM(cc."2/18/2020"::INTEGER) as "2/18/2020",
  SUM(cc."2/17/2020"::INTEGER) as "2/17/2020",
  SUM(cc."2/16/2020"::INTEGER) as "2/16/2020",
  SUM(cc."2/15/2020"::INTEGER) as "2/15/2020",
  SUM(cc."2/14/2020"::INTEGER) as "2/14/2020" 
  from covid_confirmed cc"`);
  res.json(result);
});

router.get('/graphrecovered', async (req, res, next) => {

  const result = await db.any(`select SUM(cr."3/23/2020"::INTEGER) as "3/23/2020" 
  ,SUM(cr."3/22/2020"::INTEGER) as "3/22/2020",
  SUM(cr."2/21/2020"::INTEGER) as "3/21/2020",
  SUM(cr."2/20/2020"::INTEGER) as "2/20/2020",
  SUM(cr."2/19/2020"::INTEGER) as "2/19/2020",
  SUM(cr."2/18/2020"::INTEGER) as "2/18/2020",
  SUM(cr."2/17/2020"::INTEGER) as "2/17/2020",
  SUM(cr."2/16/2020"::INTEGER) as "2/16/2020",
  SUM(cr."2/15/2020"::INTEGER) as "2/15/2020",
  SUM(cr."2/14/2020"::INTEGER) as "2/14/2020" 
  from covid_recovered cr`);
  res.json(result);
});
router.get('/graphdeath', async (req, res, next) => {

  const result = await db.any(`select SUM(cd."3/23/2020"::INTEGER) as "3/23/2020" 
  ,SUM(cd."3/22/2020"::INTEGER) as "3/22/2020",
  SUM(cd."2/21/2020"::INTEGER) as "3/21/2020",
  SUM(cd."2/20/2020"::INTEGER) as "2/20/2020",
  SUM(cd."2/19/2020"::INTEGER) as "2/19/2020",
  SUM(cd."2/18/2020"::INTEGER) as "2/18/2020",
  SUM(cd."2/17/2020"::INTEGER) as "2/17/2020",
  SUM(cd."2/16/2020"::INTEGER) as "2/16/2020",
  SUM(cd."2/15/2020"::INTEGER) as "2/15/2020",
  SUM(cd."2/14/2020"::INTEGER) as "2/14/2020" 
  from covid_death cd"`);
  res.json(result);
});



module.exports = router;



