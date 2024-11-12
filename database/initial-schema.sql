CREATE TABLE user_roles (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    created_by INT NOT NULL REFERENCES users(id),
    updated_by INT REFERENCES users(id),
    active BOOLEAN DEFAULT TRUE
);

CREATE TABLE genders (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(10) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    created_by INT NOT NULL REFERENCES users(id),
    updated_by INT REFERENCES users(id),
    active BOOLEAN DEFAULT TRUE
);

CREATE TABLE users (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    gender VARCHAR(10) NOT NULL REFERENCES genders(name),
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL REFERENCES user_roles(name),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    created_by INT NOT NULL REFERENCES users(id),
    updated_by INT REFERENCES users(id),
    active BOOLEAN DEFAULT TRUE
);

CREATE TABLE companies (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    trade_name VARCHAR(255) NOT NULL UNIQUE,
    legal_name VARCHAR(255) NOT NULL UNIQUE,
    pan_number VARCHAR(20) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    created_by INT NOT NULL REFERENCES users(id),
    updated_by INT REFERENCES users(id),
    active BOOLEAN DEFAULT TRUE
);

CREATE TABLE company_branches (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INT NOT NULL REFERENCES companies(id),
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL,
    country VARCHAR(50) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    google_map_link VARCHAR(255),
    geo_location VARCHAR(255),
    gst_number VARCHAR(20) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    created_by INT NOT NULL REFERENCES users(id),
    updated_by INT REFERENCES users(id),
    active BOOLEAN DEFAULT TRUE
);

CREATE TABLE packages (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    duration INT NOT NULL,
    max_listings INT NOT NULL,
    max_featured_listings INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    created_by INT NOT NULL REFERENCES users(id),
    updated_by INT REFERENCES users(id),
    active BOOLEAN DEFAULT TRUE
);

CREATE TABLE subscriptions (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INT NOT NULL,
    package_id INT NOT NULL,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    created_by INT NOT NULL REFERENCES users(id),
    updated_by INT REFERENCES users(id),
    active BOOLEAN DEFAULT TRUE
);

-- types of materials like stainless steel(sub cat like 304,etc), mild steel, etc
CREATE TABLE material_types (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    parent_id INT REFERENCES material_types(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    created_by INT NOT NULL REFERENCES users(id),
    updated_by INT REFERENCES users(id),
    active BOOLEAN DEFAULT TRUE
);  


-- categories like nuts, bolts, screws, etc
CREATE TABLE product_categories (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    parent_id INT REFERENCES product_categories(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    created_by INT NOT NULL REFERENCES users(id),
    updated_by INT REFERENCES users(id),
    active BOOLEAN DEFAULT TRUE
);

CREATE TABLE product_categories_attr (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    product_category_id INT NOT NULL REFERENCES product_categories(id),
    attributes JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    created_by INT NOT NULL REFERENCES users(id),
    updated_by INT REFERENCES users(id),
    active BOOLEAN DEFAULT TRUE
);



-- mongodb product collection
{
  "name": "45 Degree Elbow",
  "brand": "Brand A",
  "material_type": "Stainless Steel",
  "product_category": "Butt Weld Elbow",
  "description": "45 degree elbow used in various pipeline configurations.",
  "image": ["image_url_1", "image_url_2"],
  "application": "Used in plumbing and pipeline systems.",
  price: 350.00,
  "specifications": {
    "material": "Stainless Steel",
    "schedule": "Sch 40",
    "diameter": "2 inch",
    "pressure_rating": "150 PSI",
    "standards": [
      "ASTM A403",
      "ISO 9001"
    ],
    "corrosion_resistant": true,
    "temperature_range": "0-400°C",
    "custom_attributes": {
      "custom_attribute_1": "value_1",
      "custom_attribute_2": "value_2"
    }
  },
}