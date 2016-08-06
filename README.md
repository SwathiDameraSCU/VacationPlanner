# VacationPlanner

Vacation Planner is a web based travel application. </br>
The application should allows user to select desired travel locations and trip timelines and connect to various travel APIs to suggest optimal flights that match the user’s criteria.</br>
This has been developed similar to sites such as Expedia, Hotwire, Priceline, etc.</br>

## Instructions to run the Project: </br>

1. Install java jdk8. </br>
2. Get code "vacation_planner_server" code from the master</br>
•	If you have not cloned the repository already, do git clone.</br>
•	Else, switch to branch "master", do "git pull origin master".</br>
3. cd into "vacation_planner_server" directory.</br>

4. For linux/mac run "./activator". For windows run "activator.bat".</br>

5. For the first time it will take around 15 minutes to download all dependencies. After which you will see "[vacation_planner] $" </br>

6. Type "run" in the terminal. After the server has started, it will show you the message "Server Started" in the terminal and will tell you the Port Number on which it is listening for HTTP Requests.</br>

7.  In your browser, you can try "http://localhost:<Port Number>/airports" and it will you give the JSON object of the airports.</br>

8. Sample query for getting flight information</br>

  Round-Trip</br>
  http://localhost:<Port Number>/flights?origin=SFO&destination=JFK&departure-date=2016-02-14&adult-count=1&child-count=0&round-trip=true&arrival-date=2016-02-16</br>

  One-way</br>
  http://localhost:<Port Number>/flights?origin=SFO&destination=JFK&departure-date=2016-02-14&adult-count=1&child-count=0&round-trip=false</br>

## Steps to set up mongo db </br>

1.  Install mongodb - Installation intsructions -(http://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/)</br>

2. Open terminal: type "mongod" to start the db server.</br>
3. Open another tab and type "mongo" to start the db client.</br>
4. In the mongo db client terminal:</br>
    a. For creating database: " use Vacation_Planner"</br>
    b. For creating tables: "db.createCollection("Bookings", {autoIndexID: true})"</br>
    
## ScreenShot of the application
### Home page

![homepage](https://cloud.githubusercontent.com/assets/18272509/17456242/590b6986-5b86-11e6-9447-5da2beafed6e.png)
![homepage_ajax](https://cloud.githubusercontent.com/assets/18272509/17456245/5ab11bc8-5b86-11e6-9834-2f15b10071ac.png)
![homepage_calender](https://cloud.githubusercontent.com/assets/18272509/17456246/5db46be0-5b86-11e6-9618-afd130ca1728.png)
![homepage_details](https://cloud.githubusercontent.com/assets/18272509/17456247/5f3cab9e-5b86-11e6-89d1-77a6f15c20d3.png)

### Flights Page
![flightspage_loading](https://cloud.githubusercontent.com/assets/18272509/17456249/67063cdc-5b86-11e6-8b0a-71423c0188a3.png)
![flightpage_results](https://cloud.githubusercontent.com/assets/18272509/17456251/6aead588-5b86-11e6-8d87-3a41e0ad2aa5.png)
![flightpage_results_1](https://cloud.githubusercontent.com/assets/18272509/17456252/6d5e3d5a-5b86-11e6-8e65-990ace53fb31.png)

### Review Page
![reviewpage](https://cloud.githubusercontent.com/assets/18272509/17456257/7c54cc70-5b86-11e6-8260-38f75e76f657.png)
![reviewpage_stopinfo](https://cloud.githubusercontent.com/assets/18272509/17456259/808ddef8-5b86-11e6-82a2-85fcf670f007.png)
![reviewpage_stopinfo2](https://cloud.githubusercontent.com/assets/18272509/17456260/824d1970-5b86-11e6-9676-1d8c5bc93fa9.png)
![reviewpage_passenger_amt](https://cloud.githubusercontent.com/assets/18272509/17456261/8521f166-5b86-11e6-91ba-364b82da2426.png)

### Personal Info Screen
![personalinfo](https://cloud.githubusercontent.com/assets/18272509/17456263/8e8d03f8-5b86-11e6-9079-2bfd3905bdd9.png)
![personalinfo_details](https://cloud.githubusercontent.com/assets/18272509/17456264/903e0440-5b86-11e6-8894-4041c137afa2.png)

### Payment Details
![paymentdetails](https://cloud.githubusercontent.com/assets/18272509/17456265/95009f06-5b86-11e6-950d-81b86127bdf7.png)
![paymentdetails_info](https://cloud.githubusercontent.com/assets/18272509/17456266/96e7867c-5b86-11e6-8493-795d5618f512.png)

### Booking Confirmation Page
![bookingconfirmation](https://cloud.githubusercontent.com/assets/18272509/17456268/99841daa-5b86-11e6-92e8-1c2089d84306.png)

    
