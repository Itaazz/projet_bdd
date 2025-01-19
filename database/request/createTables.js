const connection = require('../database');


function createTables() {
  
  const createFournisseursTable = `
      CREATE TABLE IF NOT EXISTS fournisseurs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nom VARCHAR(50) NOT NULL,
        adresse VARCHAR(100) NOT NULL,
        telephone VARCHAR(25),
        email VARCHAR(100) NOT NULL
      );
    `;

  const createProduitsTable = `
      CREATE TABLE IF NOT EXISTS produits (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nom VARCHAR(50) NOT NULL,
        prix_unit DECIMAL(10, 2) NOT NULL,
        qtt_stock INT NOT NULL,
        categorie VARCHAR(50) NOT NULL
      );
    `;

  const createProduitsFournisseursTable = `
      CREATE TABLE IF NOT EXISTS produits_fournisseurs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        produit_id INT NOT NULL,
        fournisseur_id INT NOT NULL,
        FOREIGN KEY (produit_id) REFERENCES produits(id),
        FOREIGN KEY (fournisseur_id) REFERENCES fournisseurs(id)
      );
    `;

  const createClientsTable = `
      CREATE TABLE IF NOT EXISTS clients (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nom VARCHAR(50) NOT NULL,
        adresse VARCHAR(100) NOT NULL,
        telephone VARCHAR(25),
        email VARCHAR(100) NOT NULL
      );
    `;

  const createCommandesTable = `
      CREATE TABLE IF NOT EXISTS commandes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        client_id INT NOT NULL,
        date_commande DATE NOT NULL,
        FOREIGN KEY (client_id) REFERENCES clients(id)
      );
    `;

  const createLignesCommandeTable = `
      CREATE TABLE IF NOT EXISTS lignes_commande (
        id INT AUTO_INCREMENT PRIMARY KEY,
        commande_id INT NOT NULL,
        produit_id INT NOT NULL,
        qtt INT NOT NULL,
        prix_unit_appl DECIMAL(10, 2) NOT NULL,
        FOREIGN KEY (commande_id) REFERENCES commandes(id),
        FOREIGN KEY (produit_id) REFERENCES produits(id)
      );
    `;

  connection.query(createFournisseursTable, function(err) {
    if (err) throw err;
    console.log('Table fournisseurs créée');
  });

  connection.query(createProduitsTable, function(err) {
    if (err) throw err;
    console.log('Table produits créée');
  });

  connection.query(createProduitsFournisseursTable, function(err) {
    if (err) throw err;
    console.log('Table produits_fournisseurs créée');
  });

  connection.query(createClientsTable, function(err) {
    if (err) throw err;
    console.log('Table clients créée');
  });

  connection.query(createCommandesTable, function(err) {
    if (err) throw err;
    console.log('Table commandes créée');
  });

  connection.query(createLignesCommandeTable, function(err) {
    if (err) throw err;
    console.log('Table lignes_commande créée'); 
  }); 
}

module.exports = createTables;