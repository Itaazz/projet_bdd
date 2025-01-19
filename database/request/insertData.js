const connection = require('../database');


function insertData() { /*
  const insertFournisseurs = `
    INSERT INTO fournisseurs (nom, adresse, telephone, email) VALUES
    ('Aero Supplies', '123 Aviation St, Paris', '0232265354', 'contact@aerosupplies.com'),
    ('Sky Models', '456 Skyway Blvd, Lyon', '0145896325', 'info@skymodels.com'),
    ('Ajda', '789 Pilot Rd, Marseille', '0245876395', 'sales@flightgear.com'),
    ('Air Craft', '101 Jetstream Ave, Toulouse', '0413562254', 'support@aircraft.com'),
    ('Model Planes', '202 Runway Dr, Nice', '0213421102', 'contact@modelplanes.com'),
    ('Wings & Things', '303 Aviation St, Bordeaux', '0562348952', 'info@wingsandthings.com'),
    ('Prop Shop', '404 Pilot Rd, Nantes', '0426598555', 'contact@propshop.com'),
    ('Jet Set', '505 Cockpit Ct, Lille', '0326251489', 'support@jetset.com'),
    ('Aviation World', '606 Terminal Rd, Strasbourg', '0587946521', 'contact@aviationworld.com'),
    ('Plane Parts', '707 Airfield Blvd, Grenoble', '0123659845', 'info@planeparts.com');
  `;

  const insertProduits = `
    INSERT INTO produits (nom, prix_unit, qtt_stock, categorie) VALUES
    ('Fighting Falcon', 45.22, 100, 'Avions de chasse'),
    ('Boeing 747', 49.99, 20, 'Avions de ligne'),
    ('Cessna 172', 19.99, 200, 'Avions de tourisme'),
    ('Airbus A320', 78.22, 75, 'Avions de ligne'),
    ('Piper PA-28', 24.99, 65, 'Avions de tourisme'),
    ('F-22 Raptor', 34.99, 80, 'Avions de chasse'),
    ('Concorde', 44.99, 165, 'Avions de ligne'),
    ('Learjet 75', 22.99, 180, 'Jets privés'),
    ('F-35 Lightning II', 32.99, 90, 'Avions de chasse'),
    ('Airbus A380', 54.99, 40, 'Avions de ligne');
  `;

  const insertProduitsFournisseurs = `
    INSERT INTO produits_fournisseurs (produit_id, fournisseur_id) VALUES
    (1, 1), (1, 4), (1, 3), (2, 1), (5, 1),
    (4, 4), (3, 3), (3, 2), (6, 4), (7, 3);
  `;

  const insertClients = `
    INSERT INTO clients (nom, adresse, telephone, email) VALUES
    ('Jean Dupont', '12 Rue de la Paix, Paris', '0654823114', 'jean.dupont@example.com'),
    ('Marie Curie', '34 Avenue des Champs, Lyon', '0756948534', 'marie.curie@example.com'),
    ('Paul Martin', '56 Boulevard Saint-Germain, Marseille', '0645879632', 'paul.martin@example.com'),
    ('Sophie Durand', '78 Rue de Rivoli, Paris', '0623456789', 'sophie.durand@example.com'),
    ('Lucie Bernard', '90 Avenue de la République, Lille', '0612345678', 'lucie.bernard@example.com'),
    ('Pierre Lefevre', '123 Boulevard Haussmann, Paris', '0632147856', 'pierre.lefevre@example.com'),
    ('Julie Robert', '456 Rue de la Gare, Lyon', '0645879632', 'julie.robert@example.com'),
    ('Nicolas Petit', '789 Rue de la Liberté, Marseille', '0654789632', 'nicolas.petit@example.com'),
    ('Emma Moreau', '101 Avenue de la Liberté, Bordeaux', '0623456789', 'emma.moreau@example.com'),
    ('Louis Dubois', '202 Rue de la République, Strasbourg', '0612345678', 'louis.dubois@example.com');
  `;

  const insertCommandes = `
    INSERT INTO commandes (client_id, date_commande) VALUES
    (1, '2023-01-01'),
    (2, '2023-01-02'),
    (3, '2023-01-03'),
    (4, '2023-01-04'),
    (5, '2023-01-05'),
    (6, '2023-01-06'),
    (7, '2023-01-07'),
    (8, '2023-01-08'),
    (9, '2023-01-09'),
    (10, '2023-01-10');
  `;

  const insertLignesCommande = `
    INSERT INTO lignes_commande (commande_id, produit_id, qtt, prix_unit_appl) VALUES
    (1, 1, 10, 45.22),
    (1, 2, 5, 49.99),
    (2, 3, 20, 19.99),
    (2, 4, 15, 78.22),
    (3, 5, 10, 24.99),
    (3, 6, 8, 34.99),
    (4, 7, 12, 44.99),
    (4, 8, 18, 22.99),
    (5, 9, 9, 32.99),
    (5, 10, 4, 54.99);
  `;

  connection.query(insertFournisseurs, function(err) {
    if (err) throw err;
    console.log('Données insérées dans la table fournisseurs');
  });

  connection.query(insertProduits, function(err) {
    if (err) throw err;
    console.log('Données insérées dans la table produits');
  });

  connection.query(insertProduitsFournisseurs, function(err) {
    if (err) throw err;
    console.log('Données insérées dans la table produits_fournisseurs');
  });

  connection.query(insertClients, function(err) {
    if (err) throw err;
    console.log('Données insérées dans la table clients');
  });

  connection.query(insertCommandes, function(err) {
    if (err) throw err;
    console.log('Données insérées dans la table commandes');
  });

  connection.query(insertLignesCommande, function(err) {
    if (err) throw err;
    console.log('Données insérées dans la table lignes_commande');
  })*/
}

module.exports = insertData; 