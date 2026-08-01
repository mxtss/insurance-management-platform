from marshmallow import Schema, fields


class CustomerSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.String(required=True)
    dob = fields.Date(required=True)
    phone = fields.String(required=True)
    address = fields.String(required=True)
    email = fields.Email(required=True)