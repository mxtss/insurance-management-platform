from sqlalchemy import func

from models.policy import Policy
from models.claim import Claim
from models.customer import Customer
from extensions import db
from models.premium_payment import PremiumPayment


def active_policies():

    count = Policy.query.filter(
        Policy.status == "Active"
    ).count()

    return {
        "active_policies": count
    }, 200


def expired_policies():

    count = Policy.query.filter(
        Policy.status == "Expired"
    ).count()

    return {
        "expired_policies": count
    }, 200


def claim_statistics():

    pending = Claim.query.filter(
        Claim.status == "Pending"
    ).count()

    approved = Claim.query.filter(
        Claim.status == "Approved"
    ).count()

    rejected = Claim.query.filter(
        Claim.status == "Rejected"
    ).count()

    return {
        "pending": pending,
        "approved": approved,
        "rejected": rejected,
        "total": pending + approved + rejected
    }, 200


def premium_collection():

    total = db.session.query(
        func.sum(PremiumPayment.amount)
    ).scalar()

    if total is None:
        total = 0

    return {
        "total_collection": float(total)
    }, 200


def customer_growth():

    total = Customer.query.count()

    return {
        "total_customers": total
    }, 200


def monthly_business_report():

    total_customers = Customer.query.count()

    active = Policy.query.filter(
        Policy.status == "Active"
    ).count()

    expired = Policy.query.filter(
        Policy.status == "Expired"
    ).count()

    claims = Claim.query.count()

    premium = db.session.query(
        func.sum(PremiumPayment.amount)
    ).scalar()

    if premium is None:
        premium = 0

    return {
        "customers": total_customers,
        "active_policies": active,
        "expired_policies": expired,
        "claims": claims,
        "premium_collection": float(premium)
    }, 200