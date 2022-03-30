# WTF API

## Install dependencies:
npm install

## Run API:
Development mode: npm run dev
Production mode: npm run prod

## Usage:
Endpoints:
- GET /acronym?from=50&limit=10&search=:search
    Returns a list of acronyms paginated (pagination is 0 index)
    from: page
    limit: amount of shown results 
    search: acronym to search

- POST /acronym
    adds an acronym to acronym.json
    receives an acronym and definition strings in the body

- PUT /acronym/:acronym
    receives an /:acronym and definition strings and updates the matched acronym found on acronym.json
    the defintion string comes in the body and its key name has to be have 'newAcronymValue'
    athentication credentials have to come in headers. Authorized credentials are 'user:admin' and 'password:password'
    acronym: name of acronym to be updated

- DELETE /acronym/:acronym
    deletes /:acronym
    athentication credentials have to come in headers. Authorized credentials are 'user:admin' and 'password:password'
    acronym: name of acronym to be updated







