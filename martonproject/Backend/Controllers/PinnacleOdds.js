const axios = require('axios');

exports.getPinnacleOdds = async (req,res) => {
    const options = {
        method: 'GET',
        url: 'https://odds-api1.p.rapidapi.com/decimalOdds/sport=soccer',
        headers: {
            'x-rapidapi-key': '7fabe2bdc4msh26698e2575e9d5bp153a10jsn986fbf978ff2',
            'x-rapidapi-host': 'pinnacle-odds.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.error(error);
    }
};
