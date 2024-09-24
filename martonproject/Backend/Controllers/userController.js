

const User = require('../Models/userModel.js');
const axios=require('axios');
const apiKey = '15f6f0ca6501258f75d63c56d84034ae'; // My api key for OddsAPI
const sport = 'soccer';                            // My hardcoded Game for API

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, gender } = req.body;

  
    if (!username || !email || !password || !gender) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

 
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

  
    // Create a new user
    const newUser = new User({
      username,
      email,
      password,
      gender
    });

    
    await newUser.save();

    // Respond with success
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};


exports.loginUser = async (req, res) => {
  try {
    const { email, password} = req.body;

  
    if ( !email || !password ) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

 
    const existingUser = await User.findOne({ email,password });
    if (existingUser) {
      return res.status(201).json({ message: 'User login successfully' });
    }
    else{
      return res.status(201).json({ message: 'User Does not exist' });
    }

  
    
  
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.getsportsData = async (req, res) => {
  try {
    const response = await axios.get('https://api.the-odds-api.com/v4/sports/soccer/odds/', {
      params: {
        apiKey: '15f6f0ca6501258f75d63c56d84034ae',
        regions: 'us',
        markets: 'h2h' 
      }
    });

    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Failed to fetch data from OddsAPI.' });
  }
};

exports.getLiveSportsData = async (req, res) => {
  try {
    const response = await axios.get('https://api.the-odds-api.com/v4/sports/soccer/odds/', {
      params: {
        apiKey: '15f6f0ca6501258f75d63c56d84034ae',
        regions: 'us',
        sport_key:'live',
        markets: 'h2h'
      }
    });

    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error('Error fetching live data:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Failed to fetch live data from OddsAPI.' });
  }
};

exports.getSportData = async (req, res) => {
  try {
    const response = await axios.get('https://api.the-odds-api.com/v4/sports/soccer/odds', {
      params: {
        apiKey: apiKey,
        regions: 'us',
        markets: 'h2h'
      }
    });

    const data = response.data;

    if (!data || data.length === 0) {
      console.log('No active  games  for this.');
      res.json([]); 
      return;
    }

    

    const surebets = calculateSurebets(data);
    res.json(surebets);
  } catch (error) {
    console.error('Error fetching data:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Failed to fetch data from OddsAPI.' });
  }
};

const calculateSurebets = (oddsData) => {
  const surebets = [];

  if (!Array.isArray(oddsData)) {
    console.error('Invalid odds data:', oddsData);
    return surebets;
  }

  oddsData.forEach(event => {
    if (!event.bookmakers || !Array.isArray(event.bookmakers)) {
      console.error('Invalid bookmakers data:', event);
      return;
    }

    const oddsMap = {};
    const eventTitle = event.sport_title || 'Unknown Title';
    const region = event.region || 'Unknown Region';
    const gameName = event.competition && event.competition.name ? event.competition.name : 'Unknown Game';

    

    event.bookmakers.forEach(bookmaker => {
      if (!bookmaker.markets || !Array.isArray(bookmaker.markets)) {
        console.error('Invalid markets data for bookmaker:', bookmaker);
        return;
      }

      bookmaker.markets.forEach(market => {
        if (market.key !== 'h2h') return;

        market.outcomes.forEach(outcome => {
          if (!oddsMap[outcome.name]) {
            oddsMap[outcome.name] = [];
          }
          oddsMap[outcome.name].push({
            price: outcome.price,
            last_update: bookmaker.last_update // Store last update time
          });
        });
      });
    });

    Object.keys(oddsMap).forEach(team => {
      const odds = oddsMap[team];
      if (odds.length < 2) return;

      const totalImpliedProbability = odds.reduce((sum, odd) => sum + (1 / odd.price), 0);

      if (totalImpliedProbability < 1) {
        const totalStake = 100;
        const { stakes, profit1 } = calculateStakes(odds.map(odd => odd.price), totalStake);
        console.log(profit1);
        console.log(totalStake);
        console.log(profit1/totalStake);
       const profit=  ((profit1/ totalStake) * 100)/10;
    
        const isOdd = (totalImpliedProbability % 2) !== 0;

        surebets.push({
          title: eventTitle,
          region: region,
          gameName: gameName,
          team1: Object.keys(oddsMap)[0],
          team2: Object.keys(oddsMap)[1],
          odds: odds.map(odd => odd.price),
          totalImpliedProbability,
          isOdd: isOdd ? 'Odd' : 'Even',
          profit,
          stakes,
          lastUpdate: odds.map(odd => odd.last_update) // Include last update times
        });
      }
    });
  });

  return surebets;
};

const calculateStakes = (odds, totalStake) => {
  const impliedProbabilities = odds.map(odd => 1 / odd);
  const totalImpliedProbability = impliedProbabilities.reduce((sum, prob) => sum + prob, 0);

  const stakes = impliedProbabilities.map(prob => (totalStake * prob) / totalImpliedProbability);
  const profit1 = (totalStake / totalImpliedProbability) - totalStake;

  return { stakes, profit1 };
};

