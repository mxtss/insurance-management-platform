from marshmallow import Schema, fields


class DocumentSchema(Schema):

    id = fields.Int(dump_only=True)

    customer_id = fields.Int(required=True)

    file_name = fields.Str(dump_only=True)

    file_path = fields.Str(dump_only=True)

    uploaded_at = fields.DateTime(dump_only=True)