# todolist

| Route | Description | Parameters | Expected Output |
|-------|-------------|------------|-----------------|
| `POST /api/login`| logs the user in | body: `{ email: string, password: string}` | `{ token: string, refresh_token: string }` |
| `POST /api/user?=1/create`| Create a list | body `{ title: string, description: string}` | `{ title: string, description: string}` |
| `POST /api/sign`| Sign up user in | body: `{ firstName: string, lastName: string, email: string, password: string}` | `{ token: string, refresh_token: string }` |
| `GET /api/user?=1/review`| Review task | body: | `{ title: string, description: string}`|
| `PUT /api/user?=1/review/edit`| Edit Task | body: `{ title: string, description: string}` | `{ title: string, description: string}` | 

