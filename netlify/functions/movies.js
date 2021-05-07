// allows us to read csv files
let csv = require('neat-csv')

// allows us to read files from disk
let fs = require('fs')

// defines a lambda function
exports.handler = async function(event) {
  // write the event object to the back-end console
  console.log(event)

  // read movies CSV file from disk
  let moviesFile = fs.readFileSync(`./movies.csv`)
  
  // turn the movies file into a JavaScript object, wait for that to happen
  let moviesFromCsv = await csv(moviesFile)

  // write the movies to the back-end console, check it out
  console.log(moviesFromCsv)

  // 🔥 hw6: your recipe and code starts here!

  //Define variables for queries to be handed off from the user
  let year = event.queryStringParameters.year
  let genre = event.queryStringParameters.genre

  // define the URL for the movie data
  url = `http://localhost:8888/.netlify/functions/movies?year=${year}&genre=${genre}`

  //Set up an error message if one of the query parameters is missing
  if (year == undefined || genre == undefined) {
    return {
      statusCode: 200, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
      body: `Please specify a year and a genre.` // message returned when query is missing either a genre or year
    }
  }

// Create a new Object to be returned by the API
  else {
    let returnValue = {
    
      movies: [],
      numResults: movies.length
    }
//make a loop to parse through the movie data
    for (let i=0; i < moviesFromCsv.length; i++) {
  //store each movie in memory
      let imdbEntry = moviesFromCsv[i]
  // Create a new object containing the pertinent fields
      let movieEntry = {
        title: imdbEntry.primaryTitle, 
        releaseYear: imdbEntry.startYear, 
        genres: imdbEntry.genres
      }

  //Conditional statement on how to handle the entry and whether or not to add it to the returned list
  // Add (push) the post object to the movies array in the returnValue object if the query parameters are present in the movie entry
      if (imdbEntry.genres.includes(genre) && imdbEntry.releaseYear.includes(year) && imdbEntry.genres !== `//N` && imdbEntry.runtimeMinutes !== `//N`) {

        movies.push(movieEntry)
      }
      else {

      }
  

    }

    // a lambda function returns a status code and a string of data from the object created by the search results
    return {
      statusCode: 200, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
      body: JSON.stringify(returnValue) // a string of data
    }
  }
}