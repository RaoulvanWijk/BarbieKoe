DROP PROCEDURE IF EXISTS sp_get_session;

DELIMITER //

CREATE PROCEDURE sp_get_session(
    IN _session_token VARCHAR(255)
)

BEGIN
    
    SELECT * FROM sessions WHERE `token` = _session_token;

END; //

DELIMITER ; 