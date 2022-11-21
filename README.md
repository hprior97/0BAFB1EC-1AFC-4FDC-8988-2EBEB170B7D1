# ACER Report 📚

ACER Report is a CLI completed as a code challenge for a job interview at ACER.  
This reporting software is designed to analyse a series of JSON formatted data sources to provide an insight on the performance of a student, whilst providing them with pointers on where mistakes were made and how to correct for them in the future. 

## Installation ⬇️
1. Ensure that Node.js is configured correctly
1. CD into the downloaded directory 
3. Run `npm test` to execute unit tests
4. Run `npm start` to run the application 

## Instructions for Use 📄

The ACER Report CLI asks the user for two data points to generate the report, firstly their Student ID, and then the number corresponding to which report they would like to generate, like below: 

```
Please enter the following
Student ID: student1
Report to generate (1 for Diagnostic, 2 for Progress, 3 for Feedback): <report-number-by-user>
```

At the time of publishing, the `Diagnostic` Report is not yet available. 

## Problems ⚠️

* `assessments.json` appears to have some issues with the `questions` array. Given their format I would imagine that these question dictionaries are supposed to relate to those in the responses array of each StudentResponse dictionary in student-responses.json. Given the limited data available these records were not of much use in the development of this project.

## Improvements 🤔

* Diagnostic report still under development, to be included in upcoming push. 

* Certain modifications need to be made to improve type safety and mutability concerns.

* Graceful handling of a lack of data.

* Modifications to the data schema of this app would significantly cut down on the complexity involved in surfacing some of these reports.

* Upgrading the data/repository layer of this app to utilise a database or REST API would dramatically increase scalability and move certain data manipulation processes out of the frontend code. For example, querying data in SQL would be more efficient than doing so in Typescript. The more modular repository architecture should make a switch like this relatively straight forward. 

* Repository design allows for easy improvements to include more advanced, type specific data operations where necessary, or broader data operations through the base-repo should we need them. Subclass stubs are in place without these potential future methods in a couple of instances. 

## Fixes 🔨

* Replaced definite assignment assertions in FeedbackService.outputReportData() to more gracefully handle potentially undefined data. 


## Contact 📇

Written by Hamish Prior.  
0404 826 691  
[hamishprior@me.com](mailto:hamishprior@me.com)