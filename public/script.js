const searchElement = document.querySelector('[data-city-search]')
const searchBox = new google.maps.places.SearchBox(searchElement)

searchBox.addListener('places_changed', () => {
    const place = searchBox.getPlaces()[0]
    if (place == null) return
    const latitude = place.geometry.location.lat()
    const longitude = place.geometry.location.lng()
    fetch('/weather', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            latitude: latitude,
            longitude: longitude
        })
    }).then(res => res.json()).then(data => {
        console.log(data)
        setWeatherData(data, place.formatted_address)
    })
})

const icon = new Skycons({color: '#222'})
const locationElement = document.querySelector('[data-location]')
const statusElement = document.querySelector('[data-status]')
const windElement = document.querySelector('[data-wind]')
const tempElement = document.querySelector('[data-temprature]')
const precipElement = document.querySelector('[data-precipitation]')
const uvIndex = document.querySelector('[data-uvIndex]')
const windGustElement = document.querySelector('[data-wind-gust]')
const windBearingElement = document.querySelector('[data-wind-bearing]')
const visibilityElement = document.querySelector('[data-visibility]')
const ozoneElement = document.querySelector('[data-ozone]')
const cloudCoverElement = document.querySelector('[data-cloud-cover]')
icon.set('icon', 'clear-day')
icon.play()

function setWeatherData(data, place) {
    locationElement.textContent = place
    statusElement.textContent = data.currently.summary
    tempElement.textContent = data.currently.temperature
    precipElement.textContent = `${data.currently.precipProbability * 100}%`
    windElement.textContent = data.currently.windSpeed
    uvIndex.textContent = data.currently.uvIndex
    windGustElement.textContent = data.currently.windGust
    windBearingElement.textContent = data.currently.windBearing
    visibilityElement.textContent = data.currently.visibility
    ozoneElement.textContent = data.currently.ozone
    cloudCoverElement.textContent = data.currently.cloudCover
    icon.set('icon', data.currently.icon)
    icon.play()
}