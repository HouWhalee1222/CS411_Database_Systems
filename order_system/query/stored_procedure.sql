DELIMITER //
CREATE PROCEDURE GetTotalPrice(IN custID INT, IN ordID INT, OUT total REAL, OUT oriTotal REAL, OUT preTotal REAL, OUT visits INT, OUT discount REAL)
BEGIN

	DECLARE varDiscount REAL;
    DECLARE varPrice REAL;
	DECLARE varPrevTotalPrice REAL DEFAULT 0;
	DECLARE varCurrTotalPrice REAL;
	DECLARE varNumVisit REAL;
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

 	-- Calculate total visiting times for a customer
	SELECT COUNT(OrderId)
    INTO varNumVisit 
    FROM Orders
	GROUP BY CustomerId
	HAVING CustomerId = custID;

    
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
        
    IF(varNumVisit > 30) THEN
        SET varDiscount = varDiscount - 0.15;
    ELSEIF(varNumVisit > 20) THEN
        SET varDiscount = varDiscount - 0.1;
    ELSEIF(varNumVisit > 10) THEN
        SET varDiscount = varDiscount - 0.05;
    END IF;
			
	-- Calculate price of this order
	SELECT SUM(Price*Amount)
	INTO varCurrTotalPrice
	FROM OrderDishes NATURAL JOIN Dishes
	WHERE OrderId = ordID;

	SET discount = varDiscount;
	SET preTotal = varPrevTotalPrice;
	SET oriTotal = varCurrTotalPrice;
	SET visits = varNumVisit;
	SET total = ROUND(varCurrTotalPrice * varDiscount, 2);
	

-- 	INSERT INTO Orders VALUES
-- 	(varMaxOrderID, NOW(), NOW(), total, custID, 1);

	UPDATE Orders SET TotalPrice = total WHERE OrderId = ordID;
	DELETE FROM OrderDishes WHERE OrderId = ordID;

END //
DELIMITER ;

CALL GetTotalPrice(5, 1, @total, @oriTotal, @preTotal, @visits, @discount);
SELECT @total, @preTotal, @oriTotal, @visits, @discount;