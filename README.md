# streak-tracker-v2

Single page task streak tracker via

1. Front end cloud hosting (**vercel**) + Cloud Supabase
2. Local dockerized nextjs app + Cloud Supabase
3. Local nextjs app + Local dockerized Supabase


## Env files (not committed in repo)

### .env (For dockerized app)

```
# .env file -- Points to cloud supabase instance
NEXT_PUBLIC_SUPABASE_URL='https://rgixhlupujlczzvhpudt.supabase.co'
NEXT_PUBLIC_SUPABASE_ANON_KEY='sb_publishable_sIss_uwAxpW7oJLfASaGtQ_E-dZVk8i'
```


### .env.local (For running the app locally with a local dockerized supabase)

```
# .env.local file for local 
NEXT_PUBLIC_SUPABASE_URL='http://localhost:54321'
NEXT_PUBLIC_SUPABASE_ANON_KEY='sb_publishable_sIss_uwAxpW7oJLfASaGtQ_E-dZVk8i'
```


## Run / build app

Build only:
```
npm run build
```

Build and run:
```
npm run dev
```


## Local Supabase commands

```
npx supabase start
```

```
npx supabase stop
```


## Dockerized nextjs app commands

```
docker compose up --build
```

```
docker compose down -v
```