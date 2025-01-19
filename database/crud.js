const express = require('express');
const router = express.Router();
const connection = require('./database');

// Fonction de validation des données
function validateData(table, data) {
  const errors = [];

  if (table === 'produits') {
    if (!data.nom || typeof data.nom !== 'string' || data.nom.trim() === '') {
      errors.push('Nom obligatoire');
    }
    if (data.prix_unit == null || typeof data.prix_unit !== 'number' || data.prix_unit < 0) {
      errors.push('Le prix unitaire est obligatoire et doit être positif');
    }
    if (data.qtt_stock == null || !Number.isInteger(data.qtt_stock) || data.qtt_stock < 0) {
      errors.push('La quantité en stock est obligatoire et doit être positif');
    }
    if (!data.categorie || typeof data.categorie !== 'string' || data.categorie.trim() === '') {
      errors.push('La catégorie est obligatoire');
    }
  }

  if (table === 'lignes_commande') {
    if (data.qtt == null || !Number.isInteger(data.qtt) || data.qtt < 0) {
      errors.push('La quantité est obligatoire et doit être positif');
    }
    if (data.prix_unit_appl == null || typeof data.prix_unit_appl !== 'number' || data.prix_unit_appl < 0) {
      errors.push('Le prix unitaire appliqué est obligatoire et doit être positif');
    }
  }

  if (table === 'fournisseurs' || table === 'clients') {
    if (!data.nom || typeof data.nom !== 'string' || data.nom.trim() === '') {
      errors.push('Le nom est obligatoire');
    }
    if (!data.adresse || typeof data.adresse !== 'string' || data.adresse.trim() === '') {
      errors.push('L\'adresse est obligatoire');
    }
    if (!data.email || typeof data.email !== 'string' || data.email.trim() === '') {
      errors.push('L\'email est obligatoire');
    }
  }
  return errors;
}

// CRUD
function createCrudRoutes(table) {
  // Lister toutes les données de la table
  router.get(`/${table}`, function(req, res) {
    connection.query(`SELECT * FROM ${table}`, function(err, results) {
      if (err) throw err;
      res.json(results);
    });
  });

  // Lister une donnée de la table par son id
  router.get(`/${table}/:id`, function(req, res) {
    connection.query(`SELECT * FROM ${table} WHERE id = ?`, [req.params.id], function(err, results) {
      if (err) throw err;
      res.json(results[0]);
    });
  });

  // Ajouter une ligne dans la table
  router.post(`/${table}`, function(req, res) {
    const data = req.body;
    const errors = validateData(table, data);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    connection.query(`INSERT INTO ${table} SET ?`, data, function(err, results) {
      if (err) throw err;
      res.json({ id: results.insertId });
    });
  });

  // Modifier une ligne dans la table en fonction de son id
  router.put(`/${table}/:id`, function(req, res) {
    const data = req.body;
    const errors = validateData(table, data);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    connection.query(`UPDATE ${table} SET ? WHERE id = ?`, [data, req.params.id], function(err) {
      if (err) throw err;
      res.sendStatus(200);
    });
  });

  // Supprimer une ligne dans la table en fonction de son id
  router.delete(`/${table}/:id`, function(req, res) {
    connection.query(`DELETE FROM ${table} WHERE id = ?`, [req.params.id], function(err) {
      if (err) throw err;
      res.sendStatus(200);
    });
  });
}

createCrudRoutes('produits');
createCrudRoutes('fournisseurs');
createCrudRoutes('clients');
createCrudRoutes('commandes');
createCrudRoutes('lignes_commande');
createCrudRoutes('produits_fournisseurs');

// Requêtes supplémentaires

// Lister les commandes avec leurs lignes
router.get('/commandes/:id/lignes', function(req, res) {
  connection.query(`
    SELECT t0.id AS commande_id, t0.date_commande, t1.id AS ligne_commande_id, t1.produit_id, t2.nom AS nom_produit, t1.qtt, t1.prix_unit_appl
    FROM commandes t0
    INNER JOIN lignes_commande t1
      ON t0.id = t1.commande_id
    INNER JOIN produits t2
      on t1.produit_id = t2.id
    WHERE t0.id = ?
  `, [req.params.id], function(err, results) {
    if (err) throw err;
    res.json(results);
  });
});


