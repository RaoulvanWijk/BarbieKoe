-- create stored procedure with transaction for sessions table

DELIMITER $$
CREATE PROCEDURE `sp_delete_session`(
  IN _session_token VARCHAR(700)
)
BEGIN
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    ROLLBACK;
  END;

  START TRANSACTION;
    DELETE FROM sessions WHERE `token` = _session_token;
  COMMIT;
END$$