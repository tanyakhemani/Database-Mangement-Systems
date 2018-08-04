Follow below steps to run the application on local machine:

1. Download and install Visual Studio Code (VSC) IDE and NodeJS ( https://nodejs.org/en/ )  Both are free
2. From the DB folder execute Table script first and then SP script on some MySQL database
3. Ensure you choose the MySQL database server which is accessible from your laptop and network from which you will be testing
4. Open folder code/node in VSC
5. Modify config/db.json file to reflect DB connection details per the database used in step 2
6. Click menu View -> Integrated Terminal which will show TERMINAL dock window in VSC
7. In the TERMINAL window fire command: npm install
8. In the TERMINAL window fire command: npm start
9. Open web browser and navigate to http://localhost:2018
10. You should be able to see homepage with title CS540 - CryptoGambit Project [It may take up to 45 seconds to load]
11. Click Refresh link which will fetch latest quote data from CoinAPI.io and will derive if any arbitrage opportunities in new quote data
12. Arbitrage information will be shown on the UI in the form of table
13. Each row signifies one arbitrage opportunity and recommends two transactions viz one buy and one sell on two different exchanges