from marshmallow import Schema, fields


class PremiumPaymentSchema(Schema):

    id = fields.Int(dump_only=True)

    policy_id = fields.Int(required=True)

    payment_date = fields.Date(required=True)

    due_date = fields.Date(required=True)

    amount = fields.Float(required=True)

    payment_status = fields.String(required=True)