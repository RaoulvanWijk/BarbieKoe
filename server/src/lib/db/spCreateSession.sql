-- create stored procedure with transaction for sessions table

DELIMITER $$
CREATE PROCEDURE `sp_create_session`(
  IN p_user_id INT,
  IN p_token VARCHAR(500)
)
BEGIN
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    ROLLBACK;
  END;

  START TRANSACTION;
    INSERT INTO sessions (user_id, token) VALUES (p_user_id, p_token);
  COMMIT;
END$$