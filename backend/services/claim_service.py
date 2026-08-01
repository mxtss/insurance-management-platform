from extensions import db

from models.claim import Claim
from models.policy import Policy


def submit_claim(data):

    policy = Policy.query.get(data["policy_id"])

    if not policy:
        return {"message": "Policy not found"}, 404

    claim = Claim(
        policy_id=data["policy_id"],
        claim_amount=data["claim_amount"],
        reason=data["reason"],
        status=data["status"],
        submission_date=data["submission_date"]
    )

    db.session.add(claim)
    db.session.commit()

    return {"message": "Claim submitted successfully"}, 201


def get_all_claims():

    claims = Claim.query.all()

    result = []

    for claim in claims:

        result.append({
            "id": claim.id,
            "policy_number": claim.policy.policy_number,
            "customer_name": claim.policy.customer.name,
            "claim_amount": claim.claim_amount,
            "reason": claim.reason,
            "status": claim.status,
            "submission_date": claim.submission_date.strftime("%Y-%m-%d")
        })

    return result, 200


def get_claim(claim_id):

    claim = Claim.query.get(claim_id)

    if not claim:
        return {"message": "Claim not found"}, 404

    return {
        "id": claim.id,
        "policy_number": claim.policy.policy_number,
        "customer_name": claim.policy.customer.name,
        "claim_amount": claim.claim_amount,
        "reason": claim.reason,
        "status": claim.status,
        "submission_date": claim.submission_date.strftime("%Y-%m-%d")
    }, 200


def approve_claim(claim_id):

    claim = Claim.query.get(claim_id)

    if not claim:
        return {"message": "Claim not found"}, 404

    claim.status = "Approved"

    db.session.commit()

    return {"message": "Claim approved successfully"}, 200


def reject_claim(claim_id):

    claim = Claim.query.get(claim_id)

    if not claim:
        return {"message": "Claim not found"}, 404

    claim.status = "Rejected"

    db.session.commit()

    return {"message": "Claim rejected successfully"}, 200


def get_claim_history():

    claims = Claim.query.order_by(
        Claim.submission_date.desc()
    ).all()

    result = []

    for claim in claims:

        result.append({
            "id": claim.id,
            "policy_number": claim.policy.policy_number,
            "customer_name": claim.policy.customer.name,
            "claim_amount": claim.claim_amount,
            "status": claim.status,
            "submission_date": claim.submission_date.strftime("%Y-%m-%d")
        })

    return result, 200