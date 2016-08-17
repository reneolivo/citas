# Citas

A simple appointment app using [LoopBack](http://loopback.io) and [Aurelia](http://aurelia.io).

## Models

### Person ### (private)
* firstName: string
* lastName: string
* identification: string
* landLine: text
* mobile: text
* email: text
* notes: text

### Professional ### Extends Person (public)
* specialties: string[]

### Client ### Extends Person (public)

### AvailabilityTemplate ### (public)
* timeStarts: integer
* timeEnds: integer
* limit: integer

### Availability ### Extends AvailabilityTemplate (public)
* professional: Professional
* weekDay: integer
* timeStarts: integer
* timeEnds: integer
* limit: integer

### Appointment ### (public)
* client: Client
* availability: Availability
* date: Date
* notes: text
