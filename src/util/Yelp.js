const apiKey = 'ONjcE4Ebbi1VenYgWkfwWkaLbrjYcJh4Q8MJs5B2MST8ZkIMICP6nsflf0EgFhi0d0WvKiWq1ZBu2kvGnDPUMRbrBrXVZld1YXI1lCPRQ9n-KHS_BHzYx3-QRdQxXnYx'

const Yelp = {
    search: async (term, location, sortBy) => {
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
        { 
            headers: {
                Authorization: `Bearer ${apiKey}`
            }
        }).then(response => {
            return response.json()
        }).then (myJson => {
            if (myJson.businesses) {
                return myJson.businesses.map(business => {
                    return {
                         id: business.id,
                        imageSrc: business.image_url,
                        name: business.name,
                        address: business.location.address1,
                        city: business.location.city,
                        state: business.location.state,
                        zipCode: business.location.zip_code,
                        category: business.categories[0].title,
                        rating: business.rating,
                        reviewCount: business.review_count,
                        link: business.url
                    }
                })
            }
        })
    }
}

export { Yelp, apiKey }