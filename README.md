# OpenLedger

A full-stack invoice management application. It bulk-imports invoice data from a CSV into MySQL, exposes it through a Java Servlet API, and renders it in a React UI with infinite scroll, add, edit, and delete.

## Architecture

```
 CSV ──► data-loader (JDBC)  ──►  MySQL/MariaDB  ◄──  backend (Servlets + Gson)  ◄──  frontend (React)
        one-off bulk import        invoice_details        /1805362/*.do  (JSON)            localhost:3000
```

| Folder | What it is | Tech |
|---|---|---|
| `frontend/` | React UI — table, infinite scroll, add / edit / delete | React 17, Material-UI 4, axios |
| `backend/` | JSON API served as a WAR (`1805362.war`) | Java 17, javax Servlets, Gson, Tomcat 9 |
| `data-loader/` | One-off CSV → database importer | Java 17, JDBC |
| `database/` | `schema.sql` + `1805362.csv` (50 k rows) | SQL |
| `extras/` | Unrelated college exercises (archived) | — |
| `.devstack/` | Portable dev runtime — MariaDB, Tomcat, Node 16 (**not committed**) | — |

Full API reference: [`API_DOCUMENTATION.md`](API_DOCUMENTATION.md)

---

## Prerequisites

| Tool | Version | Notes |
|---|---|---|
| Java | 17 | JDK required to compile |
| Maven | 3.x | For building backend and data-loader |
| MySQL / MariaDB | 5.7+ / 10.x | MariaDB is a drop-in replacement |
| Node.js | 16 | CRA 4 is incompatible with newer Node |
| Tomcat | 9 | Deploy the built WAR here |

---

## Setup

### 1. Configure database credentials

Each module reads credentials from a `db.properties` file that is **not committed** (it is in `.gitignore`). Copy the example file and fill in your values:

```bash
# Backend
copy backend\src\main\resources\db.properties.example backend\src\main\resources\db.properties

# Data loader
copy data-loader\src\main\resources\db.properties.example data-loader\src\main\resources\db.properties
```

`db.properties` format:
```properties
db.url=jdbc:mysql://localhost:3306/h2h_internship?useSSL=false
db.user=YOUR_DB_USER
db.pass=YOUR_DB_PASSWORD
```

### 2. Create the schema

```bash
mysql -u <user> -p < database\schema.sql
```

### 3. Load the data (one-time)

```bash
mvn -f data-loader/pom.xml exec:java -Dexec.arguments="<absolute-path-to>\database\1805362.csv"
```

### 4. Build and deploy the backend

```bash
mvn -f backend/pom.xml clean package
copy backend\target\1805362.war <tomcat-home>\webapps\
```

Start Tomcat — the API will be available at `http://localhost:8080/1805362/`.

### 5. Start the frontend

```bash
cd frontend
npm install
npm start
```

Open **http://localhost:3000** in your browser.

---

## Quick start (portable dev stack)

The `.devstack/` folder (not committed) bundles MariaDB, Tomcat 9, and Node 16 so no system installs are needed. Use the scripts after completing the credential and schema setup above:

```bat
.devstack\start-all.bat    :: starts MariaDB (3306) + Tomcat (8080) + React dev server (3000)
.devstack\stop-all.bat     :: stops all three
```

Then open **http://localhost:3000**.

---

## API endpoints

Base URL: `http://localhost:8080/1805362`

| Method | Path | Description |
|---|---|---|
| GET | `/fetchdata.do?limit=&count=` | Paginated list of invoices |
| GET | `/addData.do?name_customer=&cust_number=&invoice_id=&total_open_amount=&due_in_date=&notes=` | Add an invoice |
| GET | `/editData.do?invoice_id=&total_open_amount=&notes=` | Update an invoice |
| GET | `/deleteData.do?deleteId=` | Delete an invoice |
| GET | `/searchData.do?invoice_id=&limit=&count=` | Search invoices by doc ID prefix |

See [`API_DOCUMENTATION.md`](API_DOCUMENTATION.md) for request/response details and field descriptions.

---

## Notes

- **MySQL vs MariaDB:** the JDBC driver targets `com.mysql.jdbc.Driver` with a `jdbc:mysql://` URL. MariaDB is wire-compatible, so both work without any code changes.
- **Node version:** Create React App 4 (2020) is incompatible with Node 18+. Use Node 16.
- **CORS:** A `CorsFilter` is included so the React dev server on `:3000` can call the API on `:8080`.
- **Data:** `1805362.csv` is the original internship dataset (50,000 synthetic invoice rows).
