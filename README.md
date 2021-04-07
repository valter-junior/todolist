# todolist

| Route | Description | Parameters | Expected Output |
|-------|-------------|------------|-----------------|
| `POST /api/login`| logs the user in | body: `{ email: string, password: string}` | `{ token: string, refresh_token: string }` |
