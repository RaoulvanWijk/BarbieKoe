-- Active: 1698413072752@@127.0.0.1@3306@barbiekoe
-- sp_get_user_with_session

DROP PROCEDURE IF EXISTS sp_get_user_with_session;

DELIMITER //

CREATE PROCEDURE sp_get_user_with_session(
    IN _session_token VARCHAR(700)
)

BEGIN
    
    SELECT users.id, users.username, users.profile_picture, users.created_at, users.updated_at, _session_token as token FROM users
    INNER JOIN sessions ON sessions.user_id = users.id
    WHERE sessions.token = _session_token;

END; //