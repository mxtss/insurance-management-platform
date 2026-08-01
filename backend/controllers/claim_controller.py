from flask import request

from schemas.claim_schema import ClaimSchema

from services.claim_service import (
    submit_claim,
    get_all_claims,
    get_claim,
    approve_claim,
    reject_claim,
    get_claim_history
)

claim_schema = ClaimSchema()


def add_claim():

    data = request.get_json()

    errors = claim_schema.validate(data)

    if errors:
        return errors, 400

    return submit_claim(data)


def view_claims():
    return get_all_claims()


def view_claim(claim_id):
    return get_claim(claim_id)


def approve(claim_id):
    return approve_claim(claim_id)


def reject(claim_id):
    return reject_claim(claim_id)


def history():
    return get_claim_history()