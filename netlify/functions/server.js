const axios = require('axios');

exports.handler = async function(event, context) {
  const { url } = event.queryStringParameters; // Utilisation des paramètres de la requête

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
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erreur lors de la récupération des données depuis l\'API externe' })
    };
  }
};
