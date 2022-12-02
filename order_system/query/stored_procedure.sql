DELIMITER //
CREATE PROCEDURE GetTotalPrice(IN custID INT, IN ordID INT, OUT total REAL, OUT preTotal REAL, OUT discount REAL)
BEGIN

	DECLARE varDiscount REAL;
    DECLARE varPrice REAL;
	DECLARE varPrevTotalPrice REAL DEFAULT 0;
	DECLARE varCurrTotalPrice REAL;
	DECLARE varTmp REAL;
	DECLARE exit_loop BOOLEAN DEFAULT FALSE;
	

	-- Calculate total cost spent for a customer
	DECLARE cur CURSOR FOR (
		SELECT TotalPrice FROM Orders WHERE CustomerId = custID
	);

	DECLARE CONTINUE HANDLER FOR NOT FOUND SET exit_loop = TRUE;

	OPEN cur;
	cloop: LOOP
		FETCH cur INTO varPrice;
		IF(exit_loop) THEN
			LEAVE cloop;
    END IF;

		SET varPrevTotalPrice = varPrevTotalPrice + varPrice;

	END LOOP cloop;
	CLOSE cur;
    
    -- determine the discount
    IF(varPrevTotalPrice > 9000) THEN
        SET varDiscount = 0.7;
    ELSEIF(varPrevTotalPrice > 7000) THEN
        SET varDiscount = 0.8;
    ELSEIF(varPrevTotalPrice > 5000) THEN
        SET varDiscount = 0.9;
    ELSE
        SET varDiscount = 1.0;
    END IF;
			
	-- Calculate price of this order
	SELECT SUM(Price)
	INTO varCurrTotalPrice
	FROM OrderDishes NATURAL JOIN Dishes
	WHERE OrderId = ordID;

	SET discount = varDiscount;
	SET preTotal = varPrevTotalPrice;
	SET total = ROUND(varCurrTotalPrice * varDiscount, 2);

	UPDATE Orders SET TotalPrice = total WHERE OrderId = ordID;

END //
DELIMITER ;

-- CALL GetTotalPrice(2, 1, @total, @preTotal, @discount);
-- SELECT @total, @preTotal, @discount;


-- DROP PROCEDURE IF EXISTS GetTotalPrice;