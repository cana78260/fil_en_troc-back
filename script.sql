

insert into messagerie (date, message) values ('15/12/2020', 'mmojjllllljjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj'), ('15/12/2022', 'mmojjllllljjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj');

insert into role (label) values ('user'), ('admin');



CREATE TABLE service (
	id serial NOT NULL,
	titre varchar(100) NOT NULL,
	localisation varchar(100) NOT NULL,
	departement varchar(100) NOT NULL,
	creation date NOT NULL,
	echeance date NOT NULL,
	note float NULL,
	libelle varchar(255) NOT NULL,
	"createurId" uuid NULL,
	"categorieId" int4 NULL,
	"clientId" uuid NULL,
	CONSTRAINT "PK_id" PRIMARY KEY (id),
	CONSTRAINT "FK_user_client_id" FOREIGN KEY ("clientId") REFERENCES "user"(id),
	CONSTRAINT "FK_category_id" FOREIGN KEY ("categorieId") REFERENCES category(id),
	CONSTRAINT "FK_createur_id" FOREIGN KEY ("createurId") REFERENCES "user"(id)
);





CREATE TABLE category (
	id serial NOT NULL,
	intitule varchar(100) NOT NULL,
	image varchar(100) NOT NULL,
	CONSTRAINT "service_id" PRIMARY KEY (id)
);

insert into category (intitule, image) values ('informatique', 'informatique2.png'), ('administratif', 'administratif.png'), ('animaux', 'animaux.png'), ('cours', 'cours2.png'), ('courses', 'courses.png'), ('depannage', 'depannage2.png'), ('démenagement', 'demenagement.png'), ('jardinage', 'jardinage.png'), ('nettoyage', 'nettoyage.png');