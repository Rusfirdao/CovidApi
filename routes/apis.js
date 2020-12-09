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
//date table Confirmed
router.get('/dateConfirmed', async (req, res, next) => {

  const result = await db.any(`
  select country.province ,country ,covid_confirmed."3/23/2020" as day7,covid_confirmed."3/22/2020" as day6, covid_confirmed."3/21/2020" as day5,
covid_confirmed."3/20/2020" as day4,
 covid_confirmed."3/19/2020" as day3,
 covid_confirmed."3/18/2020" as day2,
 covid_confirmed."3/17/2020" as day1
from country 
inner join covid_confirmed 
on country.id = covid_confirmed.id order by covid_confirmed."3/23/2020" :: INTEGER 
desc limit 7`);
  res.json(result);
});

//date table re
router.get('/dateRecovered', async (req, res, next) => {

  const result = await db.any(`
  select country.province ,country ,covid_recovered."3/23/2020" as day7,covid_recovered."3/22/2020" as day6, covid_recovered."3/21/2020" as day5,
covid_recovered."3/20/2020" as day4,
 covid_recovered."3/19/2020" as day3,
 covid_recovered."3/18/2020" as day2,
covid_recovered."3/17/2020" as day1
from country 
inner join covid_recovered 
on country.id = covid_recovered."﻿ID" order by covid_recovered."3/23/2020" desc `);
  res.json(result);
});


//date table deaths
router.get('/dateDeaths', async (req, res, next) => {

  const result = await db.any(`
  select country.province ,country ,covid_death."3/23/2020" as day7,covid_death."3/22/2020" as day6, covid_death."3/21/2020" as day5,
covid_death."3/20/2020" as day4,
 covid_death."3/19/2020" as day3,
 covid_death."3/18/2020" as day2,
covid_death."3/17/2020" as day1
from country 
inner join covid_death
on country.id = covid_death."﻿ID" order by covid_death."3/23/2020" desc `);
  res.json(result);
});







//top7 /graphtopConfirmed
router.get('/graphtopConfirmed', async (req, res, next) => {

  const result = await db.any(`
  select country.province ,country ,covid_confirmed."3/23/2020" as confirmed from country 
  inner join covid_confirmed on country.id = covid_confirmed.id order by covid_confirmed."3/23/2020" :: INTEGER desc limit 7`);
  res.json(result);
});



//top7 /graphtopDeaths
router.get('/graphtopDeaths', async (req, res, next) => {

  const result = await db.any(`
  select province,country,covid_death."3/23/2020" as deaths from country 
  inner join covid_death on country.id = covid_death."﻿ID" order by "3/23/2020" desc  limit 7`);
  res.json(result);
});






//table
router.get('/table', async (req, res, next) => {

  const result = await db.any(`SELECT  country.country ,country.province ,covid_confirmed."3/23/2020" as confirmed ,covid_recovered."3/23/2020" as recovered ,covid_death."3/23/2020" as deaths
  from  country  
  inner join covid_confirmed on country.id = covid_confirmed.id 
  inner join covid_death on covid_confirmed.id = covid_death."﻿ID" 
  inner join covid_recovered on covid_death."﻿ID" = covid_recovered."﻿ID"`);
  res.json(result);
});




module.exports = router;