// Lister les clients avec leurs commandes
router.get('/clients/commandes', function(req, res) {
  connection.query(`
    SELECT t0.id AS client_id, t0.nom, t0.adresse, t0.telephone, t0.email, t1.id AS commande_id, t1.date_commande
    FROM clients t0
    INNER JOIN commandes t1 
      ON t0.id = t1.client_id
    ORDER BY t0.id
  `, function(err, results) {
    if (err) throw err;
    res.json(results);
  });
});


// Lister les commandes d'un client
router.get('/clients/:id/commandes', function(req, res) {
  connection.query(`
    SELECT t0.id AS client_id, t0.nom, t0.adresse, t0.telephone, t0.email, t1.id AS commande_id, t1.date_commande
    FROM clients t0
    INNER JOIN commandes t1 
      ON t0.id = t1.client_id
    where t0.id = ?
  `, [req.params.id], function(err, results) {
    if (err) throw err;
    res.json(results);
  });
});

// Lister un produit avec ses fournisseurs
router.get('/produits_fournisseurs/:id/fournisseurs', function(req, res) {
  connection.query(`
    SELECT t0.*, t1.nom AS nom_produit, t2.nom AS nom_fournisseur 
    FROM produits_fournisseurs t0
    INNER JOIN produits t1 ON t0.produit_id = t1.id
    INNER JOIN fournisseurs t2 ON t0.fournisseur_id = t2.id
    WHERE t0.produit_id = ?
  `, [req.params.id], function(err, results) {
    if (err) throw err;
    res.json(results);
  });
});


// Lister les commandes par années
router.get('/commandes', function(req, res) {
  const startDate = req.query.start;
  const endDate = req.query.end;
  connection.query(`
    SELECT *
    FROM commandes
    WHERE date_commande BETWEEN ? AND ?
    ORDER BY date_commande
  `, [startDate, endDate], function(err, results) {
    if (err) throw err;
    res.json(results);
  });
});

// Lister les commandes qui contiennent un article précis
router.get('/produits/:id/commandes', function(req, res) {
  connection.query(`
    SELECT t0.id AS commande_id, t0.client_id, t0.date_commande, t1.id AS ligne_commande_id, t1.produit_id, t1.qtt, t1.prix_unit_appl
    FROM commandes t0
    INNER JOIN lignes_commande t1
      ON t0.id = t1.commande_id
    WHERE t1.produit_id = ?
  `, [req.params.id], function(err, results) {
    if (err) throw err;
    res.json(results);
  });
});


// Lister le top 30 des produits les plus vendus
router.get('/statistiques/produits-plus-vendus', function(req, res) {
  connection.query(`
    SELECT t1.produit_id, t2.nom AS produit_nom, SUM(t1.qtt) AS total_vendu
    FROM lignes_commande t1
    INNER JOIN produits t2 ON t1.produit_id = t2.id
    GROUP BY t1.produit_id, t2.nom
    ORDER BY total_vendu DESC
    LIMIT 30
  `, function(err, results) {
    if (err) throw err;
    res.json(results);
  });
});

// Lister le total d'articles disponibles par fournisseurs
router.get('/statistiques/articles-par-fournisseur', function(req, res) {
  connection.query(`
    SELECT t2.id AS fournisseur_id, t2.nom AS nom_fournisseur, SUM(t1.qtt_stock) AS total_articles
    FROM produits_fournisseurs t0
    INNER JOIN produits t1 ON t0.produit_id = t1.id
    INNER JOIN fournisseurs t2 ON t0.fournisseur_id = t2.id
    GROUP BY t2.id, t2.nom
    ORDER BY total_articles DESC
  `, function(err, results) {
    if (err) throw err;
    res.json(results);
  });
});

module.exports = router;