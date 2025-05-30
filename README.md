# ClimaWear
### ClimaWear is an application that recommends outfits based on the weather temperature at the user's current location and can also predict the temperature at the destination the user plans to visit.

### You can check the application video at the following link [here](https://youtu.be/KoK0ozDcjuU)

---
# API Documentation

## Authentication

### 1. Register a User
**POST** `/register`

**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Response:**
- **201 Created**
```json
{
  "id": 1,
  "username": "string",
  "email": "string"
}
```
- **400 Bad Request**
```json
{
  "message": "Username is required"
}
```
- **400 Bad Request**
```json
{
  "message": "Email is required"
}
```
- **400 Bad Request**
```json
{
  "message": "Email format is wrong"
}
```
- **400 Bad Request**
```json
{
  "message": "Password is required"
}
```

---

### 2. Login a User
**POST** `/login`

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**
- **200 OK**
```json
{
  "access_token": "string"
}
```
- **400 Bad Request**
```json
{
  "message": "Username is required"
}
```
- **400 Bad Request**
```json
{
  "message": "Password is required"
}
```
- **401 Unauthorized**
```json
{
  "message": "Invalid username/password"
}
```

---

## Plans

### 1. Create a New Plan
**POST** `/plan/add-plan`

**Headers:**
```json
{
  "Authorization": "Bearer <access_token>"
}
```

**Request Body:**
```json
{
  "longitudeLocation": "float",
  "latitudeLocation": "float",
  "displayNameLocation": "string",
  "longitudeDestination": "float",
  "latitudeDestination": "float",
  "displayNameDestination": "string",
  "recommendationItems": "string",
  "timeTemperaturePredicted": "string",
  "StatusId": "integer"
}
```

**Response:**
- **201 Created**
```json
{
  "id": 1,
  "UserId": 1,
  "StatusId": 1,
  "longitudeLocation": 106.8473377,
  "latitudeLocation": -6.3546097,
  "displayNameLocation": "Depok",
  "longitudeDestination": 100.3632561,
  "latitudeDestination": -0.9247587,
  "displayNameDestination": "Padang",
  "recommendationItems": "{}",
  "timeTemperaturePredicted": "{}",
  "createdAt": "2023-10-01T00:00:00.000Z",
  "updatedAt": "2023-10-01T00:00:00.000Z"
}
```
- **400 Bad Request**
```json
{
  "message": "Validation error message"
}
```

---

### 2. Get Plans by User ID
**GET** `/plan/user`

**Headers:**
```json
{
  "Authorization": "Bearer <access_token>"
}
```

**Response:**
- **200 OK**
```json
[
  {
    "id": 1,
    "UserId": 1,
    "StatusId": 1,
    "longitudeLocation": 106.8473377,
    "latitudeLocation": -6.3546097,
    "displayNameLocation": "Depok",
    "longitudeDestination": 100.3632561,
    "latitudeDestination": -0.9247587,
    "displayNameDestination": "Padang",
    "recommendationItems": "{}",
    "timeTemperaturePredicted": "{}",
    "createdAt": "2023-10-01T00:00:00.000Z",
    "updatedAt": "2023-10-01T00:00:00.000Z"
  }
]
```
- **401 Unauthorized**
```json
{
  "message": "Invalid Token"
}
```

---

### 3. Get Plan by ID
**GET** `/plan/:id`

**Headers:**
```json
{
  "Authorization": "Bearer <access_token>"
}
```

**Response:**
- **200 OK**
```json
{
  "id": 1,
  "UserId": 1,
  "StatusId": 1,
  "longitudeLocation": 106.8473377,
  "latitudeLocation": -6.3546097,
  "displayNameLocation": "Depok",
  "longitudeDestination": 100.3632561,
  "latitudeDestination": -0.9247587,
  "displayNameDestination": "Padang",
  "recommendationItems": "{}",
  "timeTemperaturePredicted": "{}",
  "createdAt": "2023-10-01T00:00:00.000Z",
  "updatedAt": "2023-10-01T00:00:00.000Z"
}
```
- **404 Not Found**
```json
{
  "message": "Error not found"
}
```

---

### 4. Update Plan Status
**PUT** `/plan/:id`

**Headers:**
```json
{
  "Authorization": "Bearer <access_token>"
}
```

**Request Body:**
```json
{
  "statusId": "integer"
}
```
**Request Params:**
```json
{
  "id": "integer"
}
```

**Response:**
- **200 OK**
```json
{
  "id": 1,
  "StatusId": 2
}
```

---

### 5. Delete Plan by ID
**DELETE** `/plan/:id`

**Headers:**
```json
{
  "Authorization": "Bearer <access_token>"
}
```

**Request Params:**
```json
{
  "id": "integer"
}
```

**Response:**
- **200 OK**
```json
{
  "id": 1
}
```

---

## Data

### 1. Get Geocode Data
**GET** `/data/get-lon-lat`

**Headers:**
```json
{
  "Authorization": "Bearer <access_token>"
}
```

**Query Parameters:**
```json
{
  "city": "string",
  "country": "string"
}
```

**Response:**
- **200 OK**
```json
{
  "city": "Jakarta",
  "country": "Indonesia",
  "latitude": -6.2088,
  "longitude": 106.8456
}
```
- **400 Bad Request**
```json
{
  "message": "Please fill city"
}
```
- **400 Bad Request**
```json
{
  "message": "Please fill country"
}
```
- **404 Bad Request**
```json
{
  "message": "Location not found"
}
```

---

### 2. Get Location Name
**GET** `/data/get-location-name`

**Headers:**
```json
{
  "Authorization": "Bearer <access_token>"
}
```

**Query Parameters:**
```json
{
  "lat": "float",
  "lon": "float"
}
```

**Response:**
- **200 OK**
```json
{
  "city": "Jakarta",
  "country": "Indonesia",
  "latitude": -6.2088,
  "longitude": 106.8456
}
```
- **400 Bad Request**
```json
{
  "message": "Please fill latitude"
}
```
- **400 Bad Request**
```json
{
  "message": "Please fill longitude"
}
```

---

### 3. Get Temperature Data
**GET** `/data/get-temperature`

**Headers:**
```json
{
  "Authorization": "Bearer <access_token>"
}
```

**Query Parameters:**
```json
{
  "latitude": "float",
  "longitude": "float"
}
```

**Response:**
- **200 OK**
```json
{
  "latitude": -6.2088,
  "longitude": 106.8456,
  "timezone": "Asia/Jakarta",
  "temperature_type": "Celsius",
  "data": {
    "time": ["2023-10-01T00:00:00Z", "2023-10-01T01:00:00Z"],
    "temperature": [30, 29]
  }
}
```

---

### 4. Get Outfit Recommendations
**GET** `/data/gemini`

**Headers:**
```json
{
  "Authorization": "Bearer <access_token>"
}
```

**Query Parameters:**
```json
{
  "temperature": "integer"
}
```

**Response:**
- **200 OK**
```json
{
    "top": "T-shirt",
    "bottom": "Shorts",
    "outerwear": "None",
    "footwear": "Sandals",
    "accessories": "Sunglasses"
}
```
- **400 Bad Request**
```json
{
  "message": "Temperature is required"
}
```

---
