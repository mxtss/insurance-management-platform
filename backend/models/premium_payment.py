from extensions import db


class PremiumPayment(db.Model):
    __tablename__ = "premium_payments"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    policy_id = db.Column(
        db.Integer,
        db.ForeignKey("policies.id"),
        nullable=False
    )

    payment_date = db.Column(
        db.Date,
        nullable=False
    )

    due_date = db.Column(
        db.Date,
        nullable=False
    )

    amount = db.Column(
        db.Float,
        nullable=False
    )

    payment_status = db.Column(
        db.String(30),
        nullable=False
    )

    policy = db.relationship(
        "Policy",
        backref="premium_payments"
    )