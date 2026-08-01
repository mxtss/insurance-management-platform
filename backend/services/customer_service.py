from datetime import datetime

from models.customer import Customer
from extensions import db
from sqlalchemy import or_


def create_customer(data):

    existing = Customer.query.filter_by(
        email=data["email"]
    ).first()

    if existing:
        return {
            "message": "Customer already exists"
        }, 400

    customer = Customer(

        name=data["name"],

        dob=datetime.strptime(
            data["dob"],
            "%Y-%m-%d"
        ).date(),

        phone=data["phone"],

        address=data["address"],

        email=data["email"]

    )

    db.session.add(customer)

    db.session.commit()

    return {
        "message": "Customer added successfully"
    }, 201

def get_all_customers():
    customers = Customer.query.all()
    data = []
    for customer in customers:
        data.append({
            "id": customer.id,
            "name": customer.name,
            "dob": customer.dob.strftime("%Y-%m-%d"),
            "phone": customer.phone,
            "address": customer.address,
            "email": customer.email
        })
    return data, 200

def get_customer(customer_id):
    customer = Customer.query.get(customer_id)
    if not customer:
        return {"message": "Customer not found"}, 404
    return {
        "id": customer.id,
        "name": customer.name,
        "dob": customer.dob.strftime("%Y-%m-%d"),
        "phone": customer.phone,
        "address": customer.address,
        "email": customer.email
    }, 200

def update_customer(customer_id, data):
    customer = Customer.query.get(customer_id)
    if not customer:
        return {"message": "Customer not found"}, 404
    customer.name = data["name"]
    customer.dob = datetime.strptime(data["dob"], "%Y-%m-%d").date()
    customer.phone = data["phone"]
    customer.address = data["address"]
    customer.email = data["email"]
    db.session.commit()
    return {
        "message": "Customer updated successfully"
    }, 200

def delete_customer(customer_id):
    customer = Customer.query.get(customer_id)
    if not customer:
        return {"message": "Customer not found"}, 404
    db.session.delete(customer)
    db.session.commit()
    return {
        "message": "Customer deleted successfully"
    }, 200

def search_customers(keyword):
    customers = Customer.query.filter(
        or_(
            Customer.name.ilike(f"%{keyword}%"),
            Customer.email.ilike(f"%{keyword}%")
        )
    ).all()
    result = []
    for customer in customers:
        result.append({
            "id": customer.id,
            "name": customer.name,
            "email": customer.email,
            "phone": customer.phone,
            "address": customer.address,
            "dob": customer.dob.strftime("%Y-%m-%d")
        })
    return result, 200