# Citas

A simple appointment app using [LoopBack](http://loopback.io) and [Aurelia](http://aurelia.io).

---

## Setup:
`npm install` and `cd client; npm install`

---

## Running for development:
On the root folder run `npm start`. The following urls will be available to you:

* [http://localhost:9000](http://localhost:9000) : The root of the app (with browser-sync).
* [http://localhost:3000/api](http://localhost:3000/api) : The API root URL.
* [http://localhost:3000/explorer](http://localhost:3000/explorer) : The API explorer.
* [http://localhost:3001](http://localhost:3001) : Browser-Sync configuration.
* [http://localhost:3000](http://localhost:3000) : The root of the app (no browser-sync).

---

## Models

### Person
(private)
* firstName: string
* lastName: string
* identification: string
* landLine: text
* mobile: text
* email: text
* notes: text

### Professional
Extends Person (public)
* specialties: string[]

### Client
Extends Person (public)

### AvailabilityTemplate
(public)
* timeStarts: integer
* timeEnds: integer
* limit: integer

### Availability
Extends AvailabilityTemplate (public)
* professional: Professional
* weekDay: integer
* timeStarts: integer
* timeEnds: integer
* limit: integer

### Appointment
(public)
* client: Client
* availability: Availability
* date: Date
* notes: text
