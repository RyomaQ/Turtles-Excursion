CREATE TABLE IF NOT EXISTS users (
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  pwd VARCHAR(255) NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE,
  activities TEXT NOT NULL DEFAULT '[]',
  registration DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS activities (
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  date DATETIME NOT NULL,
  location VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL,
  images TEXT NOT NULL DEFAULT '[]',
  score DECIMAL(10, 2) NOT NULL DEFAULT 0
);

-- UPDATE users set activities = '' WHERE rowid = 1;

 DELETE FROM activities WHERE rowid = 3;

-- INSERT INTO activities (title, description, date, location, price, images, score)
-- VALUES 
--   ('Sortie dans l’espace', "Lancez-vous dans une mission spatiale inédite à dos de tortue, traversant galaxies et étoiles. À une vitesse lente, l’univers se dévoile lentement, offrant une vue majestueuse sur les planètes et nébuleuses. Une aventure cosmique où chaque instant devient une exploration fascinante du temps et de l’espace.", '2026-03-20', 'Espace', 500, '["/images/space_1.webp", "/images/space_2.webp", "/images/space_3.webp"]', 5),
--   ('Expédition Titanic', "Plongez dans les profondeurs de l’Atlantique à la découverte du Titanic, à dos de tortue sous-marine. À une vitesse ultra lente, explorez les épaves du célèbre navire, en admirant les poissons et la faune marine. Un voyage où chaque détail, chaque mouvement devient une immersion dans l’histoire sous-marine.", '2023-11-02 08:00:00', 'Mountain Trail', 300, '["/images/titanic_1.webp", "/images/titanic_2.webp", "/images/titanic_3.webp"]', 4.8);


