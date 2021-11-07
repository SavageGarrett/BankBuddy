# Bank Buddy
Bank Buddy is a React SPA, which aims to educate children on internet banking. The platform features two views, one for parents and one for children. Parents are able to assign chores to their children for a monetary value. Upon completion of the chore, the child's checking account balance will increase, to simulate a receiving of income. The child is able to move their money between their money between their savings account and checking account.

## Tech Stack
The core dynamic content of the app is built on React and hosted on [netlify](https://bankbuddy.netlify.app "netlify"). The dyanamic content is loaded from a PostgreSQL database and served through an AWS Lambda Function. The react source code can be found in the banking-for-kids directory. The code for the lambda functions can be found in the [add_lambda_code](https://github.com/SavageGarrett/Pivot/tree/add_lambda_code "add_lambda_code") branch.

## Challenge Track
This project was build for the Hack OHI/O hackathon, under the Capital One Challenge Track.
