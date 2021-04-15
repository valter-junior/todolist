# todolist

| Route | Description | Parameters | Expected Output |
|-------|-------------|------------|-----------------|
| `POST /api/login`| logs the user in | body: `{ email: string, password: string}` | `{ token: string, refresh_token: string }` |
| `POST /api/sign-in` | Sign in a user | body `{ firstName: string, lastName: string, email: string, password: string}` | `{ token: string, refresh_token: string}`|
| `POST /api/user/task` | Create a List | body `{ title: string, description: string}` | `{ title: string, description: string}` |
| `GET /api/user/task` | List all task | body `{title: string, description: string}` | `{title: string, description: string}` |
| `GET /api/user/task/{id}` | List specific task | body `{title: string, description: string}` | `{title: string, description: string}` |
| `PUT /api/user/task/{id}` | Edit specific task | body `{title: string, description: string}` | `{title: string, description: string}` |
| `DELETE /api/user/task/{id}` | Delete specific task | body `{title: string, description: string}` | `{title: null, description: null}` |
