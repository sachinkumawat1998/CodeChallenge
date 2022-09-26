# Projement back-end

The back-end consists of a Docker container with *Python 3.8* and *Django 2.2*.

All Python package requirements are listed in 
[`requirements.txt`](../requirements.txt). The initial requirements include:

- [Django](https://docs.djangoproject.com/en/2.2/) as the base framework
- [django-crispy-forms](http://django-crispy-forms.readthedocs.io/en/latest/) 
  for easier form layouts for server-rendered forms
- [markdown](http://pythonhosted.org/Markdown/siteindex.html) for rendering 
  markdown in HTML
- [djangorestframework](https://www.django-rest-framework.org/) for creating the 
  API for the front-end to consume
- [pytest](https://docs.pytest.org) for writing tests
- [black](https://github.com/psf/black) for linting and automatically formatting 
  the code
- [Django Debug 
  Toolbar](https://django-debug-toolbar.readthedocs.io/en/latest/index.html) to 
  help with debugging

If you'd like to install additional dependencies, add them to the 
[`requirements.txt`](../requirements.txt) file and rebuild the Docker containers 
with `make build`.

The application uses the *SQLite* database back-end by default.

## Apps

There are two Django `apps` in this application:

- [`auth`](auth) app - Authentication concerns like logging the user in through 
  the login form.
- [`projects`](projects) app - The core business logic of the application -- 
  keeping track of time spent on projects. Exposes a REST API that can be 
  consumed by the front-end. Everything related to the API is in the 
  [`projects/rest/`](projects/rest) folder. This includes very standard Django 
  REST Framework viewsets in [`rest/views.py`](projects/rest/views.py), 
  serializers in [`rest/serializers.py`](projects/rest/serializers.py), and 
  registering the routes from those viewsets in 
  [`rest/urls.py`](projects/rest/urls.py).

There are also some tests in the [`auth/tests.py`](auth/tests.py) and 
[`projects/tests`](projects/tests) folders and files.

## Linting

[Black](https://github.com/psf/black) is used to automatically format and lint 
files. The `make lint-django` command checks that the project is correctly 
formatted.

You can set up your editor to automatically format Python files using Black 
following the instructions [on Black's GitHub 
page](https://github.com/psf/black#editor-integration).

You can also use the `make lint-django-fix` command to automatically format all 
Python files in the project.

## Front-end

The front-end is a React app that's rendered through Django. This means that 
Django renders a template ([`app.html`](templates/app.html)) and inside that 
template, `ReactDOM.render` is manually called (`projement.init()` calls the 
`init` function in [`app/src/main.js`](app/src/main.js)).

Read more about how the front-end works in the [front-end 
`README.md`](app/README.md).
