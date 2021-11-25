INSERT INTO user (username, email, password)
VALUES 
    ('someguy', 'someguy@email.ca', 'somepassword'),
    ('anotherguy', 'anotherguy@email.ca', 'somepassword'),
    ('differentguy', 'differentguy@email.ca', 'somepassword'),
    ('somegirl', 'somegirl@email.ca', 'somepassword'),
    ('anothergirl', 'anothergirl@email.ca', 'somepassword'),
    ('differentgirl', 'differentgirl@email.ca', 'somepassword');


INSERT INTO post (text, user_id)
VALUES
    ('text1',1),
    ('text2',2),
    ('text3',3),
    ('text4',3),
    ('text5',3),
    ('text6',5);

-- INSERT INTO comment (comment_text)
-- VALUES
--     ('comment1'),
--     ('comment2'),
--     ('comment3'),
--     ('comment4'),
--     ('comment5'),
--     ('comment6');
