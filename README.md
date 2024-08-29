
# Measure API

This project  is a simple API for reading meter readings using Gemini API.

## Features

- Uses Gemini API to read meter readings
- Store and list readings for each customer
- Confirm the AI readings manually

### To be added

* External database integration
* Unit tests

## Running

### Environment Variables

`PORT` - The port to run the server on
`GEMINI_API_KEY` - The API key for Gemini

### Local (development)

Run the following command to start the server:

```bash
npm run dev
```

### Docker (production)

Run the following command to build and run the Docker container using Docker Compose:

```bash
docker compose up --build
```

## Routes

### Upload

`POST /api/upload` - Send a base64 image containing a meter for reading

#### Example Request
````json
{
	"image": "/9j/4AAQSkZJRgABAQAAAQABAAD...",
	"customer_code": "500",
	"measure_datetime": "2025-11-01T14:01:02+0000",
	"measure_type": "WATER" // WATER or GAS
}
````

#### Example Response
````json
{
  "image_url": "/9j/4AAQSkZJRgABAQAAAQABAAD...",
  "measure_value": 1200,
  "measure_uuid": "8b0d3832-b44d-4842-b0cc-b39751356c1a"
}
````

### Confirm

`PATCH /api/confirm` - Confirms the estimated value a measure

#### Example Request
````json
{
	"measure_uuid": "8b0d3832-b44d-4842-b0cc-b39751356c1a",
	"confirmed_value": 1250
}
````

#### Example Response
````json
{
  "success": true
}
````

### List

`GET /api/:customerCode/list` - Get a list of measures for a customer

#### Example Response
````json
{
  "customer_code": "500",
  "measures": [
    {
      "measure_uuid": "8b0d3832-b44d-4842-b0cc-b39751356c1a",
      "measure_datetime": "2025-11-01T14:01:02+0000",
      "measure_type": "WATER",
      "measure_value": 1250,
      "has_confirmed": true,
      "image_url": "/9j/4AAQSkZJRgABAQAAAQABAAD..."
    }
  ]
}
````

## License

This project is licensed under the GPL-3.0-only License
