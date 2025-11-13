import db from "../config/database.js";

class Car {
    static tableName = "cars";

    static createTable() {
        const sql = `
      CREATE TABLE IF NOT EXISTS ${this.tableName} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        make TEXT NOT NULL,
        model TEXT NOT NULL,
        year INTEGER NOT NULL,
        color TEXT,
        price REAL,
        mileage INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;
        db.exec(sql);
        console.log(`✅ Table '${this.tableName}' created/verified`);
    }

    static findAll() {
        const stmt = db.prepare(`SELECT * FROM ${this.tableName} ORDER BY id`);
        return stmt.all();
    }

    static findById(id) {
        const stmt = db.prepare(`SELECT * FROM ${this.tableName} WHERE id = ?`);
        return stmt.get(id);
    }

    static create(carData) {
        const { make, model, year, color, price, mileage } = carData;

        const stmt = db.prepare(`
      INSERT INTO ${this.tableName} (make, model, year, color, price, mileage)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

        const result = stmt.run(
            make,
            model,
            year,
            color || null,
            price ?? null,
            mileage ?? null
        );

        return this.findById(result.lastInsertRowid);
    }

    static update(id, carData) {
        const existing = this.findById(id);
        if (!existing) return null;

        const {
            make = existing.make,
            model = existing.model,
            year = existing.year,
            color = existing.color,
            price = existing.price,
            mileage = existing.mileage
        } = carData;

        const stmt = db.prepare(`
      UPDATE ${this.tableName}
      SET make = ?, model = ?, year = ?, color = ?, price = ?, mileage = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

        stmt.run(make, model, year, color, price, mileage, id);
        return this.findById(id);
    }

    static delete(id) {
        const stmt = db.prepare(`DELETE FROM ${this.tableName} WHERE id = ?`);
        const result = stmt.run(id);
        return result.changes > 0;
    }

    static count() {
        const stmt = db.prepare(
            `SELECT COUNT(*) AS count FROM ${this.tableName}`
        );
        return stmt.get().count;
    }

    static seed() {
        const count = this.count();
        if (count > 0) return;

        console.log("📝 Seeding cars table...");

        const sampleCars = [
            { make: "Toyota", model: "Corolla", year: 2018, color: "White", price: 12000, mileage: 60000 },
            { make: "Honda", model: "Civic", year: 2020, color: "Black", price: 18000, mileage: 30000 },
            { make: "Tesla", model: "Model 3", year: 2022, color: "Red", price: 38000, mileage: 5000 },
            { make: "BMW", model: "X5", year: 2019, color: "Blue", price: 35000, mileage: 40000 }
        ];

        const stmt = db.prepare(`
      INSERT INTO ${this.tableName} (make, model, year, color, price, mileage)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

        const insertMany = db.transaction((cars) => {
            for (const car of cars) {
                stmt.run(
                    car.make,
                    car.model,
                    car.year,
                    car.color,
                    car.price,
                    car.mileage
                );
            }
        });

        insertMany(sampleCars);

        console.log(`✅ Seeded ${sampleCars.length} cars`);
    }
}

export default Car;
