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

-------------------

CREATE INDEX idx_user_name ON userTBL(user_name);

CREATE INDEX idx_user_type ON userTBL(user_type);

CREATE UNIQUE INDEX idx_phone_number ON userTBL(phone_number);

CREATE INDEX idx_product_name ON buyTBL(product_name);