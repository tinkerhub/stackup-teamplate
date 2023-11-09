"""
ASGI config for task_management project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
<<<<<<< HEAD
<<<<<<< HEAD
https://docs.djangoproject.com/en/3.2/howto/deployment/asgi/
=======
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
>>>>>>> c807127078a290645a377f5f80b80b8c9dba23fe
=======
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
>>>>>>> origin/roshiba
"""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'task_management.settings')

application = get_asgi_application()
