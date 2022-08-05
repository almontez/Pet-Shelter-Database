-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema pet_shelter v3.1
-- -----------------------------------------------------
-- ERD for the Pet Adoption DB

-- -----------------------------------------------------
-- Schema pet_shelter
--
-- ERD for the Pet Adoption DB
-- -----------------------------------------------------
-- CREATE SCHEMA IF NOT EXISTS `pet_shelter` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin ;
-- USE `pet_shelter`;

-- Remove any existing tables
SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS AdoptionRequests, Adopters_Pets, Adopters, Intakes, Pets, Personnel, AdoptionFeeCodes, AdoptionRequestStatusCodes, PersonnelTypeCodes, PetStatuses;
-- SET FOREIGN_KEY_CHECKS=1;


-- -----------------------------------------------------
-- Table `PetStatuses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PetStatuses` (
  `pet_status_id` INT NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(4) NOT NULL,
  `status` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`pet_status_id`),
  UNIQUE INDEX `status_UNIQUE` (`status` ASC),
  UNIQUE INDEX `code_UNIQUE` (`code` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AdoptionFeeCodes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `AdoptionFeeCodes` (
  `adoption_fee_id` INT NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(45) NOT NULL,
  `fee` DECIMAL(19,2) NOT NULL,
  PRIMARY KEY (`adoption_fee_id`),
  UNIQUE INDEX `code_UNIQUE` (`code` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Pets`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Pets` (
  `pet_id` INT NOT NULL AUTO_INCREMENT,
  `species` ENUM('dog', 'cat'), -- VARCHAR(45) NOT NULL COMMENT 'value set: {\'dog\' , \'cat\'}',
  `name` VARCHAR(45) NOT NULL,
  `breed` VARCHAR(45) NOT NULL,
  `age` DECIMAL(19,2) NOT NULL COMMENT 'Units: years',
  `gender` ENUM('M', 'F'), -- VARCHAR(1) NOT NULL COMMENT 'value set: {\'M\' = male, \'F\' = female}',
  `weight` DECIMAL(19,2) NOT NULL COMMENT 'Units: lbs',
  `coat_color` VARCHAR(45) NOT NULL,
  `adoption_status` INT NULL,
  `adoption_fee_type` INT NULL,
  PRIMARY KEY (`pet_id`),
  INDEX `fk_Pets_PetStatuses_idx` (`adoption_status` ASC),
  INDEX `fk_Pets_AdoptionFeeCodes_idx` (`adoption_fee_type` ASC),
  CONSTRAINT `fk_Pets_PetStatuses`
    FOREIGN KEY (`adoption_status`)
    REFERENCES `PetStatuses` (`pet_status_id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Pets_AdoptionFeeCodes`
    FOREIGN KEY (`adoption_fee_type`)
    REFERENCES `AdoptionFeeCodes` (`adoption_fee_id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Adopters`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Adopters` (
  `adopter_id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `address` VARCHAR(645) NOT NULL,
  `phone_number` VARCHAR(15) NOT NULL,
  `email` VARCHAR(320) NOT NULL,
  `birth_date` DATE NOT NULL,
  PRIMARY KEY (`adopter_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PersonnelTypeCodes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PersonnelTypeCodes` (
  `personnel_type_id` INT NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(3) NOT NULL,
  `personnel_type` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`personnel_type_id`),
  UNIQUE INDEX `personnel_type_UNIQUE` (`personnel_type` ASC),
  UNIQUE INDEX `code_UNIQUE` (`code` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Personnel`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Personnel` (
  `personnel_id` INT NOT NULL AUTO_INCREMENT,
  `personnel_type` INT NULL,
  `job_title` VARCHAR(45) NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `address` VARCHAR(45) NOT NULL,
  `phone_number` VARCHAR(15) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `birth_date` DATE NOT NULL,
  PRIMARY KEY (`personnel_id`),
  INDEX `fk_Personnel_PersonnelTypeCodes_idx` (`personnel_type` ASC),
  CONSTRAINT `fk_Personnel_PersonnelTypeCodes`
    FOREIGN KEY (`personnel_type`)
    REFERENCES `PersonnelTypeCodes` (`personnel_type_id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Intakes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Intakes` (
  `intake_id` INT NOT NULL AUTO_INCREMENT,
  `pet_id` INT NULL,
  `processor` INT NULL,
  `intake_date` DATE NOT NULL,
  `drop_off_type` ENUM('owner surrender', 'stray'), -- VARCHAR(45) NOT NULL COMMENT 'value set: {\'owner surrender\', \'stray\' }',
  `intake_details` VARCHAR(16000) NULL,
  PRIMARY KEY (`intake_id`),
  INDEX `fk_Intakes_Pets_idx` (`pet_id` ASC),
  INDEX `fk_Intakes_Personnel_idx` (`processor` ASC),
  CONSTRAINT `fk_Intakes_Pets`
    FOREIGN KEY (`pet_id`)
    REFERENCES `Pets` (`pet_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Intakes_Personnel`
    FOREIGN KEY (`processor`)
    REFERENCES `Personnel` (`personnel_id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Adopters_Pets`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Adopters_Pets` (
  `adopter_pet_id` INT NOT NULL AUTO_INCREMENT,
  `adopter_id` INT NOT NULL,
  `pet_id` INT NOT NULL,
  PRIMARY KEY (`adopter_pet_id`),
  INDEX `fk_Adopters_Pets_Pets_idx` (`pet_id` ASC),
  INDEX `fk_Adopters_Pets_Adopters_idx` (`adopter_id` ASC),
  CONSTRAINT `fk_Adopters_Pets_Pets`
    FOREIGN KEY (`pet_id`)
    REFERENCES `Pets` (`pet_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Adopters_Pets_Adopters`
    FOREIGN KEY (`adopter_id`)
    REFERENCES `Adopters` (`adopter_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AdoptionRequestStatusCodes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `AdoptionRequestStatusCodes` (
  `adoption_request_status_id` INT NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(1) NOT NULL,
  `status` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`adoption_request_status_id`),
  UNIQUE INDEX `code_UNIQUE` (`code` ASC),
  UNIQUE INDEX `status_UNIQUE` (`status` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AdoptionRequests`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `AdoptionRequests` (
  `adoption_request_id` INT NOT NULL AUTO_INCREMENT,
  `adopter_pet_id` INT NOT NULL,
  `processor` INT NULL,
  `request_date` DATE NOT NULL COMMENT 'Date when adoption request was first made',
  `application_status` INT NULL,
  `amount_paid` DECIMAL(19,2) NULL,
  PRIMARY KEY (`adoption_request_id`),
  INDEX `fk_AdoptionRequests_Personnel_idx` (`processor` ASC),
  INDEX `fk_AdoptionRequests_Adopters_Pets_idx` (`adopter_pet_id` ASC),
  UNIQUE INDEX `adopter_pet_id_UNIQUE` (`adopter_pet_id` ASC),
  INDEX `fk_AdoptionRequests_AdoptionRequestStatusCodes_idx` (`application_status` ASC),
  CONSTRAINT `fk_AdoptionRequests_Personnel`
    FOREIGN KEY (`processor`)
    REFERENCES `Personnel` (`personnel_id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `fk_AdoptionRequests_Adopters_Pets`
    FOREIGN KEY (`adopter_pet_id`)
    REFERENCES `Adopters_Pets` (`adopter_pet_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_AdoptionRequests_AdoptionRequestStatusCodes`
    FOREIGN KEY (`application_status`)
    REFERENCES `AdoptionRequestStatusCodes` (`adoption_request_status_id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB;

-- -------------------------------------------------------------------------------------------------------
-- INSERT QUERIES FOR SAMPLE DATA
-- -------------------------------------------------------------------------------------------------------
-- -----------------------------------------------------
-- Start Insert into PetStatuses
-- -----------------------------------------------------
INSERT INTO PetStatuses
(
    code,
	status
)
VALUES
(
    'HOLD',
    'On Hold'
),
(
    'APRV',
    'Approved for Adoption'
),
(
    'ADPT',
    'Adopted'
);

-- -----------------------------------------------------
-- Start Insert into AdoptionFeeCodes
-- -----------------------------------------------------
INSERT INTO AdoptionFeeCodes
(
    code,
	fee
)
VALUES
(
    'puppy',
    250.00
),
(
    'kitten',
	200.00
),
(
    'adult',
    150.00
),
(
    'senior',
    100.00
);

-- -----------------------------------------------------
-- Start Insert into Pets
-- -----------------------------------------------------
INSERT INTO Pets
(
    species,
    name,
    breed,
    age,
    gender,
    weight,
    coat_color,
    adoption_status,
    adoption_fee_type
)
VALUES
(
    'dog',
    'Cooper',
    'labrador mix',
    4.33,
    'M',
    77.19,
    'chocolate',
	(
		SELECT pet_status_id
		FROM PetStatuses
		WHERE PetStatuses.code = 'HOLD'
    ),
		(
			SELECT adoption_fee_id
			FROM AdoptionFeeCodes
			WHERE AdoptionFeeCodes.code = 'adult'
		)
),
(
    'dog',
    'Elsa',
    'husky mix',
    0.16,
    'F',
    8.75,
    'black and white',
	(
		SELECT pet_status_id
		FROM PetStatuses
		WHERE PetStatuses.code = 'ADPT'
    ),
	(
		SELECT adoption_fee_id
		FROM AdoptionFeeCodes
		WHERE AdoptionFeeCodes.code = 'puppy'
    )
),
(
    'dog',
    'Stitch',
    'chihuahua mix',
    8,
    'M',
    19.75,
    'tan',
	(
		SELECT pet_status_id
		FROM PetStatuses
		WHERE PetStatuses.code = 'APRV'
    ),
	(
		SELECT adoption_fee_id
		FROM AdoptionFeeCodes
		WHERE AdoptionFeeCodes.code = 'senior'
    )
),
(
    'cat',
    'Poppy',
    'domestic shorthair mix',
    2,
    'F',
    11,
    'orange',
	(
		SELECT pet_status_id
		FROM PetStatuses
		WHERE PetStatuses.code = 'APRV'
    ),
	(
		SELECT adoption_fee_id
		FROM AdoptionFeeCodes
		WHERE AdoptionFeeCodes.code = 'adult'
    )
),
(
    'cat',
    'Hugh',
    'domestic shorthair mix',
    0.25,
    'M',
    2.19,
    'black',
	(
		SELECT pet_status_id
		FROM PetStatuses
		WHERE PetStatuses.code = 'ADPT'
    ),
	(
		SELECT adoption_fee_id
		FROM AdoptionFeeCodes
		WHERE AdoptionFeeCodes.code = 'kitten'
    )
);

-- -----------------------------------------------------
-- Start Insert into Adopters
-- -----------------------------------------------------
INSERT INTO Adopters
(
	first_name,
	last_name,
	address,
	phone_number,
	email,
	birth_date
)
VALUES
(
    'Angela',
    'Montez',
    '2250 Molly St., San Francisco, CA 94115',
    '482-593-2845',
    'monteza@email.com',
    '1994-11-28'
),
(
    'Benjamin',
    'Ling',
    '526 Harvard Rd., Centreville, VA 20120',
    '125-547-3876',
    'lingb@email.com',
    '1992-10-22'
),
(
    'Sasha ',
    'Howard',
    '5062 Garfield Street, Ephrata, PA 17522',
    '656-235-8965',
    'howards@email.com',
    '1977-06-29'
),
(
    'Tim',
    'Smith',
    '9950 Strawberry Ave., Coraopolis, MN 55104',
    '693-097-2202',
    'smitht@email.com',
    '2002-04-16'
);

-- -----------------------------------------------------
-- Start Insert into PersonnelTypeCodes
-- -----------------------------------------------------
INSERT INTO PersonnelTypeCodes
(
	code,
	personnel_type
)
VALUES
(
    'EFT',
    'Employee Full-Time'
),
(
    'EPT',
    'Employee Part-Time'
),
(
    'VCT',
    'Volunteer - Cats'
),
(
    'VDO',
    'Volunteer - Dogs'
),
(
    'VCD',
    'Volunteer - Both'
);

-- -----------------------------------------------------
-- Start Insert into Personnel
-- -----------------------------------------------------
INSERT INTO Personnel
(
	personnel_type,
    job_title,
    first_name,
    last_name,
    address,
    phone_number, 
    email,
    birth_date
)
VALUES
(
	(
		SELECT personnel_type_id
		FROM PersonnelTypeCodes
		WHERE PersonnelTypeCodes.code = 'EFT'
    ),
    'Animal Intakes Manager',
    'Muriel',
    'Rashn',
    '778 Albany Circle, Arlingtion, NC, 28056',
    '252-204-2115',
    'murielr@email.com',
    '1996-06-09'
),
(
	(
		SELECT personnel_type_id
		FROM PersonnelTypeCodes
		WHERE PersonnelTypeCodes.code = 'EPT'
    ),
    'Front Desk Assistant',
    'Marie',
    'Cohnan',
    '850 Mountain View Ct., Arlington, NC 28059',
    '252-208-6330',
    'cohnanm@email.com',
    '2000-02-19'
),
(
	(
		SELECT personnel_type_id
		FROM PersonnelTypeCodes
		WHERE PersonnelTypeCodes.code = 'VCT'
    ),
    NULL,
    'Vanna',
    'Tran',
    '514 Gainsway St., Arlington, NC 28111',
    '252-129-1292',
    'tranv@email.com',
    '2004-04-18'
),
(
	(
		SELECT personnel_type_id
		FROM PersonnelTypeCodes
		WHERE PersonnelTypeCodes.code = 'VDO'
    ),
    NULL,
    'Arthur',
    'Brooks',
    '484 Woodland Rd., Arlington, NC 28959',
    '252-556-0695',
    'brooksa@email.com',
    '1995-05-30'
),
(
	(
		SELECT personnel_type_id
		FROM PersonnelTypeCodes
		WHERE PersonnelTypeCodes.code = 'VCD'
    ),
    NULL,
    'Bobby',
    'Lee',
    '393 Armstrong Rd., Arlington, NC 28056',
    '252-583-2816',
    'leeb@email.com',
    '2001-11-23'
);

-- -----------------------------------------------------
-- Start Insert into Intakes
-- -----------------------------------------------------
INSERT INTO Intakes
(
	pet_id,
    intake_date,
    processor,
    drop_off_type,
	intake_details
)
VALUES
(	-- Intakes row 1
    (
		SELECT pet_id
		FROM Pets
		WHERE Pets.name = 'Poppy'
    ),
    '2022-05-11',
    (
		SELECT personnel_id
		FROM Personnel
		WHERE Personnel.first_name = 'Muriel'
			  and Personnel.last_name = 'Rashn'
    ),
    'stray',
    'Poppy was found under a bridge'
),
(	-- Intakes row 2
    (
		SELECT pet_id
		FROM Pets
		WHERE Pets.name = 'Cooper'
    ),
    '2016-12-28',
    (
		SELECT personnel_id
		FROM Personnel
		WHERE Personnel.first_name = 'Muriel'
			  and Personnel.last_name = 'Rashn'
    ),
    'stray',
    'Picked up by animal services'
),
(	-- Intakes row 3
    (
		SELECT pet_id
		FROM Pets
		WHERE Pets.name = 'Stitch '
    ),
    '2009-05-17',
    (
		SELECT personnel_id
		FROM Personnel
		WHERE Personnel.first_name = 'Marie'
			  and Personnel.last_name = 'Cohnan'
    ),
    'owner surrender',
    'Pet surrendered by Alice'
),
(	-- Intakes row 4
    (
		SELECT pet_id
		FROM Pets
		WHERE Pets.name = 'Elsa'
    ),
    '2021-04-05',
    (
		SELECT personnel_id
		FROM Personnel
		WHERE Personnel.first_name = 'Marie'
			  and Personnel.last_name = 'Cohnan'
    ),
    'stray',
    NULL
),
(	-- Intakes row 5
    (
		SELECT pet_id
		FROM Pets
		WHERE Pets.name = 'Hugh'
    ),
    '2006-09-28',
    (
		SELECT personnel_id
		FROM Personnel
		WHERE Personnel.first_name = 'Muriel'
			  and Personnel.last_name = 'Rashn'
    ),
    'stray',
    'Pet found on corner of bush and black'
);

-- -----------------------------------------------------
-- Start Insert into AdoptionRequestStatusCodes
-- -----------------------------------------------------
INSERT INTO AdoptionRequestStatusCodes
(
	code,
	status
)
VALUES
(
    'A',
    'Approved'
),
(
    'U',
    'Under Review'
),
(
    'D',
    'Denied'
);

-- -----------------------------------------------------
-- Start Insert into Adopters_Pets
-- -----------------------------------------------------
INSERT INTO Adopters_Pets
(
	adopter_id,
	pet_id
)
VALUES
(  -- Adopters_Pets row 1
    (
		SELECT adopter_id
		FROM Adopters
		WHERE Adopters.first_name = 'Sasha'
			  and Adopters.last_name = 'Howard'
    ),
    (
		SELECT pet_id
		FROM Pets
		WHERE Pets.name = 'Poppy'
    )
),
(  -- Adopters_Pets row 2
    (
		SELECT adopter_id
		FROM Adopters
		WHERE Adopters.first_name = 'Benjamin'
			  and Adopters.last_name = 'Ling'
    ),
    (
		SELECT pet_id
		FROM Pets
		WHERE Pets.name = 'Hugh'
    )
),
(  -- Adopters_Pets row 3
    (
		SELECT adopter_id
		FROM Adopters
		WHERE Adopters.first_name = 'Tim'
			  and Adopters.last_name = 'Smith'
    ),
    (
		SELECT pet_id
		FROM Pets
		WHERE Pets.name = 'Stitch'
    )
),
(  -- Adopters_Pets row 4
    (
		SELECT adopter_id
		FROM Adopters
		WHERE Adopters.first_name = 'Angela'
			  and Adopters.last_name = 'Montez'
    ),
    (
		SELECT pet_id
		FROM Pets
		WHERE Pets.name = 'Elsa'
    )
);

  -- -----------------------------------------------------
-- Start Insert into AdoptionRequests
-- -----------------------------------------------------
INSERT INTO AdoptionRequests
(
	adopter_pet_id,
    processor,
    request_date,
    application_status,
    amount_paid
)
VALUES
(	-- AdoptionRequests row 1
    -- usually 1; adopter_pet_id for {adopter: Sasha Howard, pet: Poppy}
    (
		SELECT Adopters_Pets.adopter_pet_id
        FROM Adopters_Pets
		join Adopters on Adopters_Pets.adopter_id = Adopters.adopter_id
		join Pets on Adopters_Pets.pet_id = Pets.pet_id
		WHERE Adopters.first_name = 'Sasha'
		and Adopters.last_name = 'Howard'
        and Pets.name = 'Poppy'
        
    ),
    (
		SELECT personnel_id
		FROM Personnel
		WHERE Personnel.first_name = 'Muriel'
			  and Personnel.last_name = 'Rashn'
    ),
    '2022-05-18',
    (
		SELECT adoption_request_status_id
		FROM AdoptionRequestStatusCodes
		WHERE AdoptionRequestStatusCodes.code = 'U'
    ),
    NULL
),
(	-- AdoptionRequests row 2
    -- 2; adopter_pet_id for {adopter: Benjamin Ling, pet: Hugh}
    (
		SELECT Adopters_Pets.adopter_pet_id
        FROM Adopters_Pets
		join Adopters on Adopters_Pets.adopter_id = Adopters.adopter_id
		join Pets on Adopters_Pets.pet_id = Pets.pet_id
		WHERE Adopters.first_name = 'Benjamin'
		and Adopters.last_name = 'Ling'
        and Pets.name = 'Hugh'
        
    ),
    (
		SELECT personnel_id
		FROM Personnel
		WHERE Personnel.first_name = 'Muriel'
			  and Personnel.last_name = 'Rashn'
    ),
    '2006-10-02',
    (
		SELECT adoption_request_status_id
		FROM AdoptionRequestStatusCodes
		WHERE AdoptionRequestStatusCodes.code = 'A'
    ),
    200.00
),
(	-- AdoptionRequests row 3
    -- 3; adopter_pet_id for {adopter: Tim Smith, pet: Stitch}
    (
		SELECT Adopters_Pets.adopter_pet_id
        FROM Adopters_Pets
		join Adopters on Adopters_Pets.adopter_id = Adopters.adopter_id
		join Pets on Adopters_Pets.pet_id = Pets.pet_id
		WHERE Adopters.first_name = 'Tim'
		and Adopters.last_name = 'Smith'
        and Pets.name = 'Stitch'
        
    ),
    (
		SELECT personnel_id
		FROM Personnel
		WHERE Personnel.first_name = 'Marie'
			  and Personnel.last_name = 'Cohnan'
    ),
    '2009-05-29',
    (
		SELECT adoption_request_status_id
		FROM AdoptionRequestStatusCodes
		WHERE AdoptionRequestStatusCodes.code = 'D'
    ),
    NULL
),
(	-- AdoptionRequests row 4
    -- 4; adopter_pet_id for {adopter: Angela Montez, pet: Elsa}
    (
		SELECT Adopters_Pets.adopter_pet_id
        FROM Adopters_Pets
		join Adopters on Adopters_Pets.adopter_id = Adopters.adopter_id
		join Pets on Adopters_Pets.pet_id = Pets.pet_id
		WHERE Adopters.first_name = 'Angela'
		and Adopters.last_name = 'Montez'
        and Pets.name = 'Elsa'
        
    ),
    (
		SELECT personnel_id
		FROM Personnel
		WHERE Personnel.first_name = 'Marie'
			  and Personnel.last_name = 'Cohnan'
    ),
    '2021-04-09',
    (
		SELECT adoption_request_status_id
		FROM AdoptionRequestStatusCodes
		WHERE AdoptionRequestStatusCodes.code = 'A'
    ),
    250.00
);

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
