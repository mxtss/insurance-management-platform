from marshmallow import Schema, fields


class PolicySchema(Schema):
    id = fields.Int(dump_only=True)

    customer_id = fields.Int(required=True)

    policy_type = fields.String(required=True)

    premium_amount = fields.Float(required=True)

    start_date = fields.Date(required=True)

    end_date = fields.Date(required=True)

    status = fields.String(dump_only=True)

    policy_number = fields.String(dump_only=True)