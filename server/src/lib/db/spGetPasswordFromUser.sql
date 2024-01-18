DROP PROCEDURE IF EXISTS sp_get_password_from_user;

DELIMITER //

CREATE PROCEDURE sp_get_password_from_user(
  IN p_id INT
)

BEGIN
  SELECT username, password, profile_picture FROM users WHERE id = p_id LIMIT 1;
END; //

DELIMITER ;