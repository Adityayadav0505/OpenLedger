-- Schema for the H2H internship invoice app.
-- Reconstructed from:
--   * JDBC/milestone1 loader  -> column order of the 18-value INSERT
--   * Servlets/milestone2      -> the column names read back via rs.getXxx("...")
--
-- The loader inserts 18 columns (positional). milestone2 added a 19th column
-- `notes`, which must be nullable so the loader's 18-column INSERT still works.
-- `doc_id` is the primary key (the loader de-duplicates on it).

CREATE DATABASE IF NOT EXISTS h2h_internship;
USE h2h_internship;

DROP TABLE IF EXISTS invoice_details;

CREATE TABLE invoice_details (
  business_code         VARCHAR(20),
  cust_number           VARCHAR(20),
  name_customer         VARCHAR(255),
  clear_date            DATETIME      NULL,
  business_year         INT,
  doc_id                BIGINT        NOT NULL,
  posting_date          DATE          NULL,
  document_create_date  DATE          NULL,
  due_in_date           DATE          NULL,
  invoice_currency      VARCHAR(10),
  document_type         VARCHAR(10),
  posting_id            INT,
  area_business         VARCHAR(50)   NULL,
  total_open_amount     DOUBLE,
  baseline_create_date  DATE          NULL,
  cust_payment_terms    VARCHAR(20),
  invoice_id            BIGINT        NULL,
  isOpen                INT,
  notes                 VARCHAR(1000) NULL,
  PRIMARY KEY (doc_id)
);
