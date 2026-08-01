from functools import wraps

from flask_jwt_extended import (
    verify_jwt_in_request,
    get_jwt
)


def role_required(*roles):

    def wrapper(fn):

        @wraps(fn)
        def decorator(*args, **kwargs):

            # Verify JWT exists
            verify_jwt_in_request()

            claims = get_jwt()

            user_role = claims.get("role")

            if user_role not in roles:
                return {
                    "message": "Access denied"
                }, 403

            return fn(*args, **kwargs)

        return decorator

    return wrapper