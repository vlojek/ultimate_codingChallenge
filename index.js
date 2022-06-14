const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const axios = require("axios")

app.get("/region/:regionName", async (req, res) => {
  try {
    let regionName = req.params.regionName
    let regionSum = 0
    let regionMax = 0
    let allCapitals = ""
    const response = await axios.get("https://restcountries.com/v3.1/region/" + regionName)
    regionName = response.data[0].region

    for (let i = 0; i < response.data.length; i++) {
      regionSum += response.data[i].population
      if (response.data[i].population > regionMax) {
        regionMax = response.data[i].population
        regionMaxName = response.data[i].name.common
        regionMaxEmoji = response.data[i].flag
      }
      allCapitals += response.data[i].capital + ", "
    }

    res.send(
      `${regionName} has a total population of ${regionSum.toLocaleString("en-US")}. <br><br> 
      The largest population lives in ${regionMaxEmoji} ${regionMaxName} at ${regionMax.toLocaleString("en-US")} people. 
      <br><br>  All capitals in this region are: ${allCapitals}`
    )
  } catch (err) {
    console.error(err)
    res.send("Something went wrong.")
  }
})

app.listen(port, () => {
  console.log(`Listening on port ${port}.`)
})

/*
 const sumSanity = response.data.reduce((prev, current) => {
      return prev + current.population
    }, 0)

    const maxNumberSanity = response.data.reduce((prev, current) => (prev.population > current.population ? prev : current)).population
    const maxNameSanity = response.data.reduce((prev, current) => (prev.population > current.population ? prev : current)).name.common
    const maxEmojiSanity = response.data.reduce((prev, current) => (prev.population > current.population ? prev : current)).flag

  */
