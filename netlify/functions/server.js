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
      headers: {
        'Access-Control-Allow-Origin': '*', // Autoriser toutes les origines
        'Access-Control-Allow-Methods': 'GET, OPTIONS', // Méthodes autorisées
        'Content-Type': 'application/json' // Type de contenu
      },
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*', // Assurez-vous d'ajouter les en-têtes CORS ici aussi
      },
      body: JSON.stringify({ error: 'Erreur lors de la récupération des données depuis l\'API externe', details: error.message })
    };
  }
};
