class WeatherApp {
    constructor() {
        this.cityData = [];
    }

    async getDataFromDB() {
        try {
            const data = await $.get('/cities')
            await Promise.all (data.map(city => this.getCityData(city.name)))
        } catch (error) {
            throw error
        }
    }

    async getCityData(cityName) {
        try {
            const existingCity = this.cityData.find(city => city.name.toLowerCase() === cityName.toLowerCase())
            if (existingCity) return existingCity
            const city = await $.get(`/city/${cityName}`)
            if (city.name) {
                this.cityData.push(city)
                return city
            }
        } catch (error) {
            throw error
        }
    }

    async saveCity(cityName) {
        try {
            const city = this.cityData.find(city => city.name.toLowerCase() === cityName.toLowerCase())
            if (city) {
                await $.post('/city', city)
            }
        } catch (error) {
            throw error
        }
    }

    async removeCity(cityName) {
        try {
            await $.ajax({
                url: `/city/${cityName}`,
                type: 'DELETE'
            })
            this.cityData = this.cityData.filter(city => city.name.toLowerCase() !== cityName.toLowerCase())
        } catch (error) {
            throw error
        }
    }
}
