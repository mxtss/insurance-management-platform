from flask import request

from schemas.policy_schema import PolicySchema
from services.policy_service import (
    create_policy,
    get_all_policies,
    get_policy,
    update_policy,
    cancel_policy,
    renew_policy,
    get_active_policies,
    get_expiring_policies
)

policy_schema = PolicySchema()


def add_policy():

    data = request.get_json()

    errors = policy_schema.validate(data)

    if errors:
        return errors, 400

    return create_policy(data)


def view_policies():
    return get_all_policies()

def view_policy(policy_id):
    return get_policy(policy_id)

def edit_policy(policy_id):

    data = request.get_json()

    errors = policy_schema.validate(data)

    if errors:
        return errors, 400

    return update_policy(policy_id, data)

def remove_policy(policy_id):
    return cancel_policy(policy_id)

def renew(policy_id):

    data = request.get_json()

    if "end_date" not in data:
        return {
            "message": "end_date is required"
        }, 400

    return renew_policy(policy_id, data)

def view_active_policies():
    return get_active_policies()

def expiring_policies():
    return get_expiring_policies()