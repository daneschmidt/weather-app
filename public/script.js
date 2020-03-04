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

const locationElement = document.querySelector('[data-location]')
const statusElement = document.querySelector('[data-status]')
const windElement = document.querySelector('[data-wind]')
const tempElement = document.querySelector('[data-temprature]')
const precipElement = document.querySelector('[data-precipitation]')

function setWeatherData(data, place) {
    locationElement.textContent = place
    statusElement.textContent = data.summary
    tempElement.textContent = data.temperature
    precipElement.textContent = `${data.precipProbability * 100}%`
    windElement.textContent = data.windSpeed
}