/**
9주차를 참조해서 뷰를 3개이상 작성
*/

CREATE VIEW v_users AS
SELECT user_id, user_name, phone_number, user_type
FROM userTBL;

-------------------

CREATE OR REPLACE VIEW v_user_spent AS
SELECT u.user_name AS
  이름 ,
  SUM(b. product_amount * b.purchase_count) AS 구매총액,
  u.user_type AS 회원등급
FROM buyTBL b
JOIN userTBL u ON b.user_id = u.user_id
GROUP BY u.user_name, u.user_type;

-------------------

CREATE OR REPLACE VIEW v_user_purchase_summary AS
SELECT u.user_name AS
  이름,
  SUM(b. product_amount *b.purchase_count) AS
  (
    SELECT b1. product_name FROM buyTBL b1
      WHERE b1.user_id = u.user_id
      GROUP BY b1.product_name
      ORDER BY SUM(b1.purchase_count)
      DESC LIMIT 1
  ) AS 가장많이 구매한_제품
FROM buyTBL b
JOIN userTBL u ON b.user_id = u.user_id
GROUP BY u.user_id, u.user_name;

/**
인덱스 3개 이상 생성
*/

CREATE INDEX idx_user_name ON userTBL(user_name);

CREATE INDEX idx_user_type ON userTBL(user_type);

CREATE UNIQUE INDEX idx_phone_number ON userTBL(phone_number);

CREATE INDEX idx_product_name ON buyTBL(product_name);


/**
저장 프로시저 2개 이상 작성
*/
DELIMITER //
CREATE PROCEDURE sp_user_insert
(
  IN p_user_name VARCHAR(9),
  IN p_email VARCHAR(255),
  IN p_phone_number VARCHAR(13),
  IN p_user_type ENUM('NORMAL','FAMILY','SILVER','GOLD','VIP','VVIP')
)
BEGIN
  INSERT INTO userTBL (user_name, email, phone_number, join_date, user_type)
  VALUES (p_user_name, p_email, p_phone_number, CURDATE(), p_user_type);
END //
DELIMITER ;

CALL sp_user_insert('이주희', 'wngml@wngml.com', '010-1111-2000', 'NORMAL');

DELIMITER //

CREATE PROCEDURE sp_buy_insert
(
  IN p_user_id INT,
  IN p_product_name VARCHAR(255),
  IN p_product_amount DECIMAL(10,2),
  IN p_purchase_count INT
)
BEGIN
  INSERT INTO buyTBL (user_id, product_name, product_amount, purchase_count)
  VALUES (p_user_id, p_product_name, p_product_amount, p_purchase_count);
END //

DELIMITER ;

CALL sp_buy_insert(15, '곰인형', 100000, 1);
CALL sp_buy_insert(15, '담배', 4500, 3);

/**
함수 2개 이상 작성
*/

DELIMITER //
CREATE FUNCTION fn_find_user_type
(
  p_user_id INT
) 
RETURNS ENUM('NORMAL','FAMILY','SILVER','GOLD','VIP','VVIP')
READS SQL DATA
BEGIN
  DECLARE v_user_type ENUM('NORMAL','FAMILY','SILVER','GOLD','VIP','VVIP');
  SELECT user_type INTO v_user_type
  FROM userTBL
  WHERE user_id = p_user_id;
  RETURN v_user_type;
END //

DELIMITER ;

SELECT fn_find_user_type(11);


DELIMITER //

CREATE FUNCTION fn_select_users_from_type
(
  p_user_type ENUM('NORMAL','FAMILY','SILVER','GOLD','VIP','VVIP')
)
RETURNS JSON
DETERMINISTIC
BEGIN
  DECLARE result JSON;
  SELECT JSON_ARRAYAGG(JSON_OBJECT('user_name', user_name, 'phone_number', phone_number))
  INTO result
  FROM userTBL
  WHERE user_type = p_user_type;
  RETURN result;
END //

DELIMITER ;

/**
커서 2개 이상 작성
*/
DELIMITER //

