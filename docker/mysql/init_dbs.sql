CREATE DATABASE IF NOT EXISTS ecommerce;
CREATE DATABASE IF NOT EXISTS ecommerce_test;

GRANT ALL PRIVILEGES ON ecommerce.* TO 'ecommerce_user'@'%';
GRANT ALL PRIVILEGES ON ecommerce_test.* TO 'ecommerce_user'@'%';

FLUSH PRIVILEGES;
