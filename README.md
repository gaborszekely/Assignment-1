# Assignment-1 Submission For Pirple Node.js Masterclass

Welcome to my submission page! Here we have a fully functional RESTful API that parses a request body and returns a message based on the time of the day, the language requested and the user name provided.

To use, please make an HTTP POST request and specify a JSON object as the body with the following keys: "name" and "language" where the name is the user's name and the language is the desired language.

### Example Request:

```javascript
{
  "name": "Ben",
  "language": "English"
}
```

*(**Please note** - The language options available are English, French and Spanish. Other language choices will default to English.)*

Thanks, and enjoy the app!
