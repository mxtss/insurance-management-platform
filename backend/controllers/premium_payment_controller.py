from flask import request

from schemas.premium_payment_schema import PremiumPaymentSchema

from services.premium_payment_service import (
    record_payment,
    get_all_payments,
    get_payment,
    get_due_payments,
    get_overdue_payments,
    update_payment,
    delete_payment
)


payment_schema = PremiumPaymentSchema()


def add_payment():

    data = request.get_json()

    errors = payment_schema.validate(data)

    if errors:
        return errors, 400

    return record_payment(data)


def view_payments():
    return get_all_payments()


def view_payment(payment_id):
    return get_payment(payment_id)


def due_payments():
    return get_due_payments()


def overdue_payments():
    return get_overdue_payments()


def update_payment_controller(payment_id):

    data = request.get_json()

    return update_payment(payment_id, data)


def delete_payment_controller(payment_id):

    return delete_payment(payment_id)