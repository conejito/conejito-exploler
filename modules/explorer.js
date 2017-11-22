const Database = require('./database');
const db = new Database();
const placeExplorer = require('./collect');
const createDivisions = require('./divisions');

const explorer = async (cityLocations) => {
  let nextPageToken = '';
  let cs = 0;
  do {

    const data = await placeExplorer(cityLocations, nextPageToken);

    const results = data.results;
    if(results.length==0) {
      console.log(data);
    }
    nextPageToken = data.nextPageToken;

    results.forEach( (e) => {
      console.log(e);
      for(let i =0; i < 10000000000/20; i++){}; // Wait for Google Api
      db.insert(`/places/${e.id}`, e);

      // const address = e.vicinity.split(',');
      // const city = address[address.length - 1].trim();

      // if (e.name.toLowerCase().includes('hostel')) {
      //   e.types.length = 0;
      //   e.types.push('hostel');
      // }
      // if (e.name.toLowerCase().includes('hotel')) {
      //   e.types.length = 0;
      //   e.types.push('hotel');
      // }
      // if (e.name.toLowerCase().includes('pizza')) {
      //   e.types.length = 0;
      //   e.types.push('pizzeria');
      // }

      // e.types.forEach( (category) => {
      //   // cities/Poznań/categories/locality/0730c3e35b6d5367031ab85ef2225d765089a90c, Poznań
      //   //console.log(`cities/${city}/categories/${category}/${e.id}`, e.name);
      //   db.insert(`/cities/${city}/categories/${category}/${e.id}`, e.name);
      // })
    });

  } while( cs++ < 2 );
};

let i = 0;
createDivisions.divisionsCenter(52.25, 16.58, 12, 12, 9131.9)
  .forEach( (array) => {
    array.forEach( (position) => {
      if( (i>=136) && (i<144) ){
        console.log(position);
        explorer(position);
      }
      i++;
    });
  });
