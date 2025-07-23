import {
  createDirectus,
  staticToken,
  rest,
  schemaSnapshot,
  schemaDiff,
  schemaApply,
  readOpenApiSpec,
  type SchemaSnapshotOutput,
} from '@directus/sdk'
import { Command } from '@commander-js/extra-typings'
import { mkdir } from 'node:fs/promises'
import { z } from 'zod'
import { consola } from 'consola'
import { Glob } from 'bun'
import openapiTS, { astToString, type OpenAPI3 } from 'openapi-typescript'

const program = new Command()

program.name('portfolio-cli').description('').version('0.0.0')

const env = z
  .object({
    DIRECTUS_ADMIN_TOKEN: z
      .string({
        error: 'env variable DIRECTUS_ADMIN_TOKEN is required',
      })
      .describe('Token that has admin access to Directus'),
  })
  .parse(Bun.env)

program
  .command('typegen')
  .description('Generate TypeScript types from Directus OpenAPI spec')
  .option('-u, --url <url>', 'Directus base URL', 'http://localhost:8055')
  .action(async function () {
    const baseDirectus = createDirectus(this.opts().url)
      .with(rest())
      .with(staticToken(env.DIRECTUS_ADMIN_TOKEN))
    const openapiSpec = await baseDirectus.request(readOpenApiSpec())
    const ast = await openapiTS(openapiSpec as OpenAPI3)
    const contents = astToString(ast)
    await Bun.write(Bun.file('./src/types/directus.gen.ts'), contents)
  })

program
  .command('directus-snapshot')
  .option('-u, --url <url>', 'Directus base URL', 'http://localhost:8055')
  .action(async function () {
    const baseDirectus = createDirectus(this.opts().url)
      .with(rest())
      .with(staticToken(env.DIRECTUS_ADMIN_TOKEN))

    const snapshot = await baseDirectus.request(schemaSnapshot())
    const snapshotDir = '../directus/snapshots'
    await mkdir(snapshotDir, { recursive: true })
    const snapshotName = `${snapshotDir}/snapshot-${new Date().toISOString()}.json`
    const snapshotPath = Bun.file(snapshotName)
    await Bun.write(snapshotPath, JSON.stringify(snapshot, null, 2))
  })

program
  .command('directus-migrate-local')
  .description('Migrate local directus instance from a snapshot file')
  .action(async function () {
    const snapshotFiles = new Glob(
      '../directus/snapshots/snapshot-*.json',
    ).scanSync()

    const filename = await consola
      .prompt('Which snapshot file do you want to use?', {
        type: 'select',
        options: Array.from(snapshotFiles),
        cancel: 'reject',
      })
      .catch(() => {
        consola.error('No snapshot file selected. Exiting.')
        process.exit(1)
      })

    const f = Bun.file(filename)
    const snapshot: SchemaSnapshotOutput = await f.json()
    consola.info(
      `Using snapshot from file: ${filename}. Make sure it is a valid Directus schema snapshot.`,
    )
    const targetDirectus = createDirectus('http://localhost:8055')
      .with(rest())
      .with(staticToken(env.DIRECTUS_ADMIN_TOKEN))

    const diff = await targetDirectus.request(schemaDiff(snapshot))
    // apply the diff to the target Directus instance
    await targetDirectus.request(schemaApply(diff))
    consola.success(
      `Migration applied successfully to local Directus instance.`,
    )
  })

program
  .command('directus-migrate')
  .description(
    'Migrate schema from one Directus instance (base) to another (target) using a snapshot',
  )
  .option('-b, --base <url>', 'Base Directus URL', 'http://localhost:8055')
  .requiredOption('-t, --target <url>', 'Target Directus URL')
  .requiredOption(
    '--static-token <token>',
    'Static token for authentication on target Directus',
  )
  .action(async function () {
    const baseDirectus = createDirectus(this.opts().base)
      .with(rest())
      .with(staticToken(env.DIRECTUS_ADMIN_TOKEN))

    const targetDirectus = createDirectus(this.opts().target)
      .with(rest())
      .with(staticToken(this.opts().staticToken))

    const baseSnapshot = await baseDirectus.request(schemaSnapshot())
    const diff = await targetDirectus.request(schemaDiff(baseSnapshot))
    // apply the diff to the target Directus instance
    await targetDirectus.request(schemaApply(diff))
  })

program
  .command('directus-diff')
  .description(
    'Get the schema diff between two Directus instances (base and target)',
  )
  .requiredOption('--target <url>', 'Target Directus URL')
  .requiredOption(
    '--static-token <token>',
    'Static token for authentication on target Directus',
  )
  .action(async function () {
    const baseDirectus = createDirectus('http://localhost:8055')
      .with(rest())
      .with(staticToken(env.DIRECTUS_ADMIN_TOKEN))

    const targetDirectus = createDirectus(this.opts().target)
      .with(rest())
      .with(staticToken(this.opts().staticToken))

    const baseSnapshot = await baseDirectus.request(schemaSnapshot())
    const diff = await targetDirectus.request(schemaDiff(baseSnapshot))
    consola.log(JSON.stringify(diff, null, 2))
  })

program.parse()
