DROP PROCEDURE IF EXISTS sp_get_users;

DELIMITER //

CREATE PROCEDURE sp_get_users()

BEGIN
    
    SELECT id, username, profile_picture, created_at, updated_at FROM users;

END; //

DELIMITER ;