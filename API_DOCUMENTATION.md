# OpenLedger — API Documentation

**Base URL:** `http://localhost:8080/1805362`  
**Backend:** Java Servlets on Apache Tomcat 9  
**Database:** MySQL / MariaDB (`h2h_internship.invoice_details`)  
**Response Format:** `application/json; charset=UTF-8`  
**Authentication:** None

---

## Table of Contents

1. [Data Model](#data-model)
2. [Endpoints](#endpoints)
   - [GET /fetchdata.do](#get-fetchdatado)
   - [GET /addData.do](#get-adddatado)
   - [GET /editData.do](#get-editdatado)
   - [GET /deleteData.do](#get-deletedatado)
   - [GET /searchData.do](#get-searchdatado)
3. [CORS](#cors)
4. [Known Limitations](#known-limitations)

---

## Data Model

All endpoints work with the `invoice_details` table. The fields are listed below.

| Field | Type | Nullable | Description |
|---|---|---|---|
| `doc_id` | Long (PK) | No | Primary document ID |
| `invoice_id` | Long | Yes | Invoice number |
| `name_customer` | String | No | Customer full name |
| `cust_number` | String | No | Customer identifier |
| `business_code` | String | Yes | Business unit code |
| `business_year` | Integer | Yes | Fiscal year |
| `business_area` | String | Yes | Business area / division |
| `posting_date` | Date | Yes | GL posting date |
| `doc_create_date` | Date | Yes | Date document was created |
| `doc_type` | String | Yes | Document type (e.g. `IV`, `CR`) |
| `posting_id` | Integer | Yes | Posting line ID |
| `due_in_date` | Date | Yes | Invoice due date |
| `clear_date` | Date | Yes | Payment clearing date |
| `baseline_create_date` | Date | Yes | Baseline creation date |
| `inv_currency` | String | Yes | Currency code (e.g. `USD`, `EUR`) |
| `cust_payment_terms` | String | Yes | Payment terms (e.g. `NET30`) |
| `total_open_amount` | Double | No | Outstanding balance |
| `isOpen` | Integer | No | `1` = open, `0` = closed |
| `notes` | String | Yes | User-added notes (max 1000 chars) |

Dates are returned as ISO 8601 strings (e.g. `"2024-03-15T00:00:00.000+0000"`).  
`notes` is returned as an empty string `""` when `NULL` in the database.

---

## Endpoints

---

### GET /fetchdata.do

Fetches a paginated list of all invoice records.

**Request Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `limit` | Integer | Yes | Number of records per page |
| `count` | Integer | Yes | Page number (1-indexed) |

**Example Request**
```
GET /1805362/fetchdata.do?limit=10&count=1
```

**Example Response** `200 OK`
```json
[
  {
    "business_code": "U001",
    "cust_number": "C-1234",
    "name_customer": "Acme Corp",
    "clear_date": null,
    "business_year": 2024,
    "doc_id": 9000000001,
    "posting_date": "2024-01-15T00:00:00.000+0000",
    "doc_create_date": "2024-01-10T00:00:00.000+0000",
    "due_in_date": "2024-02-15T00:00:00.000+0000",
    "inv_currency": "USD",
    "doc_type": "IV",
    "posting_id": 1,
    "business_area": "WEST",
    "total_open_amount": 4500.00,
    "baseline_create_date": "2024-01-10T00:00:00.000+0000",
    "cust_payment_terms": "NET30",
    "invoice_id": 9000000001,
    "isOpen": 1,
    "notes": ""
  }
]
```

**Pagination Notes**
- Page 1 returns rows 0 – (limit − 1)
- Offset formula: `(limit) × (count − 1)`
- Returns an empty array `[]` when no records exist for the given page

---

### GET /addData.do

Inserts a new invoice record into the database.

> **Note:** This endpoint uses GET instead of POST. Parameters are passed as query string values.

**Request Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `name_customer` | String | Yes | Customer name |
| `cust_number` | String | Yes | Customer number |
| `invoice_id` | Long | Yes | Invoice ID (also used as `doc_id`) |
| `total_open_amount` | Double | Yes | Outstanding balance |
| `due_in_date` | String | Yes | Due date — format: `EEE MMM dd yyyy HH:mm:ss zzz` (e.g. `Fri May 31 2026 00:00:00 GMT+0530`) |
| `notes` | String | No | Optional notes (max 1000 chars) |

**Example Request**
```
GET /1805362/addData.do?name_customer=Acme+Corp&cust_number=C-1234&invoice_id=9000000099&total_open_amount=4500.00&due_in_date=Fri+May+31+2026+00:00:00+GMT%2B0530&notes=Follow+up+required
```

**Response** `200 OK`  
Empty response body. A successful insert returns HTTP 200 with no content.

---

### GET /editData.do

Updates the `total_open_amount` and `notes` of an existing invoice record.

> **Note:** This endpoint uses GET instead of PUT/PATCH.

**Request Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `invoice_id` | Long | Yes | The `doc_id` of the record to update |
| `total_open_amount` | Double | Yes | New outstanding balance |
| `notes` | String | Yes | Updated notes (pass empty string to clear) |

**Example Request**
```
GET /1805362/editData.do?invoice_id=9000000001&total_open_amount=2250.00&notes=Partially+paid
```

**Response** `200 OK`  
Empty response body.

---

### GET /deleteData.do

Deletes an invoice record by its document ID.

> **Note:** This endpoint uses GET instead of DELETE.

**Request Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `deleteId` | String | Yes | The `doc_id` of the record to delete |

**Example Request**
```
GET /1805362/deleteData.do?deleteId=9000000001
```

**Response** `200 OK`  
Empty response body.

---

### GET /searchData.do

Searches invoice records where `doc_id` starts with the given value. Supports pagination.

**Request Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `invoice_id` | String | Yes | Prefix to match against `doc_id` (uses `LIKE '{value}%'`) |
| `limit` | Integer | Yes | Number of records per page |
| `count` | Integer | Yes | Page number (1-indexed) |

**Example Request**
```
GET /1805362/searchData.do?invoice_id=900000&limit=10&count=1
```

**Example Response** `200 OK`  
Same array structure as [/fetchdata.do](#get-fetchdatado).

**Search Notes**
- Match is a prefix (starts-with) search on `doc_id`, not a full-text search
- Returns an empty array `[]` when no records match

---

## CORS

A global CORS filter applies to all endpoints.

| Header | Value |
|---|---|
| `Access-Control-Allow-Origin` | `*` |
| `Access-Control-Allow-Methods` | `GET, POST, PUT, DELETE, OPTIONS` |
| `Access-Control-Allow-Headers` | `Content-Type, Authorization` |

OPTIONS preflight requests return `200 OK` immediately.

---

## Known Limitations

| # | Issue | Detail |
|---|---|---|
| 1 | All mutations use GET | Add, Edit, and Delete operations should use POST, PUT/PATCH, and DELETE respectively |
| 2 | No authentication | Any client can read or modify data without credentials |
| 3 | No input validation | Parameters are not validated server-side before database operations |
| 4 | No error responses | Exceptions are logged to the console only; the client always receives `200 OK` |
| 5 | Hardcoded DB credentials | Connection string (`root`/`1234`) is hardcoded in each servlet |
| 6 | Permissive CORS | `Allow-Origin: *` should be restricted to `http://localhost:3000` in development |
| 7 | Date format sensitivity | `due_in_date` must match the exact verbose JS date format or parsing will fail silently |
