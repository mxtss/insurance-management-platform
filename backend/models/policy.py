from extensions import db


class Policy(db.Model):
    __tablename__ = "policies"

    id = db.Column(db.Integer, primary_key=True)

    customer_id = db.Column(
        db.Integer,
        db.ForeignKey("customers.id"),
        nullable=False
    )

    policy_type = db.Column(db.String(100), nullable=False)

    policy_number = db.Column(
        db.String(50),
        unique=True,
        nullable=False
    )

    premium_amount = db.Column(
        db.Float,
        nullable=False
    )

    start_date = db.Column(
        db.Date,
        nullable=False
    )

    end_date = db.Column(
        db.Date,
        nullable=False
    )

    status = db.Column(
        db.String(30),
        default="Active"
    )

    customer = db.relationship(
        "Customer",
        backref="policies"
    )