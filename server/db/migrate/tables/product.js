const query = `
    CREATE TABLE IF NOT EXISTS products (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        short_name VARCHAR(255) NOT NULL UNIQUE,
        description VARCHAR(255),
        price INT NOT NULL
    )
`;

module.exports = query;
