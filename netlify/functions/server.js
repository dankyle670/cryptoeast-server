const axios = require('axios');

exports.handler = async function(event, context)
{
  const { url } = event.queryStringParameters;

  if (!url) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'URL manquante dans la requête' })
    };
  }
  try {
    const response = await axios.get(url);
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Erreur lors de la récupération des données depuis l\'API externe', details: error.message })
    };
  }
};
