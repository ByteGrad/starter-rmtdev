> **Educational code and security**
>
> These examples teach selected concepts and may omit controls required for production. Dependencies and runtimes become outdated over time. Before running or reusing an example, read [SECURITY.md](SECURITY.md), check current advisories, keep dependencies on supported patched versions, and test upgrades. Do not expose development servers or use real customer data or production credentials in a tutorial environment.
>
> Except as separately agreed or required by applicable law, the examples are provided as-is, without warranties. To the maximum extent permitted by applicable law, ByteGrad Sp. z o.o. and the authors disclaim liability for losses arising from use of these examples. Nothing limits mandatory consumer rights or liability that cannot lawfully be excluded. This notice does not change your course purchase agreement or grant rights to third-party assets.

# rmtDev starter

A starting point for the ByteGrad lessons. The initial page is intentionally minimal; components are provided for building along with the course.

## Run locally

Use Node.js 24 LTS (see `.nvmrc`), then:

```sh
npm ci
npm run dev
```

Keep the development server on localhost. Use `npm run build` for a production bundle and `npm run lint` for static checks.

## Keeping your copy maintained

Run `npm audit` when you use this project, review new advisories, update dependencies and commit the resulting lockfile after testing. Copying or forking this repository does not automatically apply future fixes to your copy. Re-run the build and lint checks after each update. Avoid blindly running `npm audit fix --force`.

See [SECURITY.md](SECURITY.md) for reporting and deployment guidance and [SECURITY-UPDATES.md](SECURITY-UPDATES.md) for the dated update. The current tooling can differ from the recorded lessons. Existing course and asset usage terms still apply.
