const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Exemple de base de données simulée
const yugiohCollection = { cartes: [] };

// Endpoint pour récupérer les noms des cartes depuis l'API Yu-Gi-Oh!
app.get('/api/cards', async (req, res) => {
    const cardNameQuery = req.query.name;
    const apiResponse = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${cardNameQuery}`);
    const data = await apiResponse.json();

    if (data.data) {
        const cardNames = data.data.map(card => card.name);
        res.json(cardNames);
    } else {
        res.status(404).json({ error: 'Carte non trouvée' });
    }
});

// Endpoint pour récupérer la collection de l'utilisateur
app.get('/api/collection', (req, res) => {
    res.json(yugiohCollection);
});

// Endpoint pour mettre à jour la collection de l'utilisateur
app.post('/api/updateCollection', (req, res) => {
    const { cardName, possede } = req.body;

    // Mettre à jour la collection en conséquence
    const existingCardIndex = yugiohCollection.cartes.findIndex(card => card.name === cardName);

    if (existingCardIndex === -1 && possede) {
        yugiohCollection.cartes.push({
            name: cardName,
            possede: true
        });
    } else if (existingCardIndex !== -1 && !possede) {
        yugiohCollection.cartes.splice(existingCardIndex, 1);
    }

    res.json(yugiohCollection);
});

app.listen(port, () => {
    console.log(`Serveur écoutant sur le port ${port}`);
});
