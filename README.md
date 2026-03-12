# streak-tracker-v2

Single page task streak tracker.

## Deployment setups

### 1. Front end cloud hosting (vercel) + Cloud Supabase

- 'Auto' triggered by pushing to github
  - I suspect I'm triggering this manually when I access the vercel page lol

### 2. Google Cloud Run hosted dockerized nextjs app (deployed via Github Actions) + Cloud Supabase

- Auto triggered by pushing to github (via Github Actions)

### 3. Local dockerized nextjs app + Cloud Supabase

- Manual trigger via [Dockerized nextjs app commands](#dockerized-nextjs-app-commands)

### 4. Local nextjs app + Local dockerized Supabase

- Manual trigger via [Build and Run App commands](#build-and-run-app-commands)

## Env files (not committed in repo)

### .env (For dockerized app)

```text
# .env file -- Points to cloud supabase instance
NEXT_PUBLIC_SUPABASE_URL='https://rgixhlupujlczzvhpudt.supabase.co'
NEXT_PUBLIC_SUPABASE_ANON_KEY='sb_publishable_sIss_uwAxpW7oJLfASaGtQ_E-dZVk8i'
```

### .env.local (For running the app locally with a local dockerized supabase)

```text
# .env.local file for local 
NEXT_PUBLIC_SUPABASE_URL='http://localhost:54321'
NEXT_PUBLIC_SUPABASE_ANON_KEY='sb_publishable_sIss_uwAxpW7oJLfASaGtQ_E-dZVk8i'
```

## Build and Run App commands

Build only:

```console
npm run build
```

Build and run:

```console
npm run dev
```

## Local Supabase commands

```console
npx supabase start
```

```console
npx supabase stop
```

## Dockerized nextjs app commands

```console
docker compose up --build
```

```console
docker compose down -v
```

## Future maybe Todos

### 1. Local Supabase via Podman Desktop

Steps: <https://gist.github.com/nilesh/b69b751e5cfd20e04d124a09ca4c14eb>

## Links

1. **Google Cloud App link**: <https://streak-tracker-v2-687758851667.asia-southeast1.run.app/>

2. **Local Nextjs App link**: <http://localhost:3000/>

3. **Vercel**: <https://vercel.com/nyaow-devs-projects/streak-tracker-v2/3NVbUvyXk5bXa8bXPrWLt4rjnouQ>

4. **Cloud Run Service dashboard**: <https://console.cloud.google.com/run/detail/asia-southeast1/streak-tracker-v2/observability/metrics?project=project-8e09247f-10d3-4254-8e1>

5. **Cloud Supabase**: <https://supabase.com/dashboard/project/rgixhlupujlczzvhpudt>

6. **Github**: <https://github.com/nyaow-dev/streak-tracker-v2>

## Guides

[How to Set Up Continuous Deployment to Cloud Run Using GitHub Actions](https://oneuptime.com/blog/post/2026-02-17-how-to-set-up-continuous-deployment-to-cloud-run-using-github-actions-and-workload-identity-federation/view#:~:text=On%20this%20page,manage%2C%20no%20secrets%20to%20rotate.)
