// routes/routes.js

const express = require('express');
const router = express.Router();
const userController=require('../Controllers/userController.js')
const pinnacleOdds=require('../Controllers/PinnacleOdds.js')

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/prematch-data', userController.getsportsData);
router.get('/surebeats', userController.getSportData);
router.get('/livesports', userController.getLiveSportsData);
router.get('/pinnacleOdd',pinnacleOdds.getPinnacleOdds);
module.exports = router;







































exports.getPreMatchData1 = async (req, res) => {
    try {
      const response = await axios.get('https://api.the-odds-api.com/v4/sports/soccer/odds', {
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
  
  
  
  exports.getPreMatchData = async (req, res) => {
    try {
      const response = await axios.get('https://api.the-odds-api.com/v4/sports/soccer/odds', {
        params: {
          apiKey: apiKey,
          regions: 'us', // Example regions
          markets: 'h2h'
        }
      });
  
      const data = response.data;
  
      if (!data || data.length === 0) {
        console.log('No active soccer games found.');
        res.json([]); // Return an empty array if no data is found
        return;
      }
  
      console.log('Fetched data:', data);
  
      // Process data and calculate surebets
      const surebets = calculatePreMatchBets(data);
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
      const region = event.region || 'Unknown Region'; // Extract region dynamically
      const gameName = event.competition && event.competition.name ? event.competition.name : 'Unknown Game'; // Extract game name dynamically
  
      
      console.log('Event data:', event);
  
      
      event.bookmakers.forEach(bookmaker => {
        if (!bookmaker.markets || !Array.isArray(bookmaker.markets)) {
          console.error('Invalid markets data for bookmaker:', bookmaker);
          return;
        }
  
        bookmaker.markets.forEach(market => {
          if (market.key !== 'h2h') return; // Ensure the market type is 'h2h'
  
          market.outcomes.forEach(outcome => {
            if (!oddsMap[outcome.name]) {
              oddsMap[outcome.name] = [];
            }
            oddsMap[outcome.name].push(outcome.price);
          });
        });
      });
  
   
      Object.keys(oddsMap).forEach(team => {
        const odds = oddsMap[team];
        if (odds.length < 2) return; 
  
        const totalImpliedProbability = odds.reduce((sum, odd) => sum + (1 / odd), 0);
  
        if (totalImpliedProbability < 1) {
         
          const totalStake = 100; // Example total stake
          const { stakes, profit } = calculateStakes(odds, totalStake);
  
       
          const isOdd = (totalImpliedProbability % 2) !== 0;
  
       
          surebets.push({
            title: eventTitle,
            region: region,
            gameName: gameName,
            team1: Object.keys(oddsMap)[0], 
            team2: Object.keys(oddsMap)[1], 
            odds,
            totalImpliedProbability,
            isOdd: isOdd ? 'Odd' : 'Even', 
            profit,
            stakes 
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
    const profit = (totalStake / totalImpliedProbability) - totalStake;
  
    return { stakes, profit };
  };
  
  
  
  
  const calculatePreMatchBets = (oddsData) => {
    const preMatchBets = [];
  
    if (!Array.isArray(oddsData)) {
      console.error('Invalid odds data:', oddsData);
      return preMatchBets;
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
  
      console.log('Event data:', event);
  
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
            oddsMap[outcome.name].push(outcome.price);
          });
        });
      });
  
      Object.keys(oddsMap).forEach(team => {
        const odds = oddsMap[team];
        if (odds.length < 1) return;
  
        const impliedProbabilities = odds.map(odd => 1 / odd);
        const totalImpliedProbability = impliedProbabilities.reduce((sum, prob) => sum + prob, 0);
  
        const expectedValue = odds.map((odd, index) => {
          const probability = impliedProbabilities[index] / totalImpliedProbability;
          return (odd - 1) * probability;
        }).reduce((sum, val) => sum + val, 0);
  
        if (expectedValue > 0) {
          preMatchBets.push({
            title: eventTitle,
            region: region,
            gameName: gameName,
            team: team,
            odds,
            expectedValue
          });
        }
      });
    });
  
    return preMatchBets;
  };