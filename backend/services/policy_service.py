from datetime import datetime

from extensions import db
from models.customer import Customer
from models.policy import Policy
from datetime import datetime, timedelta


def generate_policy_number():

    total = Policy.query.count() + 1

    year = datetime.now().year

    return f"POL{year}{total:04d}"


def create_policy(data):

    customer = Customer.query.get(data["customer_id"])

    if not customer:
        return {
            "message": "Customer not found"
        }, 404

    policy = Policy(
        customer_id=data["customer_id"],
        policy_type=data["policy_type"],
        policy_number=generate_policy_number(),
        premium_amount=data["premium_amount"],
        start_date=data["start_date"],
        end_date=data["end_date"],
        status="Active"
    )

    db.session.add(policy)
    db.session.commit()

    return {
        "message": "Policy created successfully",
        "policy_number": policy.policy_number
    }, 201

def get_all_policies():

    policies = Policy.query.all()

    result = []

    for policy in policies:
        result.append({
            "id": policy.id,
            "customer_name": policy.customer.name,
            "policy_number": policy.policy_number,
            "policy_type": policy.policy_type,
            "premium_amount": policy.premium_amount,
            "start_date": policy.start_date.strftime("%Y-%m-%d"),
            "end_date": policy.end_date.strftime("%Y-%m-%d"),
            "status": policy.status
        })

    return result, 200

def get_policy(policy_id):

    policy = Policy.query.get(policy_id)

    if not policy:
        return {
            "message": "Policy not found"
        }, 404

    return {
        "id": policy.id,
        "customer_name": policy.customer.name,
        "policy_number": policy.policy_number,
        "policy_type": policy.policy_type,
        "premium_amount": policy.premium_amount,
        "start_date": policy.start_date.strftime("%Y-%m-%d"),
        "end_date": policy.end_date.strftime("%Y-%m-%d"),
        "status": policy.status
    }, 200

def update_policy(policy_id, data):

    policy = Policy.query.get(policy_id)

    if not policy:
        return {"message": "Policy not found"}, 404

    customer = Customer.query.get(data["customer_id"])

    if not customer:
        return {"message": "Customer not found"}, 404

    policy.customer_id = data["customer_id"]
    policy.policy_type = data["policy_type"]
    policy.premium_amount = data["premium_amount"]
    policy.start_date = data["start_date"]
    policy.end_date = data["end_date"]

    db.session.commit()

    return {
        "message": "Policy updated successfully"
    }, 200

def cancel_policy(policy_id):

    policy = Policy.query.get(policy_id)

    if not policy:
        return {
            "message": "Policy not found"
        }, 404

    if policy.status == "Cancelled":
        return {
            "message": "Policy is already cancelled"
        }, 400

    policy.status = "Cancelled"

    db.session.commit()

    return {
        "message": "Policy cancelled successfully"
    }, 200

def renew_policy(policy_id, data):

    policy = Policy.query.get(policy_id)

    if not policy:
        return {
            "message": "Policy not found"
        }, 404

    policy.end_date = data["end_date"]
    policy.status = "Active"

    db.session.commit()

    return {
        "message": "Policy renewed successfully"
    }, 200

def get_active_policies():

    policies = Policy.query.filter_by(status="Active").all()

    result = []

    for policy in policies:
        result.append({
            "id": policy.id,
            "customer_name": policy.customer.name,
            "policy_number": policy.policy_number,
            "policy_type": policy.policy_type,
            "premium_amount": policy.premium_amount,
            "start_date": policy.start_date.strftime("%Y-%m-%d"),
            "end_date": policy.end_date.strftime("%Y-%m-%d"),
            "status": policy.status
        })

    return result, 200

def get_expiring_policies():

    today = datetime.today().date()
    next_30_days = today + timedelta(days=30)

    policies = Policy.query.filter(
        Policy.end_date <= next_30_days,
        Policy.status == "Active"
    ).all()

    result = []

    for policy in policies:
        result.append({
            "policy_number": policy.policy_number,
            "customer_name": policy.customer.name,
            "end_date": policy.end_date.strftime("%Y-%m-%d"),
            "status": policy.status
        })

    return result, 200