CREATE PROCEDURE sp_calculate_total_and_average_spending()
BEGIN
  DECLARE done INT DEFAULT 0;
  DECLARE v_user_id INT;
  DECLARE v_product_amount DECIMAL(10,2);
  DECLARE v_purchase_count INT;
  DECLARE totalAmount DECIMAL(10,2) DEFAULT 0;
  DECLARE rowCount INT DEFAULT 0;
  DECLARE averageAmount DECIMAL(10,2);
  
  DECLARE user_cursor CURSOR FOR
  SELECT user_id, product_amount, purchase_count
  FROM buyTBL;

  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

  OPEN user_cursor;
  
  read_loop: LOOP
    FETCH user_cursor INTO v_user_id, v_product_amount, v_purchase_count;
    IF done THEN
      LEAVE read_loop;
    END IF;

    SET totalAmount = totalAmount + (v_product_amount * v_purchase_count);
    SET rowCount = rowCount + 1;
  END LOOP;
  

  CLOSE user_cursor;
  
  IF rowCount > 0 THEN
    SET averageAmount = totalAmount / rowCount;
  ELSE
    SET averageAmount = 0;
  END IF;


  SET rowCount = rowCount + 1;
  
  SELECT rowCount AS 총_구매_횟수, totalAmount AS 매출_총액, averageAmount AS 구매_평균_금액;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE sp_count_users_by_type()
BEGIN
  DECLARE done INT DEFAULT 0;
  DECLARE v_user_type ENUM('NORMAL','FAMILY','SILVER','GOLD','VIP','VVIP');
  DECLARE v_count INT DEFAULT 0;

  DECLARE user_cursor CURSOR FOR
  SELECT user_type, COUNT(*) AS count
  FROM userTBL
  GROUP BY user_type;

  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

  OPEN user_cursor;

  read_loop: LOOP
    FETCH user_cursor INTO v_user_type, v_count;
    IF done THEN
      LEAVE read_loop;
    END IF;

    SELECT v_user_type AS user_type, v_count AS count;
  END LOOP;

  CLOSE user_cursor;
END //

DELIMITER ;

CALL sp_count_users_by_type;

/**
트리거 2개 이상 작성
*/
DELIMITER //

CREATE TRIGGER tr_user_insert
BEFORE INSERT ON userTBL
FOR EACH ROW
BEGIN
  DECLARE email_exists INT;
  DECLARE phone_number_exists INT;

  -- email이 이미 존재하는지 확인
  SELECT COUNT(*)
  INTO email_exists
  FROM userTBL
  WHERE email = NEW.email;

  -- email이 이미 존재하면 오류 발생
  IF email_exists > 0 THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = '이미 존재하는 이메일입니다.';
  END IF;

  -- phone_number가 이미 존재하는지 확인
  SELECT COUNT(*)
  INTO phone_number_exists
  FROM userTBL
  WHERE phone_number = NEW.phone_number;

  -- user_name이 이미 존재하면 오류 발생
  IF phone_number_exists > 0 THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = '이미 존재하는 전화번호입니다.';
  END IF;
END //

DELIMITER ;

DELIMITER //

CREATE TRIGGER tr_buy_insert
AFTER INSERT ON buyTBL
FOR EACH ROW
BEGIN 
  DECLARE v_user_type ENUM('NORMAL','FAMILY','SILVER','GOLD','VIP','VVIP');
  DECLARE v_total_spent DECIMAL(10,2);
  DECLARE v_user_id INT;

  -- user_id에 해당하는 user_type을 조회
  SELECT user_type INTO v_user_type
  FROM userTBL
  WHERE user_id = NEW.user_id;

  -- user_id에 해당하는 user가 구매한 총액을 조회
  SELECT SUM(product_amount * purchase_count) INTO v_total_spent
  FROM buyTBL
  WHERE user_id = NEW.user_id;

  -- user_type에 따라 userTBL의 user_type을 변경
  IF v_total_spent < 100000 THEN
    SET v_user_type = 'NORMAL';
  ELSEIF v_total_spent < 300000 THEN
    SET v_user_type = 'FAMILY';
  ELSEIF v_total_spent < 500000 THEN
    SET v_user_type = 'SILVER';
  ELSEIF v_total_spent < 1000000 THEN
    SET v_user_type = 'GOLD';
  ELSEIF v_total_spent < 2000000 THEN
    SET v_user_type = 'VIP';
  ELSE
    SET v_user_type = 'VVIP';
  END IF;

  -- userTBL의 user_type을 변경
  UPDATE userTBL
  SET user_type = v_user_type
  WHERE user_id = NEW.user_id;
END //

DELIMITER ;