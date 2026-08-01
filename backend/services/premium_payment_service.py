from datetime import date

from extensions import db

from models.policy import Policy
from models.premium_payment import PremiumPayment


def record_payment(data):

    policy = Policy.query.get(data["policy_id"])

    if not policy:
        return {"message": "Policy not found"}, 404


    payment = PremiumPayment(
        policy_id=data["policy_id"],
        payment_date=data["payment_date"],
        due_date=data["due_date"],
        amount=data["amount"],
        payment_status=data["payment_status"]
    )


    db.session.add(payment)
    db.session.commit()


    return {
        "message": "Payment recorded successfully"
    }, 201



def get_all_payments():

    payments = PremiumPayment.query.all()

    result = []


    for payment in payments:

        result.append({

            "id": payment.id,

            "policy_number": payment.policy.policy_number,

            "customer_name": payment.policy.customer.name,

            "payment_date": payment.payment_date.strftime("%Y-%m-%d"),

            "due_date": payment.due_date.strftime("%Y-%m-%d"),

            "amount": payment.amount,

            "payment_status": payment.payment_status

        })


    return result, 200




def get_payment(payment_id):

    payment = PremiumPayment.query.get(payment_id)


    if not payment:
        return {
            "message": "Payment not found"
        }, 404



    return {

        "id": payment.id,

        "policy_number": payment.policy.policy_number,

        "customer_name": payment.policy.customer.name,

        "payment_date": payment.payment_date.strftime("%Y-%m-%d"),

        "due_date": payment.due_date.strftime("%Y-%m-%d"),

        "amount": payment.amount,

        "payment_status": payment.payment_status

    }, 200





def update_payment(payment_id, data):

    payment = PremiumPayment.query.get(payment_id)


    if not payment:
        return {
            "message": "Payment not found"
        }, 404



    if "payment_date" in data:
        payment.payment_date = data["payment_date"]


    if "due_date" in data:
        payment.due_date = data["due_date"]


    if "amount" in data:
        payment.amount = data["amount"]


    if "payment_status" in data:
        payment.payment_status = data["payment_status"]



    db.session.commit()


    return {
        "message": "Payment updated successfully"
    }, 200





def delete_payment(payment_id):

    payment = PremiumPayment.query.get(payment_id)


    if not payment:
        return {
            "message": "Payment not found"
        }, 404



    db.session.delete(payment)

    db.session.commit()


    return {
        "message": "Payment deleted successfully"
    }, 200






def get_due_payments():

    today = date.today()


    payments = PremiumPayment.query.filter(
        PremiumPayment.due_date >= today,
        PremiumPayment.payment_status == "Pending"
    ).all()



    result = []


    for payment in payments:

        result.append({

            "payment_id": payment.id,

            "policy_number": payment.policy.policy_number,

            "customer_name": payment.policy.customer.name,

            "amount": payment.amount,

            "due_date": payment.due_date.strftime("%Y-%m-%d"),

            "payment_status": payment.payment_status

        })


    return result, 200






def get_overdue_payments():

    today = date.today()


    payments = PremiumPayment.query.filter(
        PremiumPayment.due_date < today,
        PremiumPayment.payment_status == "Pending"
    ).all()



    result = []


    for payment in payments:

        result.append({

            "payment_id": payment.id,

            "policy_number": payment.policy.policy_number,

            "customer_name": payment.policy.customer.name,

            "amount": payment.amount,

            "due_date": payment.due_date.strftime("%Y-%m-%d"),

            "payment_status": payment.payment_status

        })


    return result, 200