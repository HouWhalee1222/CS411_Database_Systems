DELIMITER $$
CREATE TRIGGER RegisterCheck
	BEFORE INSERT ON Customers
		FOR EACH ROW
	BEGIN
		SET @ExistPhoneNum = (
			SELECT Phone FROM Customers
			WHERE Phone = new.Phone
		);
		SET @ExistMaxId = (
			SELECT MAX(CustomerId)
			FROM Customers
		);

		IF @ExistPhoneNum IS NULL THEN
			SET new.CustomerId = @ExistMaxId + 1;
		ELSE
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "Duplicate Phone Number";
		END IF;
	END$$
DELIMITER ;

-- SHOW TRIGGERS;

-- INSERT INTO Customers(CustomerId, Password, Name, Phone)
-- VALUES(1000, "DummyPass1", "DummyName1", 1010101021);

-- SELECT * FROM Customers
-- WHERE Phone = 1010101021;

-- DROP TRIGGER RegisterCheck;