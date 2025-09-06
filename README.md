# dd-trace memory leak

**When http instrumentation is loaded, memory is not released**

Minimal setup with following features:

- Nestjs
- `AppService`, `OtherService` and `DataRepository` with `scope.REQUEST`
- `AppService` injects both `OtherService` and `DataRepository`
- `AppService` reads data from `DataRepository` and provides it to `OtherService`

Observations:

- When `http` integration is **disabled** there's **no leak**
- When `http` integration is **enabled** there's **a leak**
- When `http` integration is **enabled** and `OtherService` releases provided data reference, there's **no leak**

## Getting started

Install and build

```
npm install
npm run build
```

Run disabling all other integrations

```
DD_TRACE_DISABLED_PLUGINS=express,net,router,dns node --inspect --expose-gc dist/main.js
```

Run disabling http integration

```
DD_TRACE_DISABLED_PLUGINS=express,net,router,dns,http node --inspect --expose-gc dist/main.js
```

Run disabling all other integrations and releasing data reference

```
DD_TRACE_DISABLED_PLUGINS=express,net,router,dns RELEASE_DATA=true node --inspect --expose-gc dist/main.js
```

Profiling:

- Open chrome
- Visit `chrome://inspect`
- On `Devices` menu, select `Open dedicated DevTools for Node`
- Go to `Memory` tab
- Click on `Profiles` and select `Profiling type`
- Click on record button
