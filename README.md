# Assignment-1 Submission For Pirple Node.js Masterclass

Thanks for checking out my submission. It is a fully functional RESTful API that parses a request body and returns a message based on the time of the day, the language requested and the user name provided.

To use, please make a POST HTTP request and specify a JSON object as the body with the following keys: "name" and "language" where the name is the user's name and the language is the desired language.

Example Request:

{
  "name": "Ben",
  "language": "English"
}

(Please note - The language options available are English, French and Spanish. Other language choices will default to English.)

Thanks, and enjoy the app!
