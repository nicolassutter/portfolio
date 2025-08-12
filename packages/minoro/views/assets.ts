import { defineView } from 'minoro'
import fs from 'fs/promises'
import path from 'path'
import { env } from '../env'

const absoluteAssetsDir = path.resolve(env.ASSETS_DIR)

export const assetsId = 'assets'

const assets = defineView(
  {
    name: 'Assets',
    icon: 'lucide:folder',
  },
  (view) => {
    view.defineGallery({
      id: assetsId,
      async assets({ asset }) {
        const files = await fs.readdir(absoluteAssetsDir)

        return files.map((file) => {
          return asset({
            id: file,
            name: file,
            publicUrl: `${env.FRONTEND_URL}/assets/${file}`,
            type: 'image',
          })
        })
      },
      async handleDelete(asset) {
        const f = Bun.file(path.join(absoluteAssetsDir, asset.id))
        await f.delete()
      },
      async handleRename(asset, newName) {
        await fs.rename(
          path.join(absoluteAssetsDir, asset.id),
          path.join(absoluteAssetsDir, newName),
        )
      },
      async handleUpload(files) {
        const uploadPromises = files.map(async (file) => {
          const filePath = path.join(absoluteAssetsDir, file.name)
          const f = Bun.file(filePath)
          await f.write(await file.arrayBuffer())
        })

        await Promise.all(uploadPromises)
      },
    })
  },
)

export const assetsViewId = assets.id

export const views = [assets]
