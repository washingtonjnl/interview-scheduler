# Run Server
To start the server on dev environment, run `yarn dev` in Terminal (at the root of the backend directory).

# CRUD
For all requests, use `http://localhost:3000` as the base url.

## Add Interviewer
Send a POST request for the route `/scheduler/add` and feed the body with the essential information of the interviewer.

The interviewer's core data is:

```
{
  name: { type: String, required: true },
  businessEmail: { type: String, required: true },
  profileImageURL: { type: String, required: true },
  ableSubjects: { type: Array, required: true },
  availabilityLink: { type: String, required: true }
}
```

**Tips:**

- Subjects must be inserted in portuguese. With all accents, capital letters, etc. (As well as registered in the base of the Tutors). They will be the filters for choosing the interviewers later, so BE CAREFUL AT THIS STEP!
- The image must be sent as a URL already hosted on a server like [imgbb.](https://pt-br.imgbb.com/)
- The link to the calendar will be the Calendly component modifier, so what should be sent is just what differs from one to the other.

## PUT

To update interviewers, use the route `/scheduler/edit/:id`, inserting the data you want to change in the body of the PUT request and the interviewer's id as route param.

**Tip:** the `id` can be acquired by listing all interviewers or doing a search by email.

To add subjects to an interviewer, use the route `/scheduler/add-subject/:email`, inserting in the body of the PUT request a json like:

```
{
  "subjects": Array
}
```

This `Array` should contain the subjects that will be added to the interviewer.

**Tip:** If you want to remove subjects, use the same structure as the previous process (add subjects), changing only the route to `/scheduler/remove-subject/:email`

## DELETE

There are two routes to delete data from the database:

- Remove interviewers by filtered email `/scheduler/remove`.
- Clear all database `/scheduler/clear`.

To exclude an interviewer, it is necessary to provide his email in the body of the request, following the format:

`{ "email": "interviewer.email@server.com" }`

The other method does not require body parameters.

**Tip:** The mothod required for this requests id `DELETE`.

## GET

There are two ways to get for interviewers in the database:

- Looking for an interviewer by email.
- Listing all interviewers.
- Listing interviewers by specific subject.

To view a specific interviewer, his email must be sent in the body of the GET request for route `/scheduler/find` following this format:

`{ "email": "interviewer.email@server.com" }`

To list all the interviewers or filter only interviewers able to evaluate specific subjects, the same route is used `/scheduler/list`.

If the request was sent without any query params, all registered interviewers must be returned. This route will be used by candidates in the personal interview stage.

To receive only interviewers who can evaluate the desired subject, it must be sent as a query parameter following the pattern below:

`?subject=SelectedSubject`

**Tip:** The subjects must be written in the same way as they were registered on database.

### Enjoy!