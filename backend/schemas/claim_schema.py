from marshmallow import Schema, fields


class ClaimSchema(Schema):

    id = fields.Int(dump_only=True)

    policy_id = fields.Int(required=True)

    claim_amount = fields.Float(required=True)

    reason = fields.String(required=True)

    status = fields.String(required=True)

    submission_date = fields.Date(required=True)