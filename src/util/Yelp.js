import { hiddenApiKey } from "./apiKey"

const apiKey = hiddenApiKey || process.env.REACT_APP_API_KEY

const Yelp = {
    search: async (term, location, sortBy) => {
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
        { 
            headers: {
                Authorization: `Bearer ${apiKey}`
            }
        }).then(response => {
            console.log(response)
